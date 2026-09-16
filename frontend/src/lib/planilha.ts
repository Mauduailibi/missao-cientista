export type Coluna<T> = {
  header: string
  width: number
  value: (row: T) => string | Date | null
  wrap?: boolean
}

const NAVY = 'FF12294D'
const ZEBRA = 'FFF8F6F0'
const BORDER = { style: 'thin', color: { argb: 'FFD9DEE5' } } as const

// Gera um .xlsx formatado (cabeçalho fixo, filtros, larguras e quebra de texto).
// O exceljs é carregado só no momento da exportação.
export async function downloadPlanilha<T>(filename: string, sheetName: string, colunas: Coluna<T>[], rows: T[]) {
  const { Workbook } = await import('exceljs')
  const workbook = new Workbook()
  const sheet = workbook.addWorksheet(sheetName, {
    views: [{ state: 'frozen', xSplit: 1, ySplit: 1 }],
  })

  sheet.columns = colunas.map((coluna) => ({ header: coluna.header, width: coluna.width }))

  const header = sheet.getRow(1)
  header.height = 30
  header.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11 }
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: NAVY } }
    cell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true }
    cell.border = { bottom: BORDER }
  })

  rows.forEach((row, index) => {
    const excelRow = sheet.addRow(
      colunas.map((coluna) => {
        const value = coluna.value(row)
        // O Excel não tem fuso: grava o horário local para não aparecer em UTC.
        return value instanceof Date ? new Date(value.getTime() - value.getTimezoneOffset() * 60_000) : value
      }),
    )
    excelRow.eachCell({ includeEmpty: true }, (cell, col) => {
      const coluna = colunas[col - 1]
      cell.alignment = { vertical: 'top', horizontal: 'left', wrapText: coluna.wrap ?? false }
      cell.border = { bottom: BORDER, right: BORDER }
      if (index % 2 === 1) cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: ZEBRA } }
      if (cell.value instanceof Date) cell.numFmt = 'dd/mm/yyyy hh:mm'
    })
  })

  sheet.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: colunas.length } }

  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

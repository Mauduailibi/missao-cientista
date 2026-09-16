import {
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'

const inputClass =
  'w-full rounded-[12px] border border-navy/15 bg-white px-4 py-3 text-[17px] text-navy outline-none transition-colors placeholder:text-label focus:border-orange focus:ring-2 focus:ring-orange/20'

type FieldProps = {
  label: string
  htmlFor?: string
  required?: boolean
  hint?: ReactNode
  children: ReactNode
}

export function Field({ label, htmlFor, required, hint, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-[15px] font-extrabold text-navy">
        {label}
        {required && <span className="text-orange"> *</span>}
      </label>
      {children}
      {hint && <div className="text-sm text-navy-soft">{hint}</div>}
    </div>
  )
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClass} ${props.className ?? ''}`} />
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputClass} min-h-[140px] resize-y ${props.className ?? ''}`} />
}

const normalize = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()

type ComboboxProps = {
  id: string
  value: string
  options: readonly string[]
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  emptyMessage?: string
}

// Campo com sugestões filtradas; só aceita valores presentes em `options`.
export function Combobox({ id, value, options, onChange, placeholder, required, emptyMessage }: ComboboxProps) {
  const listId = useId()
  const listRef = useRef<HTMLUListElement>(null)
  const [text, setText] = useState(value)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)

  const filtered = useMemo(() => {
    const term = normalize(text)
    if (!term || text === value) return options
    const starts = options.filter((option) => normalize(option).startsWith(term))
    const contains = options.filter((option) => !normalize(option).startsWith(term) && normalize(option).includes(term))
    return [...starts, ...contains]
  }, [options, text, value])

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [active, open])

  function select(option: string) {
    onChange(option)
    setText(option)
    setOpen(false)
  }

  function commit() {
    setOpen(false)
    const match = options.find((option) => normalize(option) === normalize(text))
    if (match) {
      select(match)
    } else if (text !== value) {
      onChange('')
    }
  }

  return (
    <div className="relative">
      <input
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={open && filtered[active] ? `${listId}-${active}` : undefined}
        autoComplete="off"
        required={required}
        placeholder={placeholder}
        value={text}
        className={inputClass}
        onFocus={() => setOpen(true)}
        onBlur={commit}
        onChange={(event) => {
          setText(event.target.value)
          setActive(0)
          setOpen(true)
          if (value) onChange('')
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault()
            setOpen(true)
            setActive((index) => Math.min(index + 1, filtered.length - 1))
          } else if (event.key === 'ArrowUp') {
            event.preventDefault()
            setActive((index) => Math.max(index - 1, 0))
          } else if (event.key === 'Enter' && open && filtered[active]) {
            event.preventDefault()
            select(filtered[active])
          } else if (event.key === 'Escape') {
            setOpen(false)
          }
        }}
      />
      {open && (
        <ul
          id={listId}
          ref={listRef}
          role="listbox"
          className="absolute z-20 m-0 mt-2 max-h-64 w-full list-none overflow-auto rounded-[12px] border border-navy/15 bg-white p-1 shadow-photo"
        >
          {filtered.length === 0 ? (
            <li className="px-4 py-3 text-[15px] text-navy-soft">{emptyMessage ?? 'Nenhuma opção encontrada.'}</li>
          ) : (
            filtered.map((option, index) => (
              <li
                key={option}
                id={`${listId}-${index}`}
                data-index={index}
                role="option"
                aria-selected={option === value}
                onMouseDown={(event) => {
                  event.preventDefault()
                  select(option)
                }}
                onMouseEnter={() => setActive(index)}
                className={`cursor-pointer rounded-[8px] px-4 py-2.5 text-[16px] ${
                  index === active ? 'bg-award-orange-bg text-navy' : 'text-navy-muted'
                } ${option === value ? 'font-extrabold' : ''}`}
              >
                {option}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}

type RadioGroupProps<T extends string> = {
  name: string
  label: string
  value: T | ''
  options: { value: T; label: string }[]
  onChange: (value: T) => void
  required?: boolean
}

export function RadioGroup<T extends string>({
  name,
  label,
  value,
  options,
  onChange,
  required,
}: RadioGroupProps<T>) {
  return (
    <fieldset className="m-0 flex flex-col gap-2 border-0 p-0">
      <legend className="mb-2 p-0 text-[15px] font-extrabold text-navy">
        {label}
        {required && <span className="text-orange"> *</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const checked = value === option.value
          return (
            <label
              key={option.value}
              className={`flex cursor-pointer items-center gap-2.5 rounded-[12px] border px-4 py-3 text-[16px] font-bold transition-colors ${
                checked
                  ? 'border-orange bg-award-orange-bg text-navy'
                  : 'border-navy/15 bg-white text-navy-muted hover:border-navy/30'
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                required={required}
                onChange={() => onChange(option.value)}
                className="size-4 accent-orange"
              />
              {option.label}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger'
}

const variants = {
  primary:
    'bg-orange text-white shadow-cta hover:translate-y-[2px] hover:shadow-cta-pressed disabled:translate-y-0 disabled:opacity-60',
  secondary: 'border border-navy/15 bg-white text-navy hover:border-navy/35 disabled:opacity-60',
  danger: 'border border-orange/40 bg-white text-orange-shadow hover:bg-award-orange-bg disabled:opacity-60',
}

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-[14px] px-6 py-3.5 text-[16px] font-extrabold transition-all disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    />
  )
}

export function Notice({ tone, children }: { tone: 'error' | 'success' | 'info'; children: ReactNode }) {
  const tones = {
    error: 'border-orange/30 bg-award-orange-bg text-orange-shadow',
    success: 'border-teal/30 bg-award-teal-bg text-teal',
    info: 'border-sky/30 bg-award-sky-bg text-sky-mid',
  }
  return (
    <div role={tone === 'error' ? 'alert' : 'status'} className={`rounded-[12px] border px-4 py-3 text-[15px] font-bold ${tones[tone]}`}>
      {children}
    </div>
  )
}

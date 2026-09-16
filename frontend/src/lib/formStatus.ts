import { useEffect, useState } from 'react'

export type FormStatus = 'loading' | 'open' | 'closed'

// Firebase é carregado sob demanda para não pesar o carregamento inicial da landing.
export function useFormStatus(): FormStatus {
  const [status, setStatus] = useState<FormStatus>('loading')

  useEffect(() => {
    let active = true
    let unsubscribe: (() => void) | undefined

    Promise.all([import('firebase/firestore'), import('./firebase')])
      .then(([{ doc, onSnapshot }, { db }]) => {
        if (!active) return
        unsubscribe = onSnapshot(
          doc(db, 'settings', 'form'),
          (snapshot) => setStatus(snapshot.data()?.open === true ? 'open' : 'closed'),
          () => setStatus('closed'),
        )
      })
      .catch(() => active && setStatus('closed'))

    return () => {
      active = false
      unsubscribe?.()
    }
  }, [])

  return status
}

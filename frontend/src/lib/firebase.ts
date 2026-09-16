import { getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const ROOT_ADMIN_EMAIL = 'mauricio.neto@edu.udesc.br'

export const app = initializeApp(config)
export const db = getFirestore(app)

export function getMainAuth() {
  return getAuth(app)
}

// Instância separada para criar novos logins sem encerrar a sessão do admin atual.
export function getSecondaryAuth() {
  const secondary = getApps().find((item) => item.name === 'secondary') ?? initializeApp(config, 'secondary')
  return getAuth(secondary)
}

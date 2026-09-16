import { Suspense, lazy } from 'react'
import App from './App.tsx'

const InscricaoPage = lazy(() => import('./pages/InscricaoPage.tsx'))
const AdminApp = lazy(() => import('./pages/admin/AdminApp.tsx'))

export function Root() {
  const path = window.location.pathname.replace(/\/+$/, '')
  if (path === '/inscricao' || path === '/admin') {
    return <Suspense fallback={null}>{path === '/admin' ? <AdminApp /> : <InscricaoPage />}</Suspense>
  }
  return <App />
}

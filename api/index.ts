import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const config = {
  runtime: 'nodejs',
}

const app = new Hono().basePath('/api')

app.get('/health', (c) => {
  return c.json({ ok: true, service: 'missao-cientista' })
})

export default handle(app)

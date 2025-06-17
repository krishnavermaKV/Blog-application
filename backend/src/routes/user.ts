import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signinInput, signupInput } from '@pkriya/blogapp-common'
import { hash, compare } from 'bcryptjs' // ✅ Secure password handling

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()

// --------- SIGNUP ---------
userRouter.post('/signup', async (c) => {
  const body = await c.req.json()
  const parsed = signupInput.safeParse(body)

  if (!parsed.success) {
    c.status(400)
    return c.json({ message: 'Invalid input' })
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const { email, password } = parsed.data

  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    c.status(409)
    return c.json({ error: 'User already exists' })
  }

  const hashedPassword = await hash(password, 10)

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword
    }
  })

  const token = await sign({ id: user.id }, c.env.JWT_SECRET)

  return c.json({ jwt: token })
})

// --------- SIGNIN ---------
userRouter.post('/signin', async (c) => {
  const body = await c.req.json()
  const parsed = signinInput.safeParse(body)

  if (!parsed.success) {
    c.status(400)
    return c.json({ message: 'Invalid input' })
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const { email, password } = parsed.data

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    c.status(401)
    return c.json({ error: 'Invalid credentials' })
  }

  const passwordMatch = await compare(password, user.password)

  if (!passwordMatch) {
    c.status(401)
    return c.json({ error: 'Invalid credentials' })
  }

  const token = await sign({ id: user.id }, c.env.JWT_SECRET)

  return c.json({ jwt: token })
})

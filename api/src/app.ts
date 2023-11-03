import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import passport from 'passport'
import loginWithGoogle from './passport/google'

import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import movieRouter from './routers/movie.router'
import bookRouter from './routers/book.router'
import userRouter from './routers/user.router'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT)

// Global middleware
app.use(
  cors({
    origin: '*',
  })
)
app.use(apiContentType)
app.use(express.json())

// app.use(passport.session())
app.use(passport.initialize())
passport.use(loginWithGoogle())

app.get('/api/google-client-id', (req, res) => {
  const googleClientId = process.env.GOOGLE_CLIENT_ID
  res.json({ googleClientId })
})

// Set up routers
app.use('/api/v1/movies', movieRouter)
app.use('/api/v1/books', bookRouter)
app.use('/api/v1/users', userRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app

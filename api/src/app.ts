import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import config from 'config'
// import data from './config/custom-environment-variables.json'
// import session from 'express-session'
// import cookieParser from 'cookie-parser'
// import passport from 'passport'

import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import movieRouter from './routers/movie.router'
import bookRouter from './routers/book.router'
import userRouter from './routers/user.router'

dotenv.config({ path: '.env' })
const app = express()

// if (!config.get(data.jwtPrivateKey)) {
//   console.error('Fatal Error: jwtPrivateKey is not defined')
//   process.exit(1)
// }

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
/** using passport also requires to ass session and cookieParser middlewares to express
 * To be activated later
app.use(cookieParser())
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      maxAge: 60 * 60 * 24,
    },
    secret: 'secret',
  })
)
app.use(passport.initialize())
app.use(passport.session())
*/

// Set up routers
app.use('/api/v1/movies', movieRouter)
app.use('/api/v1/books', bookRouter)
app.use('/api/v1/users', userRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app

// manual books added to DB
// {"title":"Game of Thrones","isbn":"14216212","description":"A song of ice and fire","publisher":"Sublet books","authors":["George RR martin"], "categories":["Historic", "Fantasy"],"status":"available","borrower":null,"publishDate":"11 Dec 1989","borrowDate":null,"returnDate":null}
// {"title":"Harry Potter","isbn":"12842572","description":"All about magic","publisher":"noone cares publishers","authors":["JK Rowling"],"categories":["Fiction", "Magic", "Fantasy"],"status":"available","borrower":null,"publishDate":"01 Jan 1993","borrowDate":null,"returnDate":null}
// {"title":"World War 2: A Short History","isbn":"9841252","description":"Clear and precise history of the 2nd world war","publisher":"war publishers","authors":["Winstion Churchill", "Roosevelt"],"categories":["History", "Non Fiction"],"status":"available","borrower":null,"publishDate":"01 Jan 1993","borrowDate":null,"returnDate":null}

// manual users added to DB for testing
// {"firstName": "Tipu", "lastName": "Ashfaq", "email": "tipu@gmail.com", "borrowedBooks": []}
// {"firstName": "lee", "lastName": "shaes", "email": "xyz@gmail.com", "borrowedBooks": []}
// {"firstName": "earl", "lastName": "kansy", "email": "abc@gmail.com", "borrowedBooks": []}

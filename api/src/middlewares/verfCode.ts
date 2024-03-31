import { Request, Response, NextFunction } from 'express'

import nodemailer from 'nodemailer'
import crypto from 'crypto'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
})

const emailVerf = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body

  const code = crypto.randomBytes(6).toString('base64')

  req.body.code = code

  console.log(`verification code: ${code}`)

  const mailOptions = {
    from: 'tipu.library@gmail.com',
    to: email,
    subject: 'Verification Code',
    text: code,
  }

  transporter.sendMail(mailOptions, function (err: any) {
    if (err) {
      console.log('Error ' + err)
    } else {
      console.log('Email sent successfully')
      return next()
    }
  })
}

export default emailVerf

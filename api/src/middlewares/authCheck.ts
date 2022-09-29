import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { ForbiddenError } from '../helpers/apiError'
import { JWT_SECRET } from '../util/secrets'

const authCheck = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization
    if (authorizationHeader) {
      console.log('authorizationHeader: ', authorizationHeader)
      const token = authorizationHeader.split(' ')[1]

      const decodedUser = jwt.verify(token, JWT_SECRET)
      console.log('decodedUser: ', decodedUser)

      req.user = decodedUser
      return next()
    }
    throw new ForbiddenError()
  } catch (error) {
    throw new ForbiddenError()
  }
}
export default authCheck

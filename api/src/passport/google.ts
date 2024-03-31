import GoogleTokenStrategy from 'passport-google-id-token'
import User from '../models/User'
import { VerifiedCallback, ParsedToken } from '../types'
import { GOOGLE_CLIENT_ID } from '../util/secrets'

export default function () {
  return new GoogleTokenStrategy(
    { clientID: GOOGLE_CLIENT_ID },
    async (
      parsedToken: ParsedToken,
      googleId: string,
      done: VerifiedCallback
    ) => {
      try {
        let user = await User.findOne({ email: parsedToken.payload.email })
        if (!user) {
          user = new User({
            email: parsedToken.payload.email,
            firstName: parsedToken.payload.given_name,
            lastName: parsedToken.payload.family_name,
            isAdmin: parsedToken.payload.email === 'tipu.solehria@gmail.com',
            picture: parsedToken.payload.picture,
            isVerified: true,
          })
          user.save()
          done(null, user, 'Registered New User')
        } else done(null, user, 'User Login Successful')
      } catch (error) {
        done(error)
      }
    }
  )
}

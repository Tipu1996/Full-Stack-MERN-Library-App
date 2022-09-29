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
        console.log('parsedToken: ', parsedToken)
        console.log('googleId: ', googleId)
        let user = await User.findOne({ email: parsedToken.payload.email })
        if (!user) {
          console.log('creating new user')
          user = new User({
            email: parsedToken.payload.email,
            firstName: parsedToken.payload.given_name,
            lastName: parsedToken.payload.family_name,
            isAdmin: true,
          })
          user.save()
          done(null, user)
        } else done(null, {})
      } catch (error) {
        done(error)
      }
    }
  )
}

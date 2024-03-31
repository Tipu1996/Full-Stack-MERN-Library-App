import { Strategy, ExtractJwt } from 'passport-jwt'
import { JWT_SECRET } from '../util/secrets'

export default function () {
  return new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    (payload, done) => {
      done(null, {})
    }
  )
}

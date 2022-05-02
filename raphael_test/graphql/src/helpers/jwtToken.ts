import jwt from 'jsonwebtoken'

import { config } from '../config'

export const createJWTToken = (email: string): string => {
  const token = jwt.sign({}, config.app.jwtSecret, { expiresIn: config.app.tokenExpiration, subject: email })
  return token
}

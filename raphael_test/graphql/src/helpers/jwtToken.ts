import { JwtPayload, sign, verify } from 'jsonwebtoken'

import { config } from '../config'

export const createJWTToken = (email: string): string => {
  const token = sign({ key: email }, config.app.jwtSecret, { expiresIn: config.app.tokenExpiration })
  return token
}

export const verifyJWTToken = (token: string): string => {
  const decoded = verify(token, config.app.jwtSecret) as JwtPayload
  return decoded.key
}

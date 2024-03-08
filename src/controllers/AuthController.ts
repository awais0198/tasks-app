import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'

import config from '../config/config'
import { User } from '../entity/User'
import { AppDataSource } from '../data-source'

class AuthController {
  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body

    if (!(email && password)) {
      res.status(400).send({ message: 'Invalid credentials' })
      return
    }

    const userRepository = AppDataSource.getRepository(User)

    try {
      const user = await userRepository.findOneOrFail({ where: { email } })

      if (!user.checkIfUnencryptedPasswordIsValid(password)) {
        res.status(401).send()
        return
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        config.jwtSecret,
        { expiresIn: '1h' }
      )

      res.send(token)
    } catch (error) {
      res.status(401).send()
    }
  }
}

export default AuthController

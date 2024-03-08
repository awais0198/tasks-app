import { Request, Response, NextFunction } from 'express'

import { User } from '../entity/User'
import { AppDataSource } from '../data-source'

export const checkRole = (roles) => async (req: Request, res: Response, next: NextFunction) => {
  const id = res.locals.jwtPayload.userId

  const userRepository = AppDataSource.getRepository(User)

  try {
    const user = await userRepository.findOneBy({ id })
    if (user && roles.includes(user.role)) {
      next()
    } else {
      res.status(401).send({ message: 'Unauthorized' })
    }
  } catch (error) {
    res.status(401).send()
  }
}

import { Request, Response } from 'express'
import { validate } from 'class-validator'

import { AppDataSource } from '../data-source'
import { Invitation } from '../entity/Invitation'
import { User } from '../entity/User'

class UserController {
  private userRepository = AppDataSource.getRepository(User)
  private invitationRepository = AppDataSource.getRepository(Invitation)

  newUser = async (req: Request, res: Response) => {
    const { email, password } = req.body
    const user = this.userRepository.create({ email, password }) // Directly create the user instance with the required fields

    const errors = await validate(user)
    if (errors.length > 0) {
      return res.status(400).send(errors)
    }

    user.hashPassword()

    try {
      const existingUser = await this.userRepository.findOneBy({ email })
      if (existingUser) {
        return res.status(400).send({ message: 'Account already exists.' })
      }

      await this.userRepository.save(user)
      const invitation = req.invitation as Invitation
      invitation.expiresAt = new Date()
      await this.invitationRepository.save(invitation)

      res.status(201).send({ message: 'Account created' })
    } catch (e) {
      console.error(e)
      res.status(409).send({ message: 'Something went wrong!' })
    }
  }
}

export default UserController

import { Request, Response } from 'express'
import { Repository } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

import { AppDataSource } from '../data-source'
import { Invitation } from '../entity/Invitation'

class InviteController {
  private invitationRepository: Repository<Invitation>

  constructor() {
    this.invitationRepository = AppDataSource.getRepository(Invitation)
  }

  sendInvite = async (req: Request, res: Response) => {
    const { email: inviteeEmail } = req.body

    if (!inviteeEmail) {
      res.status(400).send({ message: 'email is missing' })
      return
    }

    try {
      let invitation = await this.invitationRepository.findOne({
        where: { inviteeEmail },
      })

      if (!invitation) {
        invitation = this.invitationRepository.create({
          token: uuidv4(),
          expiresAt: new Date(new Date().setDate(new Date().getDate() + 1)),
          inviteeEmail,
        })
      } else {
        invitation.expiresAt = new Date(new Date().setDate(new Date().getDate() + 1))
      }

      await this.invitationRepository.save(invitation)
      res.status(200).send({ invitationToken: invitation.token })
    } catch (error) {
      console.error(error)
      res.status(500).send({ error: 'Something went wrong!' })
    }
  }
}

export default InviteController

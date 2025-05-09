import { User } from '../../models/index.js'
import { Op } from 'sequelize'
import { logger } from '../logger.js'
import _ from 'underscore'

export default async function getRemoteFollowers(usr: any) {
  let res: any = []
  try {
    const followed = await usr.getFollowed({
      where: {
        remoteInbox: { [Op.ne]: null }
      }
    })
    res = _.groupBy(followed, 'federatedHostId')
  } catch (error) {
    logger.error(error)
  }
  return res
}

import dispatchAction from './dispatch-action'

export default class {
  static async edit(playerId, fields) {
    const data = {
      playerId,
      fields
    }

    await dispatchAction("/players-service/edit", data)
  }

  static async delete(playerId) {
    const data = {
      playerId
    }

    await dispatchAction("/players-service/delete", data)
  }

  static async findById(playerId) {
    const data = {
      playerId
    }

    const player = await dispatchAction("/players-service/find-by-id", data)

    return player
  }

  static async addBadge(playerId, badgeId) {
    const data = {
      playerId,
      badgeId
    }

    await dispatchAction("/players-service/add-badge", data)
  }

  static async incrementCampaignLevel(playerId) {
    const data = {
      playerId
    }

    await dispatchAction("/players/increment-campaign-level", data)
  }

  static async updateScore(playerId, differential) {
    const data = {
      playerId,
      differential
    }

    await dispatchAction("/players/update-score", data)
  }
}

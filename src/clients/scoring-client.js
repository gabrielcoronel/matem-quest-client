import dispatchAction from './dispatch-action'

export default class {
  static async getRanking(scoringPeriod) {
    const data = {
      scoringPeriod
    }

    const ranking = await dispatchAction("/scoring-service/get-ranking", data)

    return ranking
  }
}

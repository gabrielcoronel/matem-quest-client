import dispatchAction from './dispatch-action'

export default class {
  static async signUp(player) {
    const session = await dispatchAction("/auth-service/sign-up", player)

    return session
  }

  static async logIn(email, password) {
    const data = {
      email,
      password
    }

    const session = await dispatchAction("/auth-service/log-in", data)

    return session
  }

  static async logOut(token) {
    const data = {
      token
    }

    await dispatchAction("/auth-service/log-out", data)
  }

  static async changeEmail(playerId, email, password) {
    const data = {
      playerId,
      email,
      password
    }

    await dispatchAction("/auth-service/change-email", data)
  }

  static async changePassword(playerId, oldPassword, newPassword) {
    const data = {
      playerId,
      oldPassword,
      newPassword
    }

    await dispatchAction("/auth-service/change-password", data)
  }
}
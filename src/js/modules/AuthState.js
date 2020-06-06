export default class AuthState {
  constructor({
    isLoggedIn,
  }) {
    this.isLoggedIn = isLoggedIn || false;
  }
}

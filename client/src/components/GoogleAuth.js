import React, { Component } from 'react';
import './GoogleAuth.css';

class GoogleAuth extends Component {
  state = {
    isSignedIn: null
  };
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '747870678542-2noo2jsh9p0751fdjrmb42ib5mgbbiut.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }
  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };
  onSignInClick = () => {
    this.auth.signIn();
  };
  onSignOutClick = () => {
    this.auth.signOut();
  };
  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return (
        <button
          className="loginBtn loginBtn--google"
          onClick={this.onSignOutClick}
        >
          Log Out
        </button>
      );
    } else {
      return (
        <button
          className="loginBtn loginBtn--google"
          onClick={this.onSignInClick}
        >
          Login with Google
        </button>
      );
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

export default GoogleAuth;

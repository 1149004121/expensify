import React from "react";
import { firebase } from '../firebase/firebase';

export default class LoginWithEmail extends React.Component {
  state = {
    email: "",
    password: "",
    error: null
  }
  onSubmit = (e) => {
    e.preventDefault();
    if (this.props.isLogin) {
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(error => {
        // Handle Errors here.
        var errorMessage = error.message;
        // console.log(error);
        this.setState({ error: errorMessage });
      })
    } else {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(error => {
        // Handle Errors here.
        var errorMessage = error.message;
        // console.log(error);
        this.setState({ error: errorMessage });
      })
    }
  }
  onEmailChange = (e) => {
    const email = e.target.value
    this.setState(() => ({ email }))
  }
  onPasswordChange = (e) => {
    const password = e.target.value
    this.setState(() => ({ password }))
  }
  render() {
    return (
      <form onSubmit={this.onSubmit} className="log-email">
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            placeholder="your@email.com"
            value={this.state.email}
            onChange={this.onEmailChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.onPasswordChange}
          />
        </div>
        <button className="button">{this.props.isLogin ? "Sign in" : "Complete Sign up"}</button>
        {this.state.error ? <span>{this.state.error}</span> : null}
      </form>
    )
  }
}




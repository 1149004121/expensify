import React from "react";
import LoginWithGithub from "./LoginWithGithub";
import LoginWithGoogle from "./LoginWithGoogle";
import LoginWithEmail from "./LoginWithEmail";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class SigninPage extends React.Component {
  state = {
    isLogin: false
  }
  constructor() {
    super();
  }
  componentDidMount() {
    this.setState({ isLogin: this.props.match.path === "/login" })
  }
  render() {
    return (
      <div className="login-layout">
        <div className="login-layout__box">
          <h1>{this.state.isLogin ? "Sign in to Expensify" : "Sign up for Expensify"}</h1>
          <p>It's time to get your expenses under control</p>
          <div className="sign">
            <LoginWithGoogle />
            <LoginWithGithub />
          </div>
          <div className="or">
            <div className="left-line"></div>
            <p>or</p>
            <div className="right-line"></div>
          </div>
          <LoginWithEmail isLogin={this.state.isLogin} />
          <span className="log-mes">{this.state.isLogin ? "Need an account?" : "Already have an account?"}</span>
          <Link to={this.state.isLogin ? "/" : "/login"} className="redirect">{this.state.isLogin ? "Sign up" : "Sign in"}</Link>
        </div>
      </div>
    )
  }
}

export default connect()(SigninPage)
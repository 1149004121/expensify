import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";

export const LoginPage = ({ startLogin }) => (
  <div className="login-layout">
    <div className="login-layout__box">
      <h1>Expensify</h1>
      <p>It's time to get your expenses under control</p>
      <button onClick={startLogin} className="button">Login</button>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage);
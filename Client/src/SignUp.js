import React from "react";
import styled from "styled-components";
import API from "./utils/API";
import {
  getFromStorage,
  setInStorage
} from "./utils/storage";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

import GoogleLogin from "react-google-login";

class SignUp extends React.Component {
  state = {
    user: {
      email: "",
      password: "",
      username: ""
    },
    token: "",
    isLoading: true
  };

  handleEmailChange = event => {
    this.setState({
      user: {
        email: event.target.value,
        password: this.state.user.password,
        isLoading: true
      }
    });
    event.preventDefault();
  };
  handlePasswordChange = event => {
    this.setState({
      user: {
        email: this.state.user.email,
        password: event.target.value,
        isLoading: true
      }
    });
    event.preventDefault();
  };

  login = i => {
    if (i) {
      i.preventDefault();
    }
    API.login(this.state.user)
      .then(res => {
        // console.log(res);
        if (res) {
          setInStorage("the_main_app", {
            token: res.data.token
          });
          this.setState({
            isLoading: false,
            token: res.data.token
          });
        } else {
          this.setState({
            isLoading: false
          });
        }
        this.refreshPage();
      })
      .catch(err => console.log(err));
  };

  logout = i => {
    if (i) {
      i.preventDefault();
    }
    API.logout(this.state.token)
      .then(res => {
        // console.log(res);
        if (res) {
          localStorage.removeItem("the_main_app");
          this.setState({
            token: "",
            isLoading: false
          });
        } else {
          this.setState({
            isLoading: false
          });
        }
        this.refreshPage();
      })
      .catch(err => console.log(err));
  };

  verify = i => {

    if (i) {
      i.preventDefault();
    }

    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      API.verify(token).then(res => {
        if (res) {
          // console.log("token checked");
          this.setState({
            token: token
          });
        } else {
          this.setState({
            isLoading: false
          });
        }
      });
    } else {
      // console.log("no token");
      this.setState({
        isLoading: false
      });
    }
  };

  signUp = i => {
    if (i) {
      i.preventDefault();
    }
    API.createUser(this.state.user).then(res => {
      if (res) {
        // console.log("signed up");
        API.login(this.state.user)
          .then(res => {
            // console.log(res);
            if (res) {
              setInStorage("the_main_app", {
                token: res.data.token
              });
              this.setState({
                isLoading: false,
                token: res.data.token
              });
            } else {
              this.setState({
                isLoading: false
              });
            }
          })
          .catch(err => console.log(err));
      } else {
        console.log("error");
      }
    });
  };

  refreshPage() {
    window.location.reload(false);
  }

  componentDidMount() {
    this.verify();
  }

  responseFacebook = response => {
    // console.log(response);
  };

  responseGoogle = response => {
    // console.log(response);
    this.setState({
      user: {
        email: response.profileObj.email,
        password: response.googleId,
        username: response.googleId
      }
    });
    this.signUp();
  };

  render() {
 

    return (
      <Style>
        <FacebookLogin
          appId="3078145498897170"
          fields="name,email,picture"
          callback={this.responseFacebook()}
          render={renderProps => (
            <button onClick={renderProps.onClick}>
              Sign Up
            </button>
          )}
        />

        <GoogleLogin
          clientId="696659809470-2r6j4siq7i296mrufjq4glm7r8lqul0p.apps.googleusercontent.com"
          buttonText="SIGN UP WITH GOOGLE"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
        />

        <input
          id="emailLogin"
          placeholder="email"
          onChange={this.handleEmailChange}
        ></input>
        <input
          onChange={this.handlePasswordChange}
          id="passwordLogin"
          placeholder="password"
        ></input>
        <button
          onClick={e => {
            this.login();
            // this.refreshPage();
          }}
        >
          login
        </button>
        <div>
          <button
            onClick={e => {
              this.logout();
              //   this.refreshPage();
            }}
          >
            logout
          </button>
        </div>
      </Style>
    );
  }
}

const Style = styled.section``;

export default SignUp;

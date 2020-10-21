import React from "react";
import styled from "styled-components";
import API from "./utils/API";
import {
  getFromStorage,
  setInStorage
} from "./utils/storage";
import GoogleLogin from "react-google-login";
import Settings from "./Settings";
import Checkout from "./Checkout";
import Preferences from "./Preferences";
import Arrow from "./images/arrow.png";
import up from "./images/up.png";
import down from "./images/down.png";

import { LoaderDots } from "@thumbtack/thumbprint-react";

class Login extends React.Component {
  state = {
    user: {
      email: "",
      password: "",
      username: ""
    },
    userId: "",
    loggedIn: false,
    token: "",
    isLoading: true,
    email: "",
    signUp: false,
    needRefresh: false,
    error: "",
    showLogout: false,
    payment: false,
    showPreferences: SVGComponentTransferFunctionElement
  };

  handleEmailChange = event => {
    this.setState({
      user: {
        email: event.target.value,
        password: this.state.user.password
      }
    });
    event.preventDefault();
  };
  handlePasswordChange = event => {
    this.setState({
      user: {
        email: this.state.user.email,
        password: event.target.value
      }
    });
    event.preventDefault();
  };

  handleEmailChange1 = event => {
    this.setState({
      user: {
        email: event.target.value,
        username: event.target.value,
        password: this.state.user.password
      }
    });
    event.preventDefault();
  };
  handlePasswordChange1 = event => {
    this.setState({
      user: {
        email: this.state.user.email,
        username: this.state.user.username,
        password: event.target.value
      }
    });
    event.preventDefault();
  };

  login = i => {
    if (i) {
      i.preventDefault();
    }
    if (this.state.user.password === "") {
      this.setState({
        error: "Please enter password."
      });
    }

    if (this.state.user.email === "") {
      this.setState({
        error: "Must enter email."
      });
    }
    API.login(this.state.user)
      .then(res => {
   
        if (res.data.success) {
          setInStorage("the_main_app", {
            token: res.data.token
          });
          this.setState({
            needRefresh: true,
            isLoading: true,
            token: res.data.token,
            loggedIn: true
          });
          this.verify();
        }
        if (
          res.data.message === "Error: Invalid Password"
        ) {
          this.setState({
            error: "Invalid password."
          });
        }
        if (res.data.message === "Error: Invalid") {
          this.setState({
            error: "User not found."
          });
        }
      })
      .catch(err => console.log(err));
  };

  retrieveGrid = i => {
    if (i) {
      i.preventDefault();
    }
    const id = this.state.userId;
    API.retrieve(id).then(res => {
   
      this.setState({
        email: res.data.email,
        isLoading: false
      });
    
    });
    if (this.state.needRefresh) {
     
      this.refreshPage();
    }
  };

  logout = i => {
    if (i) {
      i.preventDefault();
    }
    API.logout(this.state.token)
      .then(res => {
       
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
        
          if (this.state.payment){
          this.setState({
            token: token,
          });

        } else {
          this.setState({
            token: token,
            loggedIn: true,
            userId: res.data.userId,
            isLoading: true
          });
        }
        } else {
          this.setState({
            isLoading: true
          });
        }
        this.retrieveGrid();
      });
    } else {
    
      this.setState({
        isLoading: false
      });
    }
  };

  checkCreds = i => {
    if (i) {
      i.preventDefault();
    }

    if (this.state.user.password === "") {
      this.setState({
        error: "Please enter password."
      });
    }

    if (this.state.user.email === "") {
      this.setState({
        error: "Must enter email."
      });
    }

    if (this.state.user.password.length < 6) {
      this.setState({
        error: "Pasword must be at least 6 characters"
      });
    } 

    if (/\S+@\S+\.\S+/.test(this.state.user.email) === false) {
      this.setState({
        error: "must be a valid email"
      })
    }

    else{
      this.setCreds();
      this.setState({
        payment: true
      });
    }
  };

  login = i => {
    if (i) {
      i.preventDefault();
    }
    if (this.state.user.password === "") {
      this.setState({
        error: "Please enter password."
      });
    }

    if (this.state.user.email === "") {
      this.setState({
        error: "Must enter email."
      });
    }
    API.login(this.state.user)
      .then(res => {
        // console.log(res);
        if (res.data.success) {
          setInStorage("the_main_app", {
            token: res.data.token
          });
          this.setState({
            needRefresh: true,
            isLoading: true,
            token: res.data.token,
            loggedIn: true
          });
          this.verify();
        }
        if (
          res.data.message === "Error: Invalid Password"
        ) {
          this.setState({
            error: "Invalid password."
          });
        }
        if (res.data.message === "Error: Invalid") {
          this.setState({
            error: "User not found."
          });
        }
      })
      .catch(err => console.log(err));
  };

  refreshPage() {
    window.location.reload(false);
    this.setState({
      needRefresh: false
    });
  }

  setCreds(){
    setInStorage("the_main_app", {
      user: this.state.user
    });
  }

  componentDidMount() {
    this.verify();
  }

  responseGoogle = response => {

    this.setState({
      user: {
        email: response.profileObj.email,
        password: response.googleId
        // username: response.googleId
      },
      needRefresh: true
    });
    this.login();
  };

  responseGoogleSignUp = response => {

    this.setState({
      user: {
        email: response.profileObj.email,
        password: response.googleId,
        username: response.googleId
      },
      // needRefresh: true
    });
    this.setCreds();
    this.setState({
      payment: true
    });
    // this.setState({
    //   payment:true
    // });
  };

  changeLogout = () => {
   
    if (this.state.showLogout) {
      this.setState({
        showLogout: false
      });
    } else {
      this.setState({ showLogout: true });
    }
  };
  render() {
  
    return (
      <Style className="canDrag">
        {this.state.isLoading ? (
          <div id="loadingDiv">
            <LoaderDots
              id="loadingDots"
              size="small"
              theme="muted"
            />
          </div>
        ) : (
          <div id="loginBoxBorder">
            {this.state.loggedIn ? (
              <div id="email">
                <div id="topRight">
                  <p id="email1">{this.state.email}</p>

                  {this.state.showLogout ? (
                    <img
                      id="uparrow"
                      onClick={e => {
                        this.changeLogout();
                      }}
                      src={up}
                    />
                  ) : (
                    <img
                      id="uparrow"
                      onClick={e => {
                        this.changeLogout();
                      }}
                      src={down}
                    />
                  )}
                </div>

                {this.state.showLogout ? (
                  <div id="buttons">
                    <button
                      id={
                        this.state.showPreferences
                          ? "widgets"
                          : "widgetSelected"
                      }
                      onClick={e => {
                        this.setState({
                          showPreferences: true,
                          showLogout: false
                        });
                      }}
                    >
                      Preferences
                    </button>
                    <button
                      id={
                        this.state.showPreferences
                          ? "preferenceSelected"
                          : "preferences"
                      }
                      onClick={e => {
                        this.setState({
                          showPreferences: false,
                          showLogout: false
                        });
                      }}
                    >
                      Widgets
                    </button>
                    <button
                      id="logoutbutton"
                      onClick={e => {
                        this.logout();
                      }}
                    >
                      Log out
                    </button>
                  </div>
                ) : (
                  <p id="blank"></p>
                )}
                {this.state.showPreferences ? (
                  <Preferences />
                ) : (
                  <Settings />
                )}
              </div>
            ) : this.state.signUp ? (
              !this.state.payment ? (
              <div>
                <div>
                  <div className="LoginButton">
                    <GoogleLogin
                      clientId="696659809470-2r6j4siq7i296mrufjq4glm7r8lqul0p.apps.googleusercontent.com"
                      buttonText="SIGN UP WITH GOOGLE"
                      id="google"
                      onSuccess={this.responseGoogleSignUp}
                      onFailure={this.responseGoogleSignUp}
                    />
                  </div>
                  <p id="error">&nbsp;{this.state.error}</p>
                  <div id="loginBox">
                    <div id="regularLogin">
                      <div>
                        <input
                          id="emailLogin"
                          placeholder="email"
                          onChange={this.handleEmailChange1}
                        ></input>
                      </div>
                      <div>
                        <input
                          onChange={
                            this.handlePasswordChange1
                          }
                          id="passwordLogin"
                          placeholder="password"
                          type="password"
                        ></input>
                      </div>
                    </div>
                    <button
                      id="go"
                      onClick={e => {
                        // this.signUp();
                        this.checkCreds();
                        // this.setCreds();
                        // SIGNUP
                      }}
                    >
                      <img src={Arrow} id="arrow" />
                    </button>
                  </div>
                  <div id="signUpBox">
                    <p id="account">Go back to </p>{" "}
                    <p
                      id="accountBold"
                      onClick={e =>
                        this.setState({
                          signUp: false
                        })
                      }
                    >
                      login
                    </p>
                  </div>
                </div>
              </div>
              ) : (<Checkout/>)
            ) : (
              <div>
                <div className="LoginButton">
                  <GoogleLogin
                    clientId="696659809470-2r6j4siq7i296mrufjq4glm7r8lqul0p.apps.googleusercontent.com"
                    buttonText="LOG IN WITH GOOGLE"
                    id="google"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                  />
                </div>
                <p id="error">&nbsp;{this.state.error}</p>
                <div id="loginBox">
                  <div id="regularLogin">
                    <div>
                      <input
                        id="emailLogin"
                        placeholder="email"
                        onChange={this.handleEmailChange}
                      ></input>
                    </div>
                    <div>
                      <input
                        onChange={this.handlePasswordChange}
                        id="passwordLogin"
                        placeholder="password"
                        type="password"
                      ></input>
                    </div>
                  </div>
                  <button
                    id="go"
                    onClick={e => {
                      this.login();
                    }}
                  >
                    <img src={Arrow} id="arrow" />
                  </button>
                </div>
                <div id="signUpBox">
                  <p id="account">
                    Don't have an account?{" "}
                  </p>
                  <p
                    id="accountBold"
                    onClick={e =>
                      this.setState({
                        signUp: true
                      })
                    }
                  >
                    &nbsp; Sign up!
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </Style>
    );
  }
}

const Style = styled.section`
  #buttons {
    background: #fff;
    border-radius: 8px;
    /* box-shadow: 0 2px 10px 0 rgba(0,0,0,0.2); */
  }
  #topRight {
    margin-right: 1vh;
  }
  #blank {
    position: absolute;
  }

  .LoginButton button {
    /* width: 41%;
font-size: 11px; */
  }

  #logoutbutton {
    /* background-color: #919191; */
    color: #919191;
    border: none;
    // border-radius: 0px 0px 8px 8px;
    padding-bottom: 1%;
    font-size: 0.9em;
    /* font-weight: 600; */
    margin-top: 10%;
    position: absolute;
    z-index: 1000000;
    right: 1%;
    width: 23.5%;
    text-align: right;
    color: #5f6368;
    line-height: 16px;
    padding-top: 0.8%;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    font-weight: 500;
    background-color:white;
  }

  #preferences {
    /* background-color: #919191; */
    border: none;

    padding-top: 1%;
    padding-bottom: 1%;
    font-size: 0.9em;
    /* font-weight: 600; */
    margin-top: 5%;
    position: absolute;
    z-index: 1000000;
    right: 1%;
    width: 23.5%;
    text-align: right;
    color: #5f6368;
    line-height: 16px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
    font-weight: 700;
    // color: royalblue;
    background: white;
  }
  #widgets {
    /* background-color: #919191; */
    border: none;
    // border-radius: 8px 8px 0px 0px;
    padding-top: 1%;
    padding-bottom: 1%;
    font-size: 0.9em;
    /* font-weight: 600; */
    margin-top: 0%;
    position: absolute;
    z-index: 1000000;
    right: 1%;
    width: 23.5%;
    text-align: right;
    color: #5f6368;
    line-height: 16px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
    font-weight: 700;
    // color: royalblue;
    background: white;
  }
  #widgetSelected {
    background: white;
    border: none;
    // border-radius: 8px 8px 0px 0px;
    padding-top: 1%;
    padding-bottom: 1%;
    font-size: 0.9em;
     font-weight: 900; 
    margin-top: 0%;
    position: absolute;
    z-index: 1000000;
    right: 1%;
    width: 23.5%;
    text-align: right;
    color: #5f6368;
    line-height: 16px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
    font-weight: 500;
    /* color: slateblue; */
  }

  #preferenceSelected {
    background: white;
    border: none;

    padding-top: 1%;
    padding-bottom: 1%;
    font-size: 0.9em;
    /* font-weight: 600; */
    margin-top: 5%;
    position: absolute;
    z-index: 1000000;
    right: 1%;
    width: 23.5%;
    text-align: right;
 
    line-height: 16px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
    font-weight: 500;
    color: #919191;
  }

  #preferences:focus {
    outline: none;
  }
  #widgets:focus {
    outline: none;
  }

  #logoutbutton:hover {
    cursor: pointer;
    background-color: #ededed;
  }

  #widgets:hover {
    cursor: pointer;
    background-color: #ededed;
  }

  #preferenceSelected:hover {
    cursor: pointer;
    background-color: #ededed;
  }

  #widgetSelected:hover {
    cursor: pointer;
    background-color: #ededed;
  }

  #preferences:hover {
    cursor: pointer;
    background-color: #ededed;
  }

  #email1 {
    display: inline-block;
    margin: 0;
  }

  #uparrow {
    display: inline-block;
    margin: 0;
    font-size: 0.8em;
    z-index: 20;
    width: 1.7vh;

    margin-left: 0.5vh;
  }

  #error {
    margin: 0;
    font-size: 0.7em;
    text-align: center;
    margin-top: 1.5vh;
    color: rgb(207, 74, 34);
  }

  #loadingDiv {
    padding-top: 15.33vh;
    text-align: center;
    background-color: white;
    z-index: 5;
  }

  #email {
    float: right;
    /* margin-top: -5%; */
    margin-top: 1%;

    color: #666;
    font-size: 0.75em;
    text-align: right;
    font-weight: 500;
  }

  #loginBoxBorder {
    border-radius: 15px;
    border: 1px solid #dfe1e5;
    background-color: white;
    height: 32.33vh;
    overflow: scroll;
  }

  #signUpBox {
    text-align: center;
    font-size: 0.8em;
    margin-top: 1%;
  }

  #account {
    display: inline-block;
    color: rgba(0, 0, 0, 0.54);
    font-size: 0.9em;
    margin-top: 1vh;
  }

  #accountBold {
    display: inline-block;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.54);
    text-decoration: none;
    font-size: 0.9em;
    margin-top: 1vh;
  }

  #accountBold:hover {
    cursor: pointer;
  }
  #arrow {
    width: 60%;
    padding: 5%;
    padding-top: 10%;
    padding-left: 7%;
  }
  #go {
    margin-top: 4%;
    background-color: #dfe1e5;
    color: white;
    border: 0;
    border-radius: 3px;
    width: 8%;
    margin-bottom: 4%;
  }

  #go:hover {
    cursor: pointer;
  }
  #emailLogin {
    border: 0;
    margin-left: 2%;
    margin-top: 0.2vh;
    padding-top: 1vh;
    width: 90%;
  }
  #emailLogin:focus {
    outline: none;
  }

  #passwordLogin:focus {
    outline: none;
  }

  #passwordLogin {
    border: 0;
    padding-top: 2vh;
    margin-left: 2%;
    margin-top: 0.2vh;
    width: 90%;
  }
  #emailLogin1 {
    border: 0;
    margin-left: 2%;
    margin-top: 0.2vh;
    padding-top: 2vh;
    width: 90%;
  }
  #emailLogin1:focus {
    outline: none;
  }

  #passwordLogin1:focus {
    outline: none;
  }

  #passwordLogin1 {
    border: 0;
    padding-top: 2vh;
    margin-left: 2%;
    margin-top: 0.2vh;
    width: 90%;
  }
  #loginBox {
    display: flex;
    justify-content: center;
    margin-top: 0.5vh;
  }
  .LoginButton {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 4.5vh;
  }
  #facebook {
    background-color: #4267b2;
    color: white;
    display: inline-flex;
    align-items: center;
    padding: 0;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 2.2px 2px 0px,
      rgba(0, 0, 0, 0.24) 0px 0px 1px 0px;
    border: 2.2px solid transparent;
    margin-right: 3%;
    /* display: block; */
  }
  #google {
    margin-left: 3%;
  }
  #fblogin {
    font-family: Helvetica, Arial, sans-serif;
    font-weight: bold;
    font-size: 14px;
    padding: 11px 10px 11px 0px;
  }
  #facebookLogo {
    height: 19px;
    width: 19px;
    padding: 10px;
    margin-right: 10px;
    /* display: inline-block; */
  }

  #regularLogin {
    display: block;
    border-top: 1px solid #dfe1e5;
    width: 70%;
    display: block;
    border-bottom: 1px solid #dfe1e5;
    padding-bottom: 1vh;
  }
`;

export default Login;

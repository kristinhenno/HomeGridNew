import React, { Component } from "react";
import styled from "styled-components";
import API from "./utils/API";
import axios from "axios";
import { getFromStorage, setInStorage } from "./utils/storage";
import Checkbox from "@material-ui/core/Checkbox";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import { createMuiTheme } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ClipLoader from "react-spinners/ClipLoader";

class Checklist extends React.Component {
  state = {
    token: "",
    userId: "",
    list: [],
    isLoading: true,
    userInput: "",
    showCompleted: false,
    disabled: true,
    currentItem: ""
  };

  constructor(props) {
    super(props);
    this.addToDo = React.createRef();
  }

  handleChange = event => {
    this.setState({
      userInput: event.target.value
    });
    event.preventDefault();
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.addItem(this.state.userInput);
      this.setState({
        userInput: ""
      });
    }
  };

  updateItem = (id, event) => {
    const newList = this.state.list;
    var i;
    for (i = 0; i < newList.length; i++) {
      if (newList[i].id === id) {
        newList[i].todo = event;
      }
    }
    this.updateListState();
  };

  retrieveList = i => {
    if (i) {
      i.preventDefault();
    }
    const id = this.state.userId;
    API.retrieve(id).then(res => {
      if (res.data.list.length > 0) {
        // console.log(res.data.list);
        const listArray = res.data.list;

        // console.log(listArray);

        this.setState({
          list: listArray,
          isLoading: false
        });
      } else {
        this.setState({
          isLoading: false
        });
      }
    });
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
          // console.log(res);
          this.setState({
            token: token,
            userId: res.data.userId
          });
          // console.log("loggedIn");
          this.retrieveList();
        } else {
          this.setState({
            isLoading: true
          });
        }
      });
    } else {
      // console.log("no token");
      this.setState({
        isLoading: false,
        isLoggedIn: false
      });
    }
  };

  updateListState = i => {
    if (i) {
      i.preventDefault();
    }
    const id = this.state.userId;
    const list = this.state.list;

    API.updatelist(id, list).then(res => {
      if (res) {
        // console.log("list added");
      }
    });
  };

  addItem = item => {
    const itemArray = this.state.list;
    const object = {
      todo: item,
      date: "5/02/20",
      completed: false,
      id: itemArray.length + 1,
      isDeleted: false
    };
    itemArray.push(object);
    this.setState({
      list: itemArray,
      userInput: ""
    });
    this.updateListState();
  };

  setCompleted = id => {
    const newList = this.state.list;
    var i;
    for (i = 0; i < newList.length; i++) {
      if (newList[i].id === id) {
        if (newList[i].completed) {
          newList[i].completed = false;
          setTimeout(() => {
            this.setState({
              list: newList
            });
          }, 2000);
          this.updateListState();
          break;
        } else {
          newList[i].completed = true;
          setTimeout(() => {
            this.setState({
              list: newList
            });
          }, 2000);
          this.updateListState();
          break;
        }
      }
    }
  };

  removeItem = id => {
    const newList = this.state.list;
    var i;
    for (i = 0; i < newList.length; i++) {
      if (newList[i].id === id) {
        newList[i].isDeleted = true;

        this.setState({
          list: newList
        });

        break;
      }
    }
  };

  componentDidMount() {
    this.verify();
  }

  render() {
    // console.log(this.state.userInput);
    // console.log(this.state.list);
    return (
      <Style>
        <div id="checklist">
          {this.state.isLoading ? (
            <p id="spinner">
              <ClipLoader size={40} color={"#0f9d58"} />
            </p>
          ) : (
            <div>
              <div id="checklistButtons">
                <p
                  id={this.state.showCompleted ? "navTodoSmall" : "navTodo"}
                  onClick={e =>
                    this.setState({
                      showCompleted: false
                    })
                  }
                >
                  Tasks
                </p>
                <p
                  id={
                    this.state.showCompleted
                      ? "navCompleted"
                      : "navCompletedSmall"
                  }
                  onClick={e =>
                    this.setState({
                      showCompleted: true
                    })
                  }
                >
                  Completed
                </p>
                {this.state.showCompleted ? (
                  <p id="nothing"></p>
                ) : (
                  <p
                    id="navAdd"
                    onClick={() => {
                      this.addToDo.current.focus();
                    }}
                  >
                    <AddCircleOutlineIcon fontSize="small" />
                  </p>
                )}
              </div>
              {this.state.showCompleted ? (
                <div id="completed">
                  {this.state.list.length > 0 ? (
                    this.state.list.reverse().map(item => {
                      // console.log(item);
                      // console.log(item[index].todo);
                      if (item.completed && !item.isDeleted) {
                        return (
                          <div>
                            <div className="completedItems">
                              <Checkbox
                                size="small"
                                onClick={e => this.setCompleted(item.id)}
                                type="checkbox"
                                name={item.todo}
                                checkedIcon={<RadioButtonUncheckedIcon />}
                                icon={<RadioButtonCheckedIcon />}
                              />
                              <p className="itemDisplayedCompleted">
                                {item.todo}
                              </p>
                              <p
                                id="deleteTodoCompleted"
                                onClick={e => this.removeItem(item.id)}
                              >
                                x
                              </p>
                            </div>
                            <div id="line2"></div>
                          </div>
                        );
                      }
                    })
                  ) : (
                    <p></p>
                  )}
                </div>
              ) : (
                <div id="todos">
                  <div id="todoList">
                    <div id="todo">
                      {this.state.list.length > 0 ? (
                        this.state.list.map(item => {
                          // console.log(item);
                          if (!item.completed && !item.isDeleted) {
                            return (
                              <div>
                                <div className="todoItems">
                                  <Checkbox
                                    size="small"
                                    onClick={e => this.setCompleted(item.id)}
                                    type="checkbox"
                                    name={item.todo}
                                    icon={<RadioButtonUncheckedIcon />}
                                    checkedIcon={<RadioButtonCheckedIcon />}
                                  />
                                  <input
                                    spellcheck="false"
                                    maxlength="90"
                                    onChange={e => {
                                      // console.log(e.target.value);
                                      this.updateItem(item.id, e.target.value);
                                    }}
                                    defaultValue={item.todo}
                                    className="itemDisplayed"
                                  />

                                  <p
                                    id="deleteTodo"
                                    onClick={e => this.removeItem(item.id)}
                                  >
                                    x
                                  </p>
                                </div>
                                <div id="line"></div>
                              </div>
                            );
                          }
                        })
                      ) : (
                        <p></p>
                      )}
                    </div>
                  </div>
                  <div id="addButton">
                    <Checkbox
                      size="small"
                      // onClick={e => this.setCompleted(item.id)}
                      type="checkbox"
                      // name={item.todo}
                      onClick={e => this.addItem(this.state.userInput)}
                      icon={<AddCircleOutlineIcon />}
                      checkedIcon={<AddCircleOutlineIcon />}
                    />
                    <input
                      ref={this.addToDo}
                      value={this.state.userInput || ""}
                      onKeyPress={this.handleKeyPress}
                      id="additeminput"
                      onChange={this.handleChange}
                    ></input>
                    {/* <button onClick={e => this.addItem(this.state.userInput)}>
                      add
                    </button> */}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Style>
    );
  }
}

const Style = styled.section`
  #spinner {
    text-align: center;
    margin-top: 11vh;
  }
  #line {
    width: 81%;
    margin-left: 9%;
    border-bottom: 1px solid lightgray;
    /* position: absolute; */
    /* margin-bottom: -4%; */
    margin-top: -1.5%;
  }
  #line2 {
    width: 79.2%;
    margin-left: 12%;
    border-bottom: 1px solid lightgray;
    margin-top: -1.5%;
  }

  #nothing {
    display: inline-block;
    margin: 0;
  }
  #navAdd {
    margin: 0;
    display: inline-block;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.54);
    float: right;
    margin: 2% 4% 0 0;
  }
  #navTodo {
    font-family: "Balsamiq Sans", cursive;
    margin: 0;
    margin: 2% 1.5% 2% 5%;
    display: inline-block;
    cursor: pointer;
    color: #db4437;
    border-bottom: 1px solid #db4437;
  }

  #navTodoSmall {
    font-family: "Balsamiq Sans", cursive;
    margin: 0;
    margin: 2% 1.5% 2% 5%;
    display: inline-block;
    cursor: pointer;
    font-size: 0.8em;
  }

  #navCompleted {
    font-family: "Balsamiq Sans", cursive;
    margin: 0;
    margin: 2% 1% 2% 0%;
    display: inline-block;
    cursor: pointer;
    color: #0f9d58;
    border-bottom: 1px solid #0f9d58;
  }
  #navCompletedSmall {
    font-family: "Balsamiq Sans", cursive;
    margin: 0;
    margin: 2% 1% 2% 0%;
    font-size: 0.7em;
    display: inline-block;
    cursor: pointer;
    font-size: 0.8em;
  }

  #additeminput {
    border: none;
    width: 85%;
    background-color: transparent;
  }
  #additeminput:focus {
    outline: none;
  }
  #deleteTodo {
    display: none;
    padding-right: 8%;
    margin-top: 2%;
    margin-bottom: 0%;
  }
  #deleteTodoCompleted {
    display: none;
    padding-right: 8%;
    margin-top: 1.5%;
    margin-bottom: 0%;
  }
  #deleteTodoCompleted:hover {
    cursor: pointer;
    display: block;
  }
  #deleteTodo:hover {
    cursor: pointer;
    display: block;
  }
  .itemDisplayed:focus + #deleteTodo {
    display: block;
  }

  .itemDisplayedCompleted:hover + #deleteTodoCompleted {
    display: block;
  }

  .itemDisplayed:focus {
    outline: none;
  }

  #checklistButtons {
    /* display: flex;
    flex-direction: row;
    justify-content: space-between; */
    margin-top: 0.4vh;
  }
  .todoItems .MuiCheckbox-colorSecondary.Mui-checked {
    color: #35c44b;
  }
  .todoItems .MuiIconButton-colorSecondary:hover {
    background-color: rgba(53, 196, 75, 0.04);
  }

  #addButton .MuiIconButton-colorSecondary:hover {
    background-color: rgba(53, 196, 75, 0.04);
  }

  #addButton .MuiCheckbox-colorSecondary.Mui-checked {
    color: rgba(0, 0, 0, 0.54);
  }

  #addButton {
    margin-top: -2%;
  }

  .itemDisplayed {
    width: 79%;
    padding: 0;
    /* margin-top: 2.5%; */
    /* margin-bottom: 2.5%; */
    resize: none;
    border: none;
    font-size: 12px;
    font-family: sans-serif;
    background-color: transparent;
  }

  .itemDisplayedCompleted {
    width: 79%;
    padding: 0;
    /* margin-top: 2.5%; */
    /* margin-bottom: 2.5%; */
    resize: none;
    border: none;
    font-size: 12px;
    font-family: sans-serif;
    background-color: transparent;
    margin-top: 0.7em;
    margin-bottom: 0.2em;
  }
  .todoItems {
    display: flex;
    margin-top: -1.8%;
    /* padding-left: 3%; */
  }

  .completedItems {
    display: flex;
    padding-left: 3%;
    margin-top: -1.7%;
  }
  #checklist {
    /* overflow: scroll; */
    height: 32.33vh;
    border-radius: 15px;
    /* border: 0.8vh solid #ebeef2; */
    background-color: white;
    border: 1px solid #adadad;
  }
  #todoList {
    display: flex;
  }

  #todos {
    height: 25vh;
    overflow: scroll;
    width: 95%;
    padding-left: 3%;
  }

  .PrivateSwitchBase-root-16 {
    padding: 7px;
  }
  #todo {
    width: 100%;
  }

  #completed {
    height: 25vh;
    overflow: scroll;
    width: 97%;
  }
`;

export default Checklist;

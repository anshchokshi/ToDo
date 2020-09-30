import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import FormControl from "@material-ui/core/FormControl";
import React, { Component } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import AddIcon from "@material-ui/icons/Add";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import { withRouter } from "react-router-dom";

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

//mport DropDown from './Images/down-arrow.png'

class App extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      task: "",
    };
  }

  componentDidMount() {
    const user = firebase.auth().currentUser;
    const { location, history } = this.props;
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .collection("todo")
      .onSnapshot((querySnapshot) => {
        var items = [];
        querySnapshot.forEach(function (doc) {
          items.push(doc);
          debugger;
        });
        this.setState({ items: items });
      });
    history.listen((newLocation, action) => {
      if (action !== "PUSH") {
        history.push("/");
      }
    });
  }

  // componentDidMount() {
  //   // Initialize Firebase
  //   firebase.initializeApp(firebaseConfig);

  //   firebase.auth().createUserWithEmailAndPassword('test@gmai.com', 'password').catch(function (error) {
  //     // Handle Errors here.
  //     var errorCode = error.code;
  //     var errorMessage = error.message;

  //     console.log(error)
  //     // ...
  //   });

  //   firebase.auth().signInWithEmailAndPassword('test@gmai.com', 'password').then(r => console.log(r))
  // }

  render() {
    const user = firebase.auth().currentUser;
    const { location, history } = this.props;

    return (
      <body>
        <div align={"center"}>
          <Card
            className="useStyles"
            align={"center"}
            style={{
              marginTop: 0,
              width: 400,
            }}
          >
            <CardContent>
              <AppBar position="static">
                <Toolbar>
                  <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" flexGrow="1">
                    ToDo
                  </Typography>
                  <Button
                    edge="end"
                    color="inherit"
                    onClick={() => history.push("/login")}
                  >
                    Logout
                  </Button>
                </Toolbar>
              </AppBar>
              <div display="flex" flexWrap="flex">
                <div>
                  <pre></pre>

                  <FormControl item xs={6} md={12} lg={8}>
                    <InputLabel htmlFor="standard-adornment-password">
                      enter task
                    </InputLabel>
                    <Input
                      value={this.state.task}
                      onChange={(a) => {
                        // console.log(a.target.value)
                        // this._inputElemen = a.target.value
                        this.setState({ task: a.target.value });
                      }}
                      id="standard-adornment-password"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            disabled={false}
                            aria-label="toggle password visibility"
                            onClick={() => {
                              var newItem = {
                                text: this.state.task,
                                // text: this._inputElemen,
                                key: Date.now(),
                                completed: false,
                              };

                              // var items = [...this.state.items, newItem];

                              this.setState({
                                //   items: items,
                                task: "",
                              });
                              firebase
                                .firestore()
                                .collection("users")
                                .doc(user.uid)
                                .collection("todo")
                                .add(newItem);
                            }}
                          >
                            {console.log(this._inputElemen)}
                            <AddIcon />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
              </div>

              {console.log(this.state.items)}

              {this.state.items.length == 0 && <div></div>}
              {this.state.items.length > 0 &&
                this.state.items.map((data, index) => {
                  var item = data.data();
                  return (
                    <div align={"center"}>
                      <Grid item xs={6} md={12} lg={8}>
                        <div className="demo">
                          <List dense={false}>
                            <ListItem>
                              <ListItemAvatar>
                                <Checkbox
                                  checked={this.state.items[index].completed}
                                  name="checkedB"
                                  color="primary"
                                  onClick={() => {
                                    if (item.completed == false) {
                                      //   this.setState((prevState) => ({
                                      //     items: prevState.items.map((obj) =>
                                      //       obj.key === item.key
                                      //         ? Object.assign(obj, {
                                      //             completed: true,
                                      //           })
                                      //         : obj
                                      //     ),
                                      //   }));
                                      firebase
                                        .firestore()
                                        .collection("users")
                                        .doc(user.uid)
                                        .collection("todo")
                                        .doc(data.id)
                                        .update({
                                          completed: true,
                                        });
                                    } else {
                                      // this.setState((prevState) => ({
                                      //   items: prevState.items.map((obj) =>
                                      //     obj.key === item.key
                                      //       ? Object.assign(obj, {
                                      //           completed: false,
                                      //         })
                                      //       : obj
                                      //   ),
                                      // }));
                                      firebase
                                        .firestore()
                                        .collection("users")
                                        .doc(user.uid)
                                        .collection("todo")
                                        .doc(data.id)
                                        .update({
                                          completed: false,
                                        });
                                    }
                                  }}
                                />
                              </ListItemAvatar>
                              <ListItemText
                                style={{
                                  textDecoration: item.completed
                                    ? "line-through"
                                    : "none",
                                }}
                                align="center"
                                primary={item.text}
                                secondary={
                                  this.secondary ? "Secondary text" : null
                                }
                              />
                              <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete">
                                  <DeleteIcon
                                    onClick={() => {
                                      var array = [...this.state.items]; // make a separate copy of the array
                                      console.log("array", array);
                                      console.log("item.index", index);
                                      // var index = item.index
                                      // if (index !== -1) {
                                      //   array.splice(index, 1);
                                      //   this.setState({ items: array });
                                      // }
                                      console.log(data.id);
                                      firebase
                                        .firestore()
                                        .collection("users")
                                        .doc(user.uid)
                                        .collection("todo")
                                        .doc(data.id)
                                        .delete();
                                      //   .then(function () {
                                      //     console.log(
                                      //       "Document successfully deleted!"
                                      //     );
                                      //   })
                                      //   .catch(function (error) {
                                      //     console.error(
                                      //       "Error removing document: ",
                                      //       error
                                      //     );
                                      //   });
                                    }}
                                  />
                                </IconButton>
                              </ListItemSecondaryAction>
                            </ListItem>
                          </List>
                        </div>
                      </Grid>
                    </div>
                  );
                })}
            </CardContent>
          </Card>
        </div>
      </body>
    );
  }
}
export default withRouter(App);

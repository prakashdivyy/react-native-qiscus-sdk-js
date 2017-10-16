import React, { Component } from "react";
import { StyleSheet } from "react-native";
import MainStackRouter from "./Routers/MainStackRouter";
import { setUser } from "./actions/user";
import { connect } from "react-redux";

import theme from "./themes/base-theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
  },
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    this.props.setUser(this.props.userAuth);
    return <MainStackRouter />;
  }
}

function bindAction(dispatch) {
  return {
    setUser: user => dispatch(setUser(user)),
  };
}

const AppSwagger = connect(null, bindAction)(App);

export default AppSwagger;

//This is used for network debugging
// To see all the requests in the chrome Dev tools in the network tab.
XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
    GLOBAL.originalXMLHttpRequest :
    GLOBAL.XMLHttpRequest;

  // fetch logger
global._fetch = fetch;
global.fetch = function (uri, options, ...args) {
  return global._fetch(uri, options, ...args).then((response) => {
    console.log('Fetch', { request: { uri, options, ...args }, response });
    return response;
  });
};

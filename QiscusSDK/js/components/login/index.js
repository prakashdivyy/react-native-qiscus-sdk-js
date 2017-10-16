import React, { Component } from "react";
import { Image } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Content,
  Item,
  Input,
  Button,
  Icon,
  View,
  Text,
  H2,
} from "native-base";
import { Field, reduxForm } from "redux-form";
import { setUser, initApp } from "../../actions/user";
import styles from "./styles";

const background = require("../../../images/qlogo.jpg");

const validate = values => {
  const error = {};
  error.email = "";
  error.password = "";
  var ema = values.email;
  var pw = values.password;
  if (values.email === undefined) {
    ema = "";
  }
  if (values.password === undefined) {
    pw = "";
  }
  if (ema.length < 8 && ema !== "") {
    error.email = "too short";
  }
  if (!ema.includes("@") && ema !== "") {
    error.email = "@ not included";
  }
  if (pw.length > 12) {
    error.password = "max 11 characters";
  }
  if (pw.length < 5 && pw.length > 0) {
    error.password = "Weak";
  }
  return error;
};

class Login extends Component {
  static propTypes = {
    setUser: React.PropTypes.func,
    initApp: React.PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
    this.renderInput = this.renderInput.bind(this);
  }

  setUser(name) {
    this.props.setUser(name);
  }
  initApp() {
    this.props.initApp();
  }
  renderInput({
    input,
    label,
    type,
    meta: { touched, error, warning },
    inputProps
  }) {
    var hasError = false;
    if (error !== undefined) {
      hasError = true;
    }
    return (
      <Item error={hasError}>
        <Icon active name={input.name === "email" ? "person" : "unlock"} />
        <Input
          placeholder={input.name === "email" ? "EMAIL" : "PASSWORD"}
          {...input}
        />
        {hasError
          ? <Item style={{ borderColor: "transparent" }}>
              <Icon active style={{ color: "red", marginTop: 5 }} name="bug" />
              <Text style={{ fontSize: 15, color: "red" }}>{error}</Text>
            </Item>
          : <Text />}
      </Item>
    );
  }
  render() {
    console.log(this.props.setUser);
    return (
      <Container>
        <View style={styles.container}>
          <Content>
            <View style={styles.logoWrapper}>
              <Image source={background} style={styles.shadow} />
              <H2>Qiscus React Native SDK</H2>
            </View>
            <View style={styles.bg}>
              <Field name="email" component={this.renderInput} />
              <Field name="password" component={this.renderInput} />
              <Button
                style={styles.btn}
                onPress={() => this.props.navigation.navigate("Home")}
              >
                <Text>Login</Text>
              </Button>
            </View>
          </Content>
        </View>
      </Container>
    );
  }
}
function bindAction(dispatch) {
  return {
    setUser: name => dispatch(setUser(name)),
    initApp: () => dispatch(initApp())
  };
}
const LoginSwag = connect(null, bindAction)(Login);
LoginSwag.navigationOptions = {
  header: null
};
export default LoginSwag;

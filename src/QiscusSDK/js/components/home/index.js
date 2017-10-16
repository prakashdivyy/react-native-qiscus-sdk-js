import React, { Component } from "react";
import { TouchableOpacity, View,
Image } from "react-native";
import { connect } from "react-redux";
import BlankPage2 from "../blankPage2";
import DrawBar from "../DrawBar";
import { DrawerNavigator, NavigationActions } from "react-navigation";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right
} from "native-base";

import { setIndex } from "../../actions/list";
import { initApp, chatTarget, receiveNewMessage } from "../../actions/user";
import { openDrawer } from "../../actions/drawer";
import styles from "./styles";

import QiscusSDK from "../../../lib/qiscusSdk";

const qiscus = new QiscusSDK();

type Props = {
  name: string;
  setIndex: () => void;
  initApp: () => void;
  list: Array<any>,
  openDrawer: () => void;
  qiscus: Object;
  chatTarget: () => void;
  receiveNewMessage: () => void;
};

class Home extends Component {
  props: Props;
  static navigationOptions = {
    header: null
  };

  componentWillMount() {
    let {props: {userAuth, initApp, receiveNewMessage}} = this;
    qiscus.init({
      AppId: 'sdksample',
      options: {
        loginSuccessCallback: function(data) {
          qiscus.chatTarget('guest@qiscus.com').then((res) => {
            initApp(qiscus);
          }).catch(err => console.log(err));
        },
        newMessagesCallback: (data) => {
          receiveNewMessage(data);
        },
      }
    });
    qiscus.setUser(userAuth.email, userAuth.password, userAuth.displayName);
  }

  newPage(index) {
    this.props.setIndex(index);
    Actions.blankPage();
  }

  _openChat(name: string) {
    this.props.navigation.navigate('BlankPage')
    this.props.chatTarget(name);
  }

  render() {
    if (!this.props.qiscus) {
      return (<View style={{alignItems: 'center', justifyContent: 'center', marginTop: 30}}><Text>Initialize App... please wait</Text></View>);
    }

    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                DrawerNav.dispatch(
                  NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: "Home" })]
                  })
                );
                DrawerNav.goBack();
              }}
            >
              <Icon active name="power" />
            </Button>
          </Left>

          <Body>
            <Title>Home</Title>
          </Body>

          <Right>
            <Button
              transparent
              onPress={() => DrawerNav.navigate("DrawerOpen")}
            >
              <Icon active name="menu" />
            </Button>
          </Right>
        </Header>
        <Content>
          {this.props.list.map((item, i) => {
            const name = item.name.first;
            return (
                <TouchableOpacity
                  key={i}
                  style={styles.row}
                  onPress={() =>
                    this._openChat(name)
                  }
                >
                  <View style={styles.containerRow}>
                    <Image source={{ uri: item.picture.large }} style={styles.photo} />
                    <Text style={styles.text}>
                      {item.name.first}
                    </Text>
                    <Icon name="ios-arrow-forward-outline" style={styles.icon} />
                  </View>
                </TouchableOpacity>
            );
          })}
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer()),
    initApp: qiscus => dispatch(initApp(qiscus)),
    chatTarget: name => dispatch(chatTarget(name)),
    receiveNewMessage: comments => dispatch(receiveNewMessage(comments)),
  };
}
const mapStateToProps = state => ({
  qiscus: state.initApp.qiscus,
  list: state.list.list,
  userAuth: state.user.user,
});

const HomeSwagger = connect(mapStateToProps, bindAction)(Home);
const DrawNav = DrawerNavigator(
  {
    Home: { screen: HomeSwagger },
    BlankPage2: { screen: BlankPage2 }
  },
  {
    contentComponent: props => <DrawBar {...props} />
  }
);
const DrawerNav = null;
DrawNav.navigationOptions = ({ navigation }) => {
  DrawerNav = navigation;
  return {
    header: null
  };
};
export default DrawNav;

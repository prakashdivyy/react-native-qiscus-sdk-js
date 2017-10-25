//@flow
import React, { Component } from 'react';
import { ScrollView, View, Keyboard, NativeModules, Image, Platform, Dimensions } from 'react-native';
import autobind from 'class-autobind';
import styles from "./styles";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Input,
  Body,
  Item,
  Card,
  CardItem,
  ActionSheet,
} from "native-base";
import {ChatComponent} from './ChatComponent';

export class ChatRenderer extends Component {
  constructor() {
    super();
    autobind(this);
    this.state = {
      comments: null,
      newMessage: null,
      clicked: null,
    }
  }
  componentWillMount() {
    const {props: {room, initApp, qiscus}, state: {comments}} = this;
    qiscus.chatGroup(room.id)
    .then((data) => {
      initApp(qiscus);
      this._setComments(data.comments);
    }).catch(err => console.log(err));
  }
  componentWillReceiveProps(nextProps) {
    this._setCommentsScroll(nextProps.message);
  }
  _measureChatContainer() {
    this.refs.chatContainer.measure((a, b, width, height, px, py) => {
        this._scrollAction(height);
      }
    );
  }
  _setComments(comments: Array<Object>) {
    this.setState({
      comments: comments,
    });
  }
  _setCommentsScroll(comments: Array<Object>) {
    this.setState({
      comments: comments,
    });
    this._measureChatContainer();
  }
  _setToken(token: string) {
    this.setState({
      token: token,
    });
  }
  _scrollAction(height: number) {
    _scrollView.scrollTo({x: 0, y: height, animated: true});
    _scrollView.scrollToEnd({animated: true});
  }
  _setNewMessage(text: string) {
    this.setState({
      newMessage: text,
    });
  }
  _sendMessage(message: string) {
    let {props: {room, qiscus}} = this;
    Keyboard.dismiss();
    this.setState({
      newMessage: null,
    });
    if (message) {
      qiscus.submitComment(room.id, message, null, null, null);
    }
  }

  render() {
    let {props: {message, room, qiscus}, state: {comments}} = this;
    if (!comments) {
      return <View style={{marginTop: 30, alignItems: 'center', justifyContent: 'center'}}><Text>Loading chats...</Text></View>
    }
    return (
      <View style={styles.chatContainer}>
        <View style={styles.commentList} ref="chatContainer">
          <ScrollView
            ref={(scrollView) => { _scrollView = scrollView; }}
            onLayout={(event) => {
              this._measureChatContainer();
            }}
            >
            {ChatComponent(qiscus)}
          </ScrollView>
        </View>
        <View style={styles.inputContainer}>
          <Item rounded style={styles.textInput}>
            <Input value={this.state.newMessage} placeholder="Say something" multiline={true} onChangeText={(text) => this._setNewMessage(text)} />
          </Item>
          {/* <Button
            onPress={() =>
            ActionSheet.show(
              {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                title: "File"
              },
              buttonIndex => {
                this.setState({ clicked: BUTTONS[buttonIndex] });
              }
            )}
            style={styles.button}
            transparent
          >
            <Icon name='md-attach' style={styles.sendIcon} />
          </Button> */}
          <Button transparent style={styles.btnSend} onPress={() => this._sendMessage(this.state.newMessage)}>
            <Icon name='md-send' style={styles.sendIcon} />
          </Button>
        </View>
      </View>
    );
  }
}

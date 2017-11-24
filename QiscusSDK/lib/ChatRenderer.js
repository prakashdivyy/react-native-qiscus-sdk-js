//@flow
import React, { Component } from 'react';
import { ScrollView, View, Text, ActivityIndicator, TextInput, TouchableOpacity, Keyboard, Dimensions } from 'react-native';
import autobind from 'class-autobind';
import styles from './styles';
import {ChatComponent} from './ChatComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import FilePicker from './FileUploader';
const {height, width} = Dimensions.get('window');

export class ChatRenderer extends Component {
  constructor() {
    super();
    autobind(this);
    this.state = {
      comments: null,
      newMessage: null,
      clicked: null,
      formStyle: {},
      containerHeight: 0,
      chatHeight: 0,
      isSending: false,
    };
  }
  componentWillMount() {
    const {props: {room, initApp, qiscus}} = this;
    qiscus.chatGroup(room.id)
    .then((data) => {
      initApp(qiscus);
      this._updateComments(data.comments);
    }).catch(err => console.log(err));
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow);
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardDidHide);
  }
  componentWillUnmount () {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
    this.keyboardDidHideListener.remove();
  }
  _keyboardWillShow(e) {
    let {state: {chatHeight, containerHeight}} = this;
    if (containerHeight > chatHeight) {
      // _scrollView.scrollTo({x: 0, y: this.state.containerHeight - (Math.round(containerHeight/chatHeight) * e.endCoordinates.height), animated: true});
    }
    this.setState({
      formStyle: {
        flex: 1,
    }});
  }
  _keyboardWillHide(e) {
    let {state: {chatHeight, containerHeight}} = this;
    if (containerHeight > chatHeight) {
      // _scrollView.scrollTo({x: 0, y: this.state.containerHeight - ((Math.round(containerHeight/chatHeight) + 2)*e.endCoordinates.height), animated: true});
    }
    this.setState({
      formStyle: {}});
  }
  _keyboardDidHide(e) {
    this._sendMessage(this.state.newMessage);
  }
  componentWillReceiveProps(nextProps) {
    let {message, qiscus: {userData}} = nextProps;
    if (message && this.state.comments) {
      if (this.state.comments[0].comment_before_id !== message[0].comment_before_id) {
        if (message[0].user_id !== userData.id) {
          this._updateComments(nextProps.message);
          this._measureChatContainer(this.state.containerHeight, 'new props');
        }
      }
    }
  }
  _updateComments(comments: Array<{}>) {
    this.setState({
      comments: comments,
    });
  }
  _measureChatContainer(containerHeight, caller) {
    if (this.refs.chatContainer) {
      this.refs.chatContainer.measure((a, b, width, height, px, py) => {
        this.setState({chatHeight: height});
          if (containerHeight > height) {
            this._scrollAction(containerHeight - height);
          }
        }
      );
    }
  }
  _setToken(token: string) {
    this.setState({
      token: token,
    });
  }
  _scrollAction(height: number) {
    _scrollView.scrollToEnd({animated: true});
  }
  _setNewMessage(text: string) {
    this.setState({
      newMessage: text,
    });
  }
  _sendMessage(message: string) {
    let {props: {room, qiscus}} = this;
    this.setState({
      newMessage: null,
    });
    if (message) {
      qiscus.submitComment(room.id, message, null, null, null)
      .then(this.setState({isSending: false}));
    }
  }

  render() {
    let activityIndicatorColor = '#6fbf15';
    let chatListBackground = {};
    let {
      props: {
        message, room, qiscus, attachIconStyle,
        chatListStyle, textInputStyle, sendIconStyle,
        messageItemRightStyle, messageItemLeftStyle,
        senderTextStyle, messageTextStyle, loadingIndicatorColor,
      },
      state: {
        comments, newMessage, isSending,
      }} = this;
      if (loadingIndicatorColor) {
        activityIndicatorColor = loadingIndicatorColor;
      }
      if (chatListStyle) {
        chatListBackground = {backgroundColor: chatListStyle.backgroundColor};
      }
    if (!comments) {
      return (
        <View style={[{flex: 1, alignItems: 'center', justifyContent: 'center'}, {...chatListBackground}]}>
          <ActivityIndicator style={[{alignItems: 'center', justifyContent: 'center'}]} size="large" color={activityIndicatorColor} />
        </View>
      );
    }
    return (
      <View style={styles.chatContainer}>
        <View style={[styles.commentList, {...chatListStyle}]} ref="chatContainer">
          <ScrollView
            ref={(scrollView) => { _scrollView = scrollView; }}
          >
            <ChatComponent
              qiscus={qiscus}
              isSending={isSending}
              updateHeight={(height) => {this._measureChatContainer(height,'scrollView');this.setState({containerHeight: height});}}
              messageItemRightStyle={messageItemRightStyle}
              messageItemLeftStyle={messageItemLeftStyle}
              senderTextStyle={senderTextStyle}
              messageTextStyle={messageTextStyle}
              loadingIndicatorColor={loadingIndicatorColor}
            />
            <View style={[styles.breaker, {...chatListBackground}]} />
          </ScrollView>
        </View>
        <View style={[styles.formStyle, this.state.formStyle]}>
          {isSending ?
            <View style={{width: 0.80 * width, justifyContent: 'center', flexDirection: 'row'}}>
              <ActivityIndicator style={[{alignItems: 'center', justifyContent: 'center'}]} size="large" color={activityIndicatorColor} />
            </View> :
            <TextInput style={[styles.textInput, {...textInputStyle}]} underlineColorAndroid='transparent'
              value={newMessage} placeholder="Say something" multiline={true}
              onChangeText={(text) => this._setNewMessage(text)}
            />
          }
          <FilePicker attachIconStyle={attachIconStyle} sendMessage={this._sendMessage} setSending={(value) => this.setState({isSending: value})} />
          {isSending ? null :<TouchableOpacity style={{padding: 2}} onPress={() => {Keyboard.dismiss();}}>
              <Icon name="send" size={30} style={[{marginRight: 5, color: '#444'}, {...sendIconStyle}]}/>
            </TouchableOpacity>
          }
        </View>
      </View>
    );
  }
}

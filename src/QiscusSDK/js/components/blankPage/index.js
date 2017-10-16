import React, { Component } from "react";
import { connect } from "react-redux";
import { ScrollView, View, Keyboard, NativeModules, Image, Platform, Dimensions } from 'react-native';
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
import autobind from 'class-autobind';
import styles from "./styles";
import ImagePicker from 'react-native-image-picker';
import FileUploader from 'react-native-file-uploader';
const options = {
  title: 'Select Image',
  customButtons: [
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

const {width, height} = Dimensions.get('window');
const BUTTONS = [
  { text: "Image", icon: "ios-image", iconColor: "#2c8ef4", file: true },
  { text: "Cancel", icon: "close", iconColor: "#25de5b", file: false }
];
const DESTRUCTIVE_INDEX = 4;
const CANCEL_INDEX = 2;
class BlankPage extends Component {
  constructor() {
    super(...arguments);
    autobind(this);
    this.state = {
      comments: this.props.qiscus.selected.comments,
      newMessage: null,
      clicked: null,
    }
  }
  componentWillReceiveProps(nextProps) {
     this._setComments(nextProps.message);
     this.measureChatContainer();
  }
  static navigationOptions = {
    header: null
  };
  _setComments(comments: Array<Object>) {
    console.log('set comments called', comments);
    this.setState({
      comments: comments,
    });
  }
  _setToken(token: string) {
    this.setState({
      token: token,
    });

  }
  scrollAction(height: number) {
    _scrollView.scrollTo({x: 0, y: height, animated: true});
    _scrollView.scrollToEnd({animated: true});
  }
  pickFile() {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let file = {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
        };
        let source = Platform.OS === 'ios' ? response.uri : response.path;
        const settings = {
          uri: source,
          uploadUrl: `https://sdksample.qiscus.com/api/v2/sdk/upload`,
          method: 'POST', // default to 'POST'
          fileName: response.fileName,
          contentType: `multipart/form-data`, // default to 'application/octet-stream'
          data: {
            token: this.state.token,
          }
        };

        FileUploader.upload(settings, (err, res) => {
          const data = JSON.parse(res.data);
          this._sendMessage(`[file] ${data.results.file.url} [/file]`);
        }, (sent, expectedToSend) => {
            // do something when upload
        });

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          imageSource: source,
          clicked: null,
        });
      }
    });
  }
  measureChatContainer() {
    this.refs.chatContainer.measure((a, b, width, height, px, py) => {
        this.scrollAction(height);
      }
    );
  }
  render() {
    const { props: { name, index, list, qiscus, message }, state: {comments, clicked} } = this;
    if (clicked) {
      if (clicked.file) {
        this.pickFile();
      }
    }
    if (!comments) {
      return <View style={{marginTop: 30}}><Text>Loading chats...</Text></View>
    }
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>

          <Body>
            <Title>{this.props.name}</Title>
          </Body>

          <Right />
        </Header>

        <Content padder>
          <View style={styles.chatContainer}>
            <View style={styles.commentList} ref="chatContainer">
              <ScrollView
                ref={(scrollView) => { _scrollView = scrollView; }}
                onLayout={(event) => {
                  this.measureChatContainer();
                }}
                >
                {
                  this.renderComments(this.props.qiscus.selected.comments)
                }
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
        </Content>
      </Container>
    );
  }
  renderComments(comments: Array<Object>) {
    const user = this.props.qiscus.userData;
    return (
      comments.map((data) => {
        let isFile = data.message.substring(0, 6) === '[file]' ? true : false;
        if (user.username === data.username_as) {
          return (
            <View style={styles.cardContainerRight} key={data.id}>
              <Card style={styles.cardRight}>
                <CardItem style={styles.cardRightContent}>
                  <Body>
                    {this._renderMessage(isFile, data.message)}
                  </Body>
                </CardItem>
              </Card>
              <View style={styles.arrowRight}></View>
            </View>
          );
        } else {
          return (
            <View style={styles.cardContainerLeft} key={data.id}>
              <View style={styles.arrowLeft}></View>
              <View style={styles.arrowLeftTop}></View>
              <Card style={styles.cardLeft}>
                <CardItem style={styles.cardLeftContent}>
                  <Body>
                    {this._renderMessage(isFile, data.message)}
                  </Body>
                </CardItem>
              </Card>
            </View>
          );
        }
      })
    );
  }
  _renderMessage(isFile: boolean, message: string) {
    if (isFile) {
      let uri = message.split("[file] ")[1].split(" [/file]")[0];
      return (
        <Image
          style={{width: 200, height: 120}}
          source={{uri: uri}}
        />
      );
    } else {
      return (
        <Text>
          {message}
        </Text>
      );
    }
  }
  _setNewMessage(text: string) {
    this.setState({
      newMessage: text,
    });
  }
  _sendMessage(message: string) {
    Keyboard.dismiss();
    this.setState({
      newMessage: null,
    });
    if (message) {
      this.props.qiscus.submitComment('41275', message, null, null, null);
    }
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer())
  };
}

const mapStateToProps = state => ({
  name: state.chatTarget.name,
  index: state.list.selectedIndex,
  list: state.list.list,
  qiscus: state.initApp.qiscus,
  message: state.receiveNewMessage.message,
});

export default connect(mapStateToProps, bindAction)(BlankPage);

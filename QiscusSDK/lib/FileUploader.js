import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import {View, Platform, TouchableOpacity} from 'react-native';
import FileUploader from 'react-native-files-uploaders';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'native-base';
import ActionSheet from 'react-native-actionsheet';
import autobind from 'class-autobind';
import styles from './styles';

const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 3;
const options = { title: "Upload Image"};
const optionsArray = [ 'Cancel', 'Choose from Library', "Take a Photo" ];
const title = 'File type?';
var alreadyCalled = false;

export default class FilePicker extends Component {
  constructor() {
    super();
    this.state = {
      selected: null,
      imageSource: null,
    };
    this.actionSheet = null;
    autobind(this);
  }
  _unSelect() {
    alreadyCalled = false;
    this.setState({
      selected: null,
    });
  }
  _pickImage() {

    let {props: {sendMessage, setSending}} = this;
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        this._unSelect();
        setSending(false);
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        this._unSelect();
        setSending(false);
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        this._unSelect();
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        this._unSelect();
        setSending(true);
        let source = Platform.OS === 'ios' ? response.uri : response.path;
        const settings = {
          uri: source,
          uploadUrl: `https://sdksample.qiscus.com/api/v2/sdk/upload`,
          method: 'POST', // default to 'POST'
          fileName: response.fileName,
          fieldName: 'file',
          contentType: `multipart/form-data`, // default to 'application/octet-stream'
          data: {
            token: this.state.token,
          }
        };
        FileUploader.upload(settings, (err, res) => {
          const data = JSON.parse(res.data);
          sendMessage(`[file] ${data.results.file.url} [/file]`);
        }, (sent, expectedToSend) => {
            // do something when uploading
        });
      }
    });
  }
  _pickImageCamera() {

    let {props: {sendMessage, setSending}} = this;
    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        this._unSelect();
        setSending(false);
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        this._unSelect();
        setSending(false);
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        this._unSelect();
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        this._unSelect();
        setSending(true);
        let source = Platform.OS === 'ios' ? response.uri : response.path;
        console.log("SOURCE", source);
        console.log("response", response);
        const settings = {
          uri: source,
          uploadUrl: `https://sdksample.qiscus.com/api/v2/sdk/upload`,
          method: 'POST', // default to 'POST'
          fileName: "image-"+ Date.now().toString() + ".jpg",
          fieldName: 'file',
          contentType: `multipart/form-data`, // default to 'application/octet-stream'
          data: {
            token: this.state.token,
          }
        };
        FileUploader.upload(settings, (err, res) => {
          const data = JSON.parse(res.data);
          console.log("data", data)
          sendMessage(`[file] ${data.results.file.url} [/file]`);
        }, (sent, expectedToSend) => {
            // do something when uploading
        });
      }
    });
  }  
  _handlePress(i) {
    this.setState({
      selected: i
    });
  }
  _showActionSheet() {
    this.ActionSheet.show();
  }
  render() {
    let {
      props: {
        attachIconStyle
      },
      state: {selected}} = this;
    if (selected === 1 && alreadyCalled == false) {
      this._pickImage();
      alreadyCalled = true;
    }
    if (selected === 2 && alreadyCalled == false) {
      this._pickImageCamera();
      alreadyCalled = true;
    }
    return (
      <View>
        <TouchableOpacity style={{padding: 2}} onPress={() => this._showActionSheet()}>
          <Icon name="paperclip" size={30} style={[{marginRight: 5, color: '#444'}, {...attachIconStyle}]} />
        </TouchableOpacity>
        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={title}
          options={optionsArray}
          cancelButtonIndex={CANCEL_INDEX}
          destructiveButtonIndex={DESTRUCTIVE_INDEX}
          onPress={this._handlePress}
        />
      </View>
    );
  }
}

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
const BUTTONS = [
  { text: "Image", icon: "ios-image", iconColor: "#2c8ef4", file: true },
  { text: "Cancel", icon: "close", iconColor: "#25de5b", file: false }
];
const DESTRUCTIVE_INDEX = 4;
const CANCEL_INDEX = 2;

function pickFile() {
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

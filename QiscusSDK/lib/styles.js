
const React = require('react-native');

const { StyleSheet, Dimensions } = React;
const {width, height} = Dimensions.get('window');

export default{
  container: {
    backgroundColor: '#FBFAFA',
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  picture: {
    height: 0.20 * height,
    width: 0.45 * width,
  },
  pictureLoad: {
    height: 0.80 * height,
  },
  files: {
    flexDirection: 'row',
    backgroundColor: '#f4f4f4',
    width: 0.45 * width,
    justifyContent: 'flex-start',
  },
  label: {
    width: 80,
    marginTop: 10,
    fontSize: 9,
  },
  breaker: {
    height: 95,
    backgroundColor: '#e0f2f1',
  },
  commentList: {
    flex: 1,
    backgroundColor: '#e0f2f1',
    // height: height * 0.80,
  },
  textInput: {
    width: 0.80 * width,
    paddingHorizontal: 5,
    flex: 1,
    height: 42,
    fontSize: 16,
  },
  button: {
    width: 30,
  },
  btnSend: {
    width: 40 * width,
  },
  sendIcon: {
    fontSize: 30,
  },
  cardRight: {
    marginRight: -5,
    marginTop: -1,
  },
  cardLeftContent: {
    backgroundColor: '#fff',
    minHeight: 30,
    borderRadius: 5,
    justifyContent: 'center',
    padding: 10,
  },
  cardRightContent: {
    backgroundColor: '#fffdd8',
    minHeight: 30,
    borderRadius: 5,
    justifyContent: 'center',
    padding: 10,
  },
  arrowLeftTop: {
    zIndex: 2,
    width: 0,
    height: 0,
    marginRight: -5,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 14,
    borderLeftWidth: 12,
    borderBottomWidth: 5,
    borderTopColor: '#fff',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  arrowRight: {
    marginLeft: -5,
    zIndex: 1,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 14,
    borderRightWidth: 12,
    borderBottomWidth: 5,
    borderTopColor: '#fffdd8',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  messageContainerRight: {
    marginLeft: width * 0.25,
    flexDirection: 'row', justifyContent: 'flex-end',
  },
  messageContainerLeft: {
    marginRight: width * 0.25,
    flexDirection: 'row',
  },
  cardContainerLeft: {
    flexDirection: 'row',
    paddingTop: 3,
    justifyContent: 'flex-start',
  },
  formStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 5,
  },
  cardContainerRight: {
    flexDirection: 'row',
    paddingTop: 3,
  },
};

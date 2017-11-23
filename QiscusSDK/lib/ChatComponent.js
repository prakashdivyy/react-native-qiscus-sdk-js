import React, { Component } from 'react';
import {View, Image, Text, ActivityIndicator, Linking, TouchableOpacity} from 'react-native';
import autobind from 'class-autobind';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Lightbox from 'react-native-lightbox';
import styles from "./styles";

function renderMessage(isFile: boolean, message: string, messageTextStyle: {}) {
  if (isFile) {
    let uri = message.split("[file] ")[1].split(" [/file]")[0];
    let tempArrayUri = uri.split('/');
    let file = tempArrayUri[tempArrayUri.length - 1].split('.');
    let ext = file[file.length - 1].toLowerCase()
    if ( ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'gif' || ext === 'svg') {
      return (
        <View style={styles.picture}>
          <Lightbox underlayColor="white" activeProps={{style: styles.pictureLoad}}>
            <Image
              style={styles.picture}
              source={{uri: uri}}
            />
          </Lightbox>
        </View>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => {
            Linking.openURL(`${uri}`);
          }}
          style={styles.files}
        >
          <Icon name="description" size={80} /><Text style={styles.label}>{file}</Text>
        </TouchableOpacity>
      );
    }

  } else {
    return (
      <Text style={{...messageTextStyle}}>
        {message}
      </Text>
    );
  }
}

export function ChatComponent(props: Object) {
  const {
    qiscus, updateHeight, isSending,
    messageItemLeftStyle, messageItemRightStyle,
    senderTextStyle, messageTextStyle, loadingIndicatorColor,
  } = props;
  let activityIndicatorColor = '#6fbf15';
  let backgroundRightTopColor = {};
  let backgroundLeftTopColor = {};
  if (loadingIndicatorColor) {
    activityIndicatorColor = loadingIndicatorColor;
  }
  if (messageItemRightStyle) {
    backgroundRightTopColor = {borderTopColor: messageItemRightStyle.backgroundColor};
  }
  if (messageItemLeftStyle) {
    backgroundLeftTopColor = {borderTopColor: messageItemLeftStyle.backgroundColor};
  }
  const comments = qiscus.selected.comments;
  const user = qiscus.userData;
  let currentUserName = '';
  let isSamePerson = true;
  let marginChat = 10;
  let marginMessage = 0;
  let heighChat = 0;
  return (
    <View onLayout={(event) => {
      updateHeight(event.nativeEvent.layout.height);
    }}
    >
      {comments.map((data, index) => {
        let isFile = data.message.substring(0, 6) === '[file]' ? true : false;
        if (currentUserName !== data.username_as) {
          currentUserName = data.username_as;
          isSamePerson = false;
          marginChat = 10;
          marginMessage = 0;
        } else {
          marginChat = 0;
          marginMessage = 6;
          isSamePerson = true;
        }
        heighChat = comments.length - 1 == index ? 50 : 0;
        if (user.username === data.username_as) {
          if (data.username_real) {
            return (
              <View
                key={data.id}
                style={[
                  styles.messageContainerRight,
                  {paddingTop: marginChat, marginBottom: heighChat},
                ]}>
              <View style={styles.cardContainerRight}>
                {data.isDelivered && !data.isRead ?
                <View style={{height: 25, padding: 3, alignItems: 'center', justifyContent: 'center'}}>
                  <Icon name="done" size={12} color="#4add17" style={{}}/>
                </View> : null}
                {
                  data.isRead ?
                  <View style={{height: 25, padding: 3, alignItems: 'center', justifyContent: 'center'}}>
                    <Icon name="done-all" size={12} color="#4add17" style={{}}/>
                  </View> : null
                }
                <View style={[
                  styles.cardRightContent,
                  {marginRight: marginMessage},
                  {...messageItemRightStyle}
                ]}>
                  {isSamePerson ? null : <View style={{paddingBottom: 5, borderBottomColor: '#b3bab5', borderBottomWidth: 1, marginBottom: 5}}>
                    <Text style={[{fontWeight: 'bold'}, {...senderTextStyle}]}>{data.username_as}</Text>
                  </View>}
                  <View>
                    {renderMessage(isFile, data.message, messageTextStyle)}
                  </View>
                </View>
                {
                  isSamePerson ? null : <View style={[styles.arrowRight, {...backgroundRightTopColor}]} />
                }
              </View>
              {!isSamePerson ?
                <Image
                  style={{height: 40, width: 40, borderRadius: 20, marginRight: 5}}
                  source={{uri: data.avatar}}
                /> : <View style={{height: 40, width: 40, borderRadius: 20, marginRight: 5}} />
              }
              </View>
            );
          } else {
            return <View key={data.id}><ActivityIndicator key={data.id} style={[{marginBottom: heighChat, alignItems: 'center', justifyContent: 'center'}]} size="large" color={activityIndicatorColor} /></View>;
          }
        } else {
          return (
            <View
              style={[
                styles.messageContainerLeft,
                {paddingTop: marginChat, marginBottom: heighChat},
              ]} key={data.id}>
              {!isSamePerson ?
                <Image
                  style={{height: 40, width: 40, borderRadius: 20, marginLeft: 5}}
                  source={{uri: data.avatar}}
                /> : <View style={{height: 40, width: 40, borderRadius: 20, marginLeft: 5}} />
              }
              <View style={styles.cardContainerLeft}>
                {
                  isSamePerson ? null : <View style={[styles.arrowLeftTop, {...backgroundLeftTopColor}]} />
                }
                <View style={[
                  styles.cardLeftContent,
                  {marginLeft: marginMessage},
                  {...messageItemLeftStyle},
                ]}>
                  {isSamePerson ? null : <View style={{paddingBottom: 5, borderBottomColor: '#b3bab5', borderBottomWidth: 1, marginBottom: 5}}>
                    <Text style={{fontWeight: 'bold'}, {...senderTextStyle}}>{data.username_as}</Text>
                  </View>}
                  <View>
                    {renderMessage(isFile, data.message, messageTextStyle)}
                  </View>
                </View>
              </View>
            </View>
          );
        }
      })}
    </View>
  );
}

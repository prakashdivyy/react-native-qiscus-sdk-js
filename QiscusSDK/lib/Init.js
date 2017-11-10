import QiscusSDK from './qiscusSdk';

export function InitApp(config) {
  let qiscus = new QiscusSDK();
  let {
    initApp,
    receiveNewMessage,
    setRooms,
    userAuth,
    callbackOptions: {
      commentDeliveredCallback,
      chatRoomCreatedCallback,
      groupRoomCreatedCallback,
      commentReadCallback,
      loginErrorCallback,
      presenceCallback,
      typingCallback,
    },
  } = config;
  qiscus.init({
    AppId: userAuth.appID,
    options: {
      loginSuccessCallback: function(data: Object) {
        initApp(qiscus);
        qiscus.userAdapter.loadRoomList()
        .then((data) => {
          setRooms(data);
        });
      },
      newMessagesCallback: (data) => {
        receiveNewMessage(data);
      },
      commentDeliveredCallback: (data) => {
        commentDeliveredCallback(data);
      },
      chatRoomCreatedCallback: (data) => {
        initApp(qiscus);
        qiscus.userAdapter.loadRoomList()
        .then((data) => {
          setRooms(data);
        });
        chatRoomCreatedCallback(data);
      },
      groupRoomCreatedCallback: (data) => {
        initApp(qiscus);
        qiscus.userAdapter.loadRoomList()
        .then((data) => {
          setRooms(data);
        });
        groupRoomCreatedCallback(data);
      },
      commentReadCallback: (data) => {
        commentReadCallback(data);
      },
      loginErrorCallback: (data) => {
        loginErrorCallback(data);
      },
      presenceCallback: (data) => {
        presenceCallback(data);
      },
      typingCallback: (data) => {
        typingCallback(data);
      },
    },
  });
  qiscus.setUser(userAuth.email, userAuth.password, userAuth.displayName, userAuth.avatar);
  return qiscus;
}

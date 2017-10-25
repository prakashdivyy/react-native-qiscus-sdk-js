import QiscusSDK from './qiscusSdk';
import {userAuth} from '../../../../configQiscusSDK';

export function InitApp(config) {
  let qiscus = new QiscusSDK();
  let {initApp, receiveNewMessage, setRooms} = config;
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
    },
  });
  qiscus.setUser(userAuth.email, userAuth.password, userAuth.displayName, userAuth.avatar);
  return qiscus;
}

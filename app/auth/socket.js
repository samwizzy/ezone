import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';

export default StompConnect = () => {
  console.log('request come here');
  const socket = new SockJS(
    'https://dev.ezoneapps.com/gateway/utilityserv/messages',
  );
  const stompClient = Stomp.over(socket);
  stompClient.connect(
    {
      'X-Authorization': 'Bearer ' + `${this.props.accessToken}`,
      login: 'admin',
      passcode: 'admin',
    },
    frame => {
      const connected = true;
      console.log(frame, 'frame');
      stompClient.subscribe(`/queue/${this.props.currentUser.uuId}`, tick => {
        console.log(tick, 'tick');
        console.log(JSON.parse(tick.body), 'tick');
      });
    },
    error => {
      console.log(error);
      const connected = false;
    },
  );
};

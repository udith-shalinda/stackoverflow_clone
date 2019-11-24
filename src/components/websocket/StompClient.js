import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export const getStompClient=()=>{
    var sock = new SockJS('http://localhost:8102/api/ws');
    var stompClient = Stomp.over(sock);
    sock.onopen = function() {
        console.log('open');
    }
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
    });
    return stompClient;
}

export const subscribeProfile=(stompClient,updateProfle)=>{
    stompClient.subscribe('/topic/user/home', function (res) {
        console.log(res.body);
        updateProfle();
    });
}

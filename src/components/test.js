import React,{useEffect} from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let stompClient = null;

function Test() {

    const componentWillMount=() =>{
      var sock = new SockJS('http://localhost:8102/api/ws');
      stompClient = Stomp.over(sock);
      sock.onopen = function() {
          console.log('open');
          // sock.send('addUser');
      }
      stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/public', function (greeting) {
           
            console.log(greeting);
        });
      });
      // sock.onmessage = function(e) {
      //     console.log('message', e.data);
      //     sock.close();
      // };
     
      // sock.onclose = function() {
      //     console.log('close');
      // };
      // sock.send("test");
      
    }
    const send = ()=>{
      stompClient.send("/app/addUser", {},"fusdfsd");
    }
    
      useEffect(()=>{
        componentWillMount();
      })

  return (
    <div >
      <h1>hello there</h1>
      <button onClick={send}>send</button>
    </div>
  );
}

export default Test;

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
      }
      stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/public', function (greeting) {
           
            console.log(greeting);
        });
        stompClient.subscribe('/topic/user', function (greeting) {
            
            console.log(greeting);
        });
        stompClient.subscribe('/topic/user/udith', function (greeting) {
            
            console.log(greeting);
        });
        stompClient.subscribe('/topic/user/121232323', function (greeting) {
            
            console.log(greeting);
        });
      });
     
    }
    const send = ()=>{
      stompClient.send("/app/addUser", {},"fusdfsd");
      stompClient.send("/app/test", {},"udith");
      stompClient.send("/app/test/one/121232323", {});

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

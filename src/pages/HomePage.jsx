import axios from 'axios';
import { useEffect } from 'react';
import ChatBox from '../components/chatbox/Chatbox';

const HomePage = () => {
  const source = new EventSource('http://localhost:35729/sse');

  // function setConnected(connected) {
  //   document.getElementById('connect').disabled = connected;
  //   document.getElementById('disconnect').disabled = !connected;
  //   document.getElementById('conversationDiv').style.visibility = connected
  //     ? 'visible'
  //     : 'hidden';
  //   document.getElementById('response').innerHTML = '';
  // }

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, []);

  function connect() {
    source.addEventListener('/message', (e) => {
      console.log(e.data);
    });
  }

  function disconnect() {
    source.close();
  }

  function sendMessage() {
    let status = document.getElementById('status').value;
    let text = document.getElementById('text').value;
    let isEnabled = document.getElementById('isEnabled').value;
    console.log(status);
    axios.post('http://localhost:35729/sse', {
      data: JSON.stringify({
        text,
        status,
        isEnabled,
      }),
    });
  }

  function showMessageOutput(messageOutput) {
    let response = document.getElementById('response');
    let p = document.createElement('p');
    p.style.wordWrap = 'break-word';
    p.appendChild(
      document.createTextNode(
        messageOutput.from +
          ': ' +
          messageOutput.text +
          ' (' +
          messageOutput.time +
          ')'
      )
    );
    response.appendChild(p);
  }

  return (
    <body>
      <div>
        {showMessageOutput}
        <div>
          <input type="text" id="from" placeholder="Choose a nickname" />
        </div>
        <br />
        <br />
        <div id="conversationDiv">
          <input type="text" id="text" placeholder="Write a message..." />
          <input
            type="status"
            id="text"
            placeholder="Write a status message..."
          />
          <input
            type="isEnabled"
            id="text"
            placeholder="Write a enabled message..."
          />
          <button id="sendMessage" onClick={() => sendMessage}>
            Send
          </button>
          <p id="response"></p>

          <ChatBox />
        </div>
      </div>
    </body>
  );
};

export default HomePage;

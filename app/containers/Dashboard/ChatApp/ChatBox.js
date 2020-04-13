import React from "react";
import ChatBox from "./src/lib";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: []
    };
  }

  onMessageWasSent = message => {
    this.setState({
      messageList: [...this.state.messageList, message]
    });
  };

  sendMessage = text => {
    if (text.length > 0) {
      this.setState({
        messageList: [
          ...this.state.messageList,
          {
            author: "them",
            type: "text",
            data: { text }
          }
        ]
      });
    }
  };
  
  render() {
    return (
      <div>
        <ChatBox
          agentProfile={{
            teamName: "react-live-chat",
            imageUrl:
              "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png"
          }}
          onMessageWasSent={this.onMessageWasSent}
          messageList={this.state.messageList}
          showEmoji
        />
      </div>
    );
  }
}

export default App;
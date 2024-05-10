import React from "react";

import { PrettyChatWindow } from 'react-chat-engine-pretty' //import the chat engine component from react-chat-engine-pretty framwork

const ChatsPage = (props) => {
    return (
      <div style={{ height: "100vh"}}>

        <PrettyChatWindow
          projectId="36be190e-c1b4-440b-93bb-b86697e892d4" //assignt the chatengine.io is project id
          username={props.user.username} //assign the username
          secret={props.user.secret} //assign the secret
          style={{ height: "100%"}}
        />

      </div>
    )
};

export default ChatsPage;
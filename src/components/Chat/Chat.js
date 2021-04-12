import "./Chat.css";
import ChatHeader from "./ChatHeader/ChatHeader";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import Message from "./Message/Message";
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "../../features/appSlice";
import { selectUser } from "../../features/userSlice";
import { useEffect, useState } from "react";
import db from "../../firebase";
import firebase from "firebase";

const Chat = () => {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    channelId &&
      db
        .collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
  }, [channelId]);

  const sendMessageHandler = (e) => {
    e.preventDefault();
    db.collection("channels").doc(channelId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user,
    });
    setInput("");
  };

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />

      <div className="chat__messages">
        {messages &&
          messages.map((message) => (
            <Message
              key={message.message}
              user={message.user}
              time={message.timestamp}
              message={message.message}
            />
          ))}
      </div>
      <div className="chat__input">
        <AddCircleIcon className="icons_hover" fontSize="large" />
        <form>
          <input
            value={input}
            disabled={!channelId}
            onChange={(event) => setInput(event.target.value)}
            placeholder={`Message #${
              channelName ? channelName : "There's no Selecetd Channel :D"
            }`}
          />
          <button
            className="chat__inputButton"
            type="submit"
            onClick={sendMessageHandler}
          >
            Send Message
          </button>
        </form>

        <div className="chat__inputIcons">
          <CardGiftcardIcon className="icons_hover" />
          <GifIcon className="icons_hover" />
          <EmojiEmotionsIcon className="icons_hover" />
        </div>
      </div>
    </div>
  );
};

export default Chat;

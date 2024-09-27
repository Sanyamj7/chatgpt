import React, { useState } from 'react'
import MessageFormUI from './MessageFormUI';
function StandardMessageForm({props,activeChat}) {
    // console.log("activeChat",activeChat);
    // console.log("props",props);
    const [message,setMessage]=useState("");
    const [attachment,setAttachement] = useState("");
    const handleChange = (e) => setMessage(e.target.value)
    const handleSubmit =async () =>{
        const date = new Date().toISOString().replace("T"," ").replace("Z",`${Math.floor(Math.random() * 1000)}+00:00`);
        const at = attachment ? [{ blob : attachment, file:  attachment.name }]:[];
        const form = {
            attachments:at,
            created: date,
            sender_username: props.username,
            text: message,
            activeChatId: activeChat.id,
        }
        props.onSubmit(form);
        setMessage("");
        setAttachement("");
    }
    return (
    <MessageFormUI
    setAttachement={setAttachement}
    message={message}
    handleChange={handleChange}
    handleSubmit={handleSubmit}
    />
  )
}

export default StandardMessageForm
import { Captcha } from "@/components/Captcha";
import { useState } from "react";

export default function Home() {

  const [selectedIndexes, setSelectedIndexes] = useState([])

  const [message, setMessage] = useState('')


  function sendMessage(){
    if(!message) {
      alert ('The message is required')
      return;
    }
    fetch('/api/send', {
      method: 'POST',
      body: JSON.stringify({
        message, 
          selectedIndexes
        }),
    })
  }

  return (
    <main>
      {/* form for message input */}
      <textarea
        id="text-area"
        name="text-area"
        placeholder="Write message here..."
        rows="4"
        cols="20"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />

      {/* captcha components */}
      <div>
        <Captcha onChange={setSelectedIndexes}/>
      </div>


      <button onClick={sendMessage}>send</button>
    </main>
  );
}

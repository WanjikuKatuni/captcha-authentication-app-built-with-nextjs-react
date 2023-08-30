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
    fetch('/api/send-message', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message, 
          selectedIndexes
        }),
    }).then(response => {
      response.json().then(json => {
        if (json.sent) {
        alert ('Verified. Message Sent!')
        setMessage('')
        }
        if (!json.captchaIsCorrect) {
          alert ('Wrong Captcha. Please try again')
        }
      })
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

import { Captcha } from "@/components/Captcha";
import { withIronSessionSsr } from "iron-session/next";
import { useState } from "react";
import {newCaptchaImages} from "./api/captcha-image";

export default function Home({defaultCaptchaKey}) {

  const [selectedIndexes, setSelectedIndexes] = useState([])

  const [message, setMessage] = useState('')

  // refresh
  const [captchaKey, setCaptchaKey] = useState(defaultCaptchaKey)


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
        // reset captcha key
        setCaptchaKey((new Date()).getTime())
        // alert
        alert ('Verified. Message Sent!')
        setMessage('')
        }
        if (!json.captchaIsCorrect) {
          // reset captcha key
          setCaptchaKey((new Date()).getTime())
          // alert
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
        <Captcha captchaKey = {captchaKey} onChange={setSelectedIndexes}/>
      </div>


      <button onClick={sendMessage}>send</button>
    </main>
  );
}


export const getServerSideProps = withIronSessionSsr(async ({req}) => {
  {
    if (!req.session.captchaImages) {
      req.session.captchaImages = newCaptchaImages();
      await req.session.save();
    }
    return {
      props:{
        defaultCaptchaKey: (new Date).getTime(),
      }
    };
  }
}, {
  cookieName: 'session',
  password: process.env.SESSION_SECRET,
});
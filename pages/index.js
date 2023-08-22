import { Captcha } from "@/components/Captcha";

export default function Home() {
  return (
    <main>
      {/* form for message input */}
      <textarea
        id="text-area"
        name="text-area"
        placeholder="Write message here..."
        rows="4"
        cols="20"
      />

      {/* captcha components */}
      <div>
        <Captcha/>
      </div>


      <button>send</button>
    </main>
  );
}

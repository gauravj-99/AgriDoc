import { useState } from "react";
import BackHome from "../components/BackHome";

export default function Voice() {
  const [listening, setListening] = useState(false);
  const [done, setDone] = useState(false);

  const startVoice = () => {
    setListening(true);
    setDone(false);

    // simulate voice processing
    setTimeout(() => {
      setListening(false);
      setDone(true);
    }, 3000);
  };

  return (
    <div style={{ padding: "16px" }}>
      <BackHome />

      <h2>Voice Assistant</h2>

      <button onClick={startVoice}>
        🎤 Start Speaking
      </button>

      {listening && (
        <p style={{ marginTop: "10px" }}>
          Listening...
        </p>
      )}

      {done && (
        <p style={{ marginTop: "10px", color: "green" }}>
          Voice input processed successfully.
        </p>
      )}
    </div>
  );
}

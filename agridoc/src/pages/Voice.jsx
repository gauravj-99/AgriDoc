import { useContext } from "react";
import { CropContext } from "../context/CropContext";
import { useNavigate } from "react-router-dom";

export default function Voice() {
  const { setCropData } = useContext(CropContext);
  const navigate = useNavigate();

  function startVoice() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recog = new SpeechRecognition();
    recog.lang = "en-IN";

    recog.onresult = (e) => {
      const text = e.results[0][0].transcript;
      const quantity = text.match(/\d+/)?.[0] || "";
      const price = text.match(/\d{3,5}/)?.[0] || "";

      setCropData({
        crop: "Wheat",
        quantity,
        price,
      });

      navigate("/sell");
    };

    recog.start();
  }

  return (
    <div className="page">
      <h2>Voice Assistant</h2>
      <button onClick={startVoice}>🎤 Speak Now</button>
    </div>
  );
}

import { useState } from "react";
import Dropzone from "../components/Dropzone";
import ColorPicker from "../components/ColorPicker";
import LabelSelector from "../components/LabelSelector";
import axios from "axios";

export default function Home() {
  const [image, setImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [color, setColor] = useState("#ffffff");
  const [selectedLabel, setSelectedLabel] = useState(null);
  const labels = ["label1.png", "label2.png", "label3.png"]; // kendi etiket isimlerinle değiştir

  const handleDrop = async (file) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1];
      const res = await axios.post("/api/remove-bg", {
        name: file.name,
        file: base64,
      });
      setProcessedImage(`data:image/png;base64,${res.data.image}`);
    };
    reader.readAsDataURL(file);
    setImage(file);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 bg-opacity-70">
      <h1 className="text-3xl font-bold text-white">Twitter Fotoğraf Arka Plan Kaldırıcı</h1>
      <Dropzone onDrop={handleDrop} />
      {processedImage && (
        <div className="relative p-4" style={{ backgroundColor: color }}>
          <img src={processedImage} alt="Processed" className="max-w-md rounded-lg" />
          {selectedLabel && (
            <img src={`/labels/${selectedLabel}`} className="absolute bottom-2 right-2 w-20 h-20" />
          )}
        </div>
      )}
      <ColorPicker color={color} setColor={setColor} />
      <LabelSelector labels={labels} selected={selectedLabel} setSelected={setSelectedLabel} />
      <p className="mt-6 text-white">
        Tasarlayan:{" "}
        <a href="https://x.com/mrsurmeli_eth" target="_blank" className="underline">
          mrsurmeli_eth
        </a>
      </p>
    </div>
  );
}

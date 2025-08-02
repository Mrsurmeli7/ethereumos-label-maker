import axios from "axios";

const processed = new Set(); // aynı resmi tekrar kullanma engeli

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, file } = req.body;

  if (processed.has(name)) {
    return res.status(400).json({ error: "Bu resim zaten işlendi." });
  }

  try {
    const response = await axios.post(
      "https://api.remove.bg/v1.0/removebg",
      { image_file_b64: file, size: "auto" },
      {
        headers: {
          "X-Api-Key": process.env.REMOVE_BG_KEY,
        },
      }
    );

    processed.add(name);
    res.status(200).json({ image: response.data.data.result_b64 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Arka plan kaldırılamadı" });
  }
}

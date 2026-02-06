export default async function handler(req, res) {
  const { model } = req.body;
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `As an AV Engineer, give a short 2-sentence professional installation tip for: ${model}` }] }]
      })
    });
    const data = await resp.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Gemini Proxy Failed" });
  }
}
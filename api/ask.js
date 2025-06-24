// api/ask.js (bukan server.js)

export default async function handler(req, res) {
  const API_KEY = process.env.GEMINI_API_KEY;
  const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  const offTopicKeywords = ['politik', 'saham', 'coding', 'javascript', 'python', 'kesehatan', 'penyakit', 'matematika', 'fisika', 'resep masakan'];
  const refusalResponse = "Maaf, saya adalah Selaras, asisten pariwisata Indonesia. Saya hanya bisa membantu dengan pertanyaan seputar destinasi, tips liburan, dan rekomendasi tempat wisata. Ada hal lain tentang pariwisata yang bisa saya bantu?";

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metode tidak didukung. Gunakan POST.' });
  }

  const { message: userMessage, history } = req.body;

  const contents = [
    {
      role: 'user',
      parts: [{ text: "PENTING: Kamu adalah 'Selaras', asisten perjalanan ahli pariwisata Indonesia. Tugasmu HANYA menjawab pertanyaan seputar destinasi, tips liburan, dan rekomendasi. JIKA pengguna bertanya di luar topik itu (misal: politik, coding, kesehatan), kamu WAJIB menolak dengan sopan dan mengarahkan kembali ke topik pariwisata." }]
    },
    {
      role: 'model',
      parts: [{ text: "Tentu, saya Selaras! Siap membantu Anda merencanakan liburan di Indonesia. Ada yang bisa saya bantu?" }]
    }
  ];

  if (Array.isArray(history)) {
    contents.push(...history);
  }

  contents.push({ role: 'user', parts: [{ text: userMessage }] });

  try {
    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents }),
    });

    const data = await response.json();

    let reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Maaf, saya tidak bisa memberikan jawaban saat ini.';

    const lowerCaseReply = reply.toLowerCase();
    const isOffTopic = offTopicKeywords.some(keyword => lowerCaseReply.includes(keyword));

    if (isOffTopic) {
      console.log("Jawaban di luar topik — diganti dengan respons default.");
      reply = refusalResponse;
    }

    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Kesalahan saat memanggil Gemini:', error);
    return res.status(500).json({ error: 'Gagal meminta jawaban dari Gemini API.' });
  }
}

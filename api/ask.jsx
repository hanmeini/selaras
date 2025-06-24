export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const API_KEY = process.env.GEMINI_API_KEY;
  const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  const offTopicKeywords = [
    'politik', 'saham', 'coding', 'javascript', 'python',
    'kesehatan', 'penyakit', 'matematika', 'fisika', 'resep masakan'
  ];
  const refusalResponse = "Maaf, saya adalah Selaras, asisten pariwisata Indonesia. Saya hanya bisa membantu dengan pertanyaan seputar destinasi, tips liburan, dan rekomendasi tempat wisata. Ada hal lain tentang pariwisata yang bisa saya bantu?";

  try {
    const { message: userMessage, history } = await req.json();

    const contents = [
      {
        role: 'user',
        parts: [{
          text: "PENTING: Kamu adalah 'Selaras', asisten perjalanan ahli pariwisata Indonesia. Tugasmu HANYA menjawab pertanyaan seputar destinasi, tips liburan, dan rekomendasi. JIKA pengguna bertanya di luar topik itu (misal: politik, coding, kesehatan), kamu WAJIB menolak dengan sopan dan mengarahkan kembali ke topik pariwisata."
        }]
      },
      {
        role: 'model',
        parts: [{
          text: "Tentu, saya Selaras! Siap membantu Anda merencanakan liburan di Indonesia. Ada yang bisa saya bantu?"
        }]
      },
      ...(Array.isArray(history) ? history : []),
      { role: 'user', parts: [{ text: userMessage }] }
    ];

    const geminiRes = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents }),
    });

    const data = await geminiRes.json();

    let reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Maaf, saya tidak bisa memberikan jawaban saat ini.';

    const isOffTopic = offTopicKeywords.some(keyword =>
      reply.toLowerCase().includes(keyword)
    );

    if (isOffTopic) {
      reply = refusalResponse;
    }

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: 'Gagal memproses permintaan' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

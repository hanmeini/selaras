// src/components/ChatBox.jsx
import React, { useState } from 'react';

export default function ChatBox() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

const handleAsk = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: input }),
    });

    const data = await response.json();
    setResponse(data.reply);
  } catch (err) {
    console.error(err);
    setResponse('Gagal meminta jawaban.');
  }
};

  return (
    <div>
      <a href='./quiz.jsx'>to kuis</a>
      <h2 class="text-3xl font-bold underline text-red-500">AI Chat with Gemini</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Tulis pesanmu di sini..."
      />
      <button onClick={handleAsk}>Kirim</button>
      <div>
        <strong>Jawaban:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
}

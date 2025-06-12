import './App.css'
import ChatBox from './pages/chatbox'
import Quiz from './pages/quiz'
import Layout from './context/Layout'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import About from './components/About';
import Overview from './components/overview';

function App() {

  return (
    <>
    <Routes>
      {/* Semua halaman pakai layout dengan navbar dan footer */}
      <Route path="/" element={<Layout />}>
        <Route path="quiz" element={<Quiz />} />
        <Route path="chat" element={<ChatBox />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
    </>
  )
}

export default App

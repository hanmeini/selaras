// src/components/Navbar.jsx
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav>
      <Link className='bg-amber-400 w-full p-10' to="/">Beranda</Link> | 
      <Link to="/about">Tentang</Link> | 
      <Link to="/quiz">Kuis</Link> | 
      <Link to="/chat">Chat AI</Link>
    </nav>
  )
}

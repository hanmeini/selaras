// src/Layout.jsx
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import About from '../components/About'
import Overview from '../components/overview'

export default function Layout() {
  return (
    <>
      <Navbar />
      <main style={{ padding: '1rem' }}>
        <About /> {/* Di sinilah halaman akan berganti */}
        <Overview/>
      </main>
      <Footer />
    </>
  )
}

// src/Layout.jsx
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Layout() {
  return (
    <>
      <Navbar />
      <main style={{ padding: '1rem' }}>
        <Outlet /> {/* Di sinilah halaman akan berganti */}
      </main>
      <Footer />
    </>
  )
}

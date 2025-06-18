// src/Layout.jsx
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import About from '../components/About'
import Overview from '../components/overview'
import Testimony from '../components/Testimony'
import Contact from '../components/Contact'

export default function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <About /> {/* Di sinilah halaman akan berganti */}
        <Overview/>
        <Testimony/>
        <Contact/>
      </main>
      <Footer />
    </>
  )
}

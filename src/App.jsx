import './App.css'
import Layout from './context/Layout'
import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import About from './components/About';
import React from 'react';
import Home from './pages/Home'
import Register from './pages/Register';
import Login from './pages/Login';
import PrivateRoute from "./context/PrivateRoute";
import Quiz from './pages/quiz'
import Rekomendasi from './pages/Rekomendasi';
import AdminRoute from './context/AdminRoute'
import AdminDashboardPage from './admin/dashboardAdmin'
import ChatPage from './pages/ChatPage';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route
            path="/quiz"
            element={
              <PrivateRoute>
                <Quiz />
              </PrivateRoute>
            }
          />
          <Route
            path="/rekomendasi/:kategori"
            element={
              <PrivateRoute>
                <Rekomendasi />
              </PrivateRoute>
            }
          />
          <Route
            path="/SelarasAI"
            element={
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            }
          />
          <Route 
            path="/admin/dashboard" 
            element={
              <AdminRoute>
                <AdminDashboardPage />
              </AdminRoute>
            } 
          />
        </Route>

        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App

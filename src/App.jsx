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
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/Profile';
import DetailPage from './pages/DetailPage';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path='/profile' element={<ProfilePage />} />
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
            path="/wisata/:placeId"
            element={
              <PrivateRoute>
                <DetailPage />
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
        <Route
            path="/SelarasAI"
            element={
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            }
        />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App

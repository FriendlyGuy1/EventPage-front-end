import Header from './components/Header'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Vietos from './pages/Vietos'
import Renginiai from './pages/Renginiai'
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from "react-router-dom";

import './css/App.css'
import './css/styles.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/renginiai" element={<Renginiai />} />
          <Route path="/vietos" element={<Vietos />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

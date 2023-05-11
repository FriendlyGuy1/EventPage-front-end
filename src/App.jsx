import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import AllEvents from './pages/AllEvents'
import FavouriteEvents from './pages/FavouriteEvents'
import AdminPanel from './pages/AdminPanel'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/favourites' element={<FavouriteEvents />} />
            <Route path='/adminPanel' element={<AdminPanel />} />
            <Route path='/' element={<Dashboard />} />
            <Route path='/events' element={<AllEvents />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App

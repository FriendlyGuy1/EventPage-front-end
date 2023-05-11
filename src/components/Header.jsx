import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  const Admin = () => {
    if (user.role === "admin") {
      return (
        <div>
          <Link to='/adminPanel'>AdminPanel</Link>
        </div>
      )
    }
  }


  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>Create Event</Link>
      </div>
      <div>
        <Link to='/events'>Events</Link>
      </div>
      {user ? (
        <Admin />
      ) : (
        <div className='myHidden'>
        </div>
      )}
      <ul>
        {user ? (
          <>
            <div>
              <Link to='/favourites'>Favourite Events</Link>
            </div>
            <li>

              <button className='btn' onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>

        ) : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header
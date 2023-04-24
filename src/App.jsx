import userlogin from './assets/userlogin.svg'
import './css/App.css'

function App() {

  return (
    <>
      <a href="" target="_blank">
        <img src={userlogin} className="logo" alt="log in" />
      </a>
      <h1>Renginiai</h1>
      <button>Ieskoti</button>
    </>
  )
}

export default App

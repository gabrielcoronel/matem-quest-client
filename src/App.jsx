import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'

const App = () => {
  return (
    <div className="flex">
      <NavBar />

      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default App

import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'

const App = () => {
  return (
    <div className="flex">
      <Outlet />
    </div>
  )
}

export default App

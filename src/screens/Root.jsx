import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'

export default () => {
  return (
    <div className="flex w-full h-screen bg-_blue">
      <NavBar />

      <Outlet />
    </div>
  )
}

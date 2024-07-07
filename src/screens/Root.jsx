import { Outlet } from 'react-router-dom'
import { NavBar } from '../components'

export default () => {
  return (
    <div className="flex w-full h-screen bg-_purple">
      <NavBar />

      <Outlet />
    </div>
  )
}

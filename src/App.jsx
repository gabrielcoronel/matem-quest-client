import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <div className="flex">
      <Outlet />
    </div>
  )
}

export default App

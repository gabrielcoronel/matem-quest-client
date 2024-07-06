import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div className="flex">
      <Outlet />

      <Toaster
        position="bottom-center"
      />
    </div>
  )
}

export default App

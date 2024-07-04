export default ({ children }) => {
  return (
    <div className="w-full h-full p-5 rounded-l-[35px] shadow-lg shadow-_black bg-_purple">
      <div className="w-full h-full animate__animated animate__fadeIn">
        {children}
      </div>
    </div>
  )
}

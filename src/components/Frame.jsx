export default ({ children }) => {
  return (
    <div className="w-full h-full rounded-l-[35px] bg-_white p-5">
      <div className="w-full h-full animate__animated animate__fadeIn">
        {children}
      </div>
    </div>
  )
}

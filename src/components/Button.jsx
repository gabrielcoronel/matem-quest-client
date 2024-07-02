export default ({ text, onClick }) => {
  return (
    <div
      className="flex justify-center items-center py-1.5 px-3 w-full h-fit rounded-lg bg-_blue cursor-pointer hover:scale-105 transition-all"
      onClick={onClick}
    >
      <span className="font-primary text-xl text-_white">
        {text}
      </span>
    </div>
  )
}

export default ({ text, onClick }) => {
  return (
    <div
      className="flex justify-center items-center py-1.5 px-3 w-full h-fit rounded-lg bg-_yellow cursor-pointer hover:scale-105 transition-all"
      onClick={onClick}
    >
      <span className="font-bold font-primary text-xl text-_purple">
        {text}
      </span>
    </div>
  )
}

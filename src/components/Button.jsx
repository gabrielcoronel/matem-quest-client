export default ({ text, onClick, disabled }) => {
  return (
    <div
      className={`
        flex justify-center items-center py-1.5 px-3 w-full h-fit
        rounded-lg bg-_yellow hover:scale-105 transition-all
        ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
      `}
      onClick={disabled ? null : onClick}
    >
      <span className="font-bold font-primary text-xl text-_purple">
        {text}
      </span>
    </div>
  )
}

import toast from 'react-hot-toast'

const ToastContainer = ({ icon, title, description }) => {
  return (
    <div className="min-w-72 w-fit flex justify-center items-center gap-x-3 py-2 px-3 rounded-lg bg-_yellow animate__animated animate__fadeInLeft">
      <span className="flex justify-center items-center w-1/4 text-_purple">
        {icon}
      </span>

      <div className="flex flex-col justify-between w-3/4 gap-y-1">
        <span className="font-primary font-bold text-xl text-_purple text-ellipsis">
          {title}
        </span>

        <span className="font-primary text-_black text-ellipsis">
          {description}
        </span>
      </div>
    </div>
  )
}

export default (icon, title, description) => {
  toast.remove()

  toast.custom(
    (
      <ToastContainer
        icon={icon}
        title={title}
        description={description}
      />
    ),
    {
      duration: 1000
    }
  )
}

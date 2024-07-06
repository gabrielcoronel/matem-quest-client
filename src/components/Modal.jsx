import Modal from 'react-modal'
import { X } from 'lucide-react'

Modal.setAppElement("#root")

const overlayStyle = {
  backgroundColor: "#262626bf"
}

const contentStyle = {
  borderRadius: "0.5rem",
  backgroundColor: "#4c1d95",
  border: "solid 1px #f5d922"
}

export default ({ title, sideImage, isOpen, onClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: overlayStyle,
        content: contentStyle
      }}
    >
      <div className="flex flex-col gap-y-5 w-full h-full p-3 animate__animated animate__fadeIn">
        <div className="flex justify-between items-center">
          <span className="font-primary font-bold text-3xl text-_yellow">
            {title}
          </span>

          <div
            className="hover:scale-110 transition-all"
            onClick={onClose}
          >
            <X size={40} color="#f5d922" />
          </div>
        </div>

        <div className="w-full h-full flex items-center">
          <div className="flex flex-col justify-center items-center gap-y-7 p-3 w-1/2 h-full">
            {children}
          </div>

          <div className="flex justify-center items-center p-3 w-1/2 h-full">
            {sideImage}
          </div>
        </div>
      </div>
    </Modal>
  )
}

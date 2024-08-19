import { Fragment, useState } from 'react'
import useHover from '../hooks/use-hover'
import { TexBlock, Divider } from './'

const RadioButton = ({ isSelected }) => {
  return (
    <div
      className={`
        w-5 h-5 rounded-full border-4 border-_white
        transition-colors
        ${isSelected ? "bg-_purple" : "bg-_white"}
      `}
    >
    </div>
  )
}

const Option = ({ isSelected, onSelect, texContent }) => {
  return (
    <div
      className="flex items-center gap-x-3 px-3 w-full hover:bg-_yellow transition-colors cursor-pointer"
      onClick={onSelect}
    >
      <RadioButton
        isSelected={isSelected}
      />

      <TexBlock>
        {texContent}
      </TexBlock>
    </div>
  )
}

const ActionButton = ({ icon, text, action, orientation }) => {
  const [isHovering, hoveringEvents] = useHover()

  return (
    <div
      {...hoveringEvents}
      className={`
        flex items-center gap-x-px rounded-lg w-fit hover
        transition-colors py-0.5 px-1.5
        ${isHovering ? "bg-_yellow" : "bg-_purple" }
        ${orientation === "left" ? "flex-row rounded-bl-md" : "flex-row-reverse rounded-br-md"}
      `}
      onClick={action}
    >
      <span
        {...hoveringEvents}
        className={`
          font-primary text-xl
          transition-colors
          ${isHovering ? "text-_purple": "text-_yellow"}
        `}
      >
        {icon}
      </span>

      <span
        {...hoveringEvents}
        className={`
          font-primary text-xl
          transition-colors
          ${isHovering ? "text-_purple": "text-_yellow"}
        `}
      >
        {text}
      </span>
    </div>
  )
}

export default ({
  statement,
  texContent,
  options,
  onSelect,
  leftAction,
  rightAction
}) => {
  const [selectedIndex, setSelectedIndex] = useState(null)

  const handleSelect = (index) => {
    const isAccurate = options[index].isCorrect === true

    onSelect(isAccurate)
    setSelectedIndex(index)
  }

  const optionsElements = options.map((option, index) => {
    return (
      <Fragment
        key={index}
      >
        <Option
          isSelected={selectedIndex === index}
          onSelect={() => handleSelect(index)}
          texContent={option.texContent}
        />

        <Divider />
      </Fragment>
    )
  })
  return (
    <div className="w-full h-full pt-3 rounded-lg bg-_purple border-2 border-_yellow">
      <div className="w-full h-full rounded-lg animate__animated animate__fadeIn">
        <div className="flex flex-col justify-evenly items-center w-full h-1/3">
          <span className="font-primary text-2xl text-_yellow text-center">
            {statement}
          </span>

          <TexBlock>
            {texContent}
          </TexBlock>
        </div>

        <div className="w-full h-1/2">
          <Divider />

          {optionsElements}
        </div>

        <div className="flex justify-between items-center px-3 w-full h-1/6">
          <ActionButton
            icon={leftAction.icon}
            text={leftAction.text}
            action={leftAction.onAction}
            orientation="left"
          />

          <ActionButton
            icon={rightAction.icon}
            text={rightAction.text}
            action={rightAction.onAction}
            orientation="right"
          />
        </div>
      </div>
    </div>
  )
}

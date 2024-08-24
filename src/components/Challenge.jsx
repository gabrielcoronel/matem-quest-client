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
      className="flex items-center gap-x-3 px-3 w-full grow hover:bg-_yellow transition-colors cursor-pointer"
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

const ActionButton = ({ icon, action, orientation }) => {
  const [isHovering, hoveringEvents] = useHover()

  return (
    <div
      {...hoveringEvents}
      className={`
        flex items-center gap-x-2 rounded-lg w-fit hover
        transition-colors p-1.5 cursor-pointer
        ${isHovering ? "bg-_yellow" : "bg-_purple" }
        ${orientation === "left" ? "flex-row rounded-bl-md" : "flex-row-reverse rounded-br-md"}
      `}
      onClick={action}
    >
      <span
        {...hoveringEvents}
        className={`
          font-primary transition-colors
          ${isHovering ? "text-_purple": "text-_yellow"}
        `}
      >
        {icon}
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
    <div className="w-full h-full rounded-lg bg-_purple border-2 border-_yellow">
      <div className="flex flex-col w-full h-full rounded-lg animate__animated animate__fadeIn">
        <div className="flex justify-between items-center p-1.5 w-full grow-0">
          <div className={leftAction.hidden ? "invisible" : ""}>
            <ActionButton
              icon={leftAction.icon}
              action={leftAction.onAction}
              orientation="left"
            />
          </div>

          <div className={rightAction.hidden ? "invisible" : ""}>
            <ActionButton
              icon={rightAction.icon}
              action={rightAction.onAction}
              orientation="right"
            />
          </div>
        </div>

        <div className="w-full grow">
          <div className="flex flex-col justify-evenly items-center w-full h-1/4">
            <span className="font-primary text-2xl text-_yellow text-center">
              {statement}
            </span>

            <TexBlock>
              {texContent}
            </TexBlock>
          </div>

          <div className="flex flex-col w-full h-3/4">
            <Divider />

            {optionsElements}
          </div>
        </div>
      </div>
    </div>
  )
}

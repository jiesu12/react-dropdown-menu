import * as React from 'react'
import './DropdownMenu.scss'

export interface MenuItem {
  key: string
  display?: React.ReactNode
  onClick: () => void
}

interface Props {
  title: React.ReactNode
  menuItems: MenuItem[]
  showTitle?: boolean
  rightHandSide?: boolean
}

const DropdownMenu = ({ title, menuItems, showTitle = true, rightHandSide = true }: Props) => {
  const [open, setOpen] = React.useState<boolean>(false)
  const contentRef = React.useRef(null)
  const buttonRef = React.useRef(null)

  React.useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  const handleOutsideClick = (e: MouseEvent) => {
    if (!contentRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
      setOpen(false)
    }
  }

  return (
    <div className='drop-down-menu'>
      <div className='drop-down-button' ref={buttonRef}>
        <div
          className={`sandwich ${showTitle ? 'showTitle' : ''}`}
          onClick={() => setOpen(!open)}
          ref={buttonRef}
        >
          <div className='bar bar-1' />
          <div className='bar bar-2' />
          <div className='bar bar-3' />
        </div>
        {showTitle && (
          <div className='title' onClick={() => setOpen(!open)}>
            {title}
          </div>
        )}
      </div>
      <div
        className={`drop-down ${open ? 'open' : 'close'} ${rightHandSide ? 'right' : 'left'}`}
        ref={contentRef}
      >
        {menuItems.map((item) => (
          <div
            className='menu-item'
            key={item.key}
            onClick={() => {
              setOpen(false)
              item.onClick()
            }}
          >
            {item.display || item.key}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DropdownMenu

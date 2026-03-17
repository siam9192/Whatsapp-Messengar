import React, { ReactNode } from 'react'
interface Props {
    children:ReactNode
}
function Background({children}:Props) {
  return (
    <div>
        {
            children
        }
          <div className="rectangle absolute top-140 -left-18"></div>
          <div className="rectangle absolute -top-28 -right-20"></div>
    </div>
  )
}

export default Background
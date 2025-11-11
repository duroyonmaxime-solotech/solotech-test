import React from 'react'

type ButtonProps = {
  label: any
  onClick: () => void
}

function Button(props: ButtonProps) {
  return (
    <button onClick={() => props.onClick()}>{props.label}</button>
  )
}

export default Button
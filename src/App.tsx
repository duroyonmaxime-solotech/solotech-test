import React from 'react'
import Btn from './Button.tsx'

export default function App() {
  const [count, setCount] = React.useState(0)
  const [mounted, setMounted] = React.useState(true)
  let displayCard = React.useRef(false)

  React.useEffect(() => {
    if (mounted) {
      console.log('App mounted')
    }
    setMounted(true)

    // React.useEffect(() => {
    //   return () => {
    //     console.log('App unmounted')
    //   }
    // }, [])

  }, [count, mounted])

  const handleClick = () => {
    setCount((count as unknown as number) + 1)
  }

  const Cardd = (title, description, footer) => {
    return (
        <div>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    )
  }

  return (
    <div>
        <h1>Mini React app</h1>
        <Btn label="Click me" onClick={() => handleClick()} /> 
        <p>Count: {count}</p>
        <span onClick={() => {displayCard.current = true}}>Display my card</span>
        {Cardd('Ma super card', 'description')}
    </div>
  )
}

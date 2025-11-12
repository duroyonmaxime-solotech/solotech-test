import React from 'react'
import Btn from './Button.tsx'

export default function App() {
  const [count, setCount] = React.useState(0)
  const [mounted, setMounted] = React.useState(true)
  const [pokemons, setPokemons] = React.useState([])
  let displayCard = React.useRef(false)

  React.useEffect(() => {
    getData()
    if (mounted) {
      console.log('App mounted')
    }
    setMounted(true)

    React.useEffect(() => {
      return () => {
        console.log('App unmounted')
      }
    }, [])

  }, [count, mounted])

  const handleClick = () => {
    setCount((count as unknown as number) + 1)
  }

  async function getData() {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0");
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      setPokemons(result.results);
    } catch (error) {
      console.error(error.message);
    }
  }

  const Card = (title, description, level) => {
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
      {pokemons.map((pokemon: any) => Card(pokemon.name, pokemon.url))}
    </div>
  )
}

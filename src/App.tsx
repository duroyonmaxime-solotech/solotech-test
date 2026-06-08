// @ts-nocheck
/* eslint-disable */

import React from 'react'
import Btn from './Button.tsx'

export default function App() {
  const [count, setCount] = React.useState(0)
  const [mounted, setMounted] = React.useState(true)
  const [pokemons, setPokemons] = React.useState([])
  const [pokemonsDetails, setPokemonsDetails] = React.useState([])
  let displayCard = React.useRef(false)
  const Stats = {
    Monostat: 'MONOSTAT',
    Duostat: 'DUOSTAT',
    Multistat: 'MULTISTAT'
  }

  React.useEffect(() => {
    GetData()
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
    setCount(count + 1)
  }

  async function GetData() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0");
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    setPokemons(result.results);

    result.results.forEach(async element => {
      const response = await fetch(element.url);
      const result = await response.json();
      setPokemonsDetails((previous) => [...previous, result])
    });
    console.log(pokemonsDetails)
  }

  const Card = (title: string, description: string, level: string, stats: any) => {
    return (
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
        <span>{level === 100 && "Niveau max !"}</span>

        <div>
          {pokemonsDetails.find(detail => detail.name === title).types.map(({type}) => (
            <span>{type.name}</span>
          ))}
        </div>
        <div>
          <span>Stats type : </span>
          <span>
            {stats.length === 1 ? (
              Stats.Monostat
            ) : (
              stats.length === 2 ? (
                Stats.Duostat
              ) : (
                Stats.Multistat
              )
            )}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div>
        <Btn label="Click me" onClick={() => handleClick()} />
        <p>Count: {count}</p>
      </div>
      <div>
        <div>
          <button onClick={() => displayCard.current = true}>Display my card</button>
        </div>
        {displayCard.current && (
          <div>
            {pokemons.map((pokemon: any) => Card(pokemon.name, pokemon.url, pokemon.level, pokemon.stats))}
          </div>
        )}
      </div>
    </div>
  )
}

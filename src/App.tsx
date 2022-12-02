import { useEffect, useRef, useState } from 'react';
import './App.css';
import axios from 'axios';
import PokemonCollection from './components/PokemonCollection';
import { Pokemon, Pokemons } from './interface/pokemon';

function  App() {

  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [nextUrl, setNextUrl] = useState<string>("")
  // to prevent double api call 
  const renderAfterCalled = useRef(false);

  useEffect(() => {
    
    if (!renderAfterCalled.current) {
      
      const getPokemons = async () => {
        const res = await axios.get(
          'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
        )

        setNextUrl(res.data.next)
          
        res.data.results.forEach(async (pokemon: Pokemons) => {
          const poke = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
          )
          setPokemons((p) => [...p, poke.data].sort((a,b) => a.id - b.id))
        })
      }
      getPokemons()
      renderAfterCalled.current = true;
    }
  },[])

  const nextPokemons = async () => {
    
    const res = await axios(nextUrl)
    
    setNextUrl(res.data.next)

    res.data.results.forEach(async (pokemon: Pokemons) => {
      const poke = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      )
      setPokemons((p) => [...p, poke.data].sort((a,b) => a.id - b.id))
    })
  }
  
  return (
    <div className="App">
      <div className="container">
      <header className="pokemon-header">
        <img src='pokedex.png' className='image-pokedex'></img>
        Pokédex
        <img src='pokedex.png' className='image-pokedex'></img>
      </header>
      <PokemonCollection pokemons={pokemons}/>
      <div className='btn'>
        <button className="button-next-pokemons" onClick={nextPokemons}>Charger plus</button>
      </div>
      </div>
    </div>
  );
}

export default App;
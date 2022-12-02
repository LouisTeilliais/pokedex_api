export interface Pokemon{
    id: number;
    name: string;
    sprites: {
      front_default: string;
    };
    types: {
      type : {
        name: string
      }
    }[]
  }

export interface Pokemons{
    name: string,
    url: string,
  }
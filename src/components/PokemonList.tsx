
interface Props {
    name:string,
    id:number,
    image: string,
    type: string
}

function PokemonList(props: Props){

    const {name, id, image, type} = props
    return (
        <div>
            <section key={id} className={`pokemon-list-container ${type}`}>
                <p className="pokemon-id">#{id}</p>
                <p className="pokemon-name">{name}</p>
                <img src={image} alt={name} className="pokemon-image" />
                <p className="pokemon-type">type: {type}</p>
            </section>
        </div>
        
    )    
}

export default PokemonList
import React, { useEffect , useState} from 'react'
import css from './layout.module.scss'
import Header from '../header/header'
import axios from 'axios'
import { URL_POKEMON } from '../../../api/apiRest'
import Card from '../card/Card'


export default function LayoutHome() {
  const [arrayPokemons, setArrayPokemons] = useState([]); //Estado para obtener Pokemon
  const [globalPokemon, setGlobalPokemon] = useState([]);
  const [region, setRegion] = useState('kanto'); // Estado para la región seleccionada
  const [search, setSearch] = useState('');

  useEffect(() => {
    const api = async () => {
      let offset = 0;
      let limit = 151;

      // Cambia el offset y limit según la región seleccionada
      switch (region) {
        case 'johto':
          offset = 151;
          limit = 100;
          break;
        case 'hoenn':
          offset = 251;
          limit = 135;
          break;
        case 'sinnoh':
          offset = 386;
          limit = 107;
          break;
        case 'unova':
          offset = 494;
          limit = 156;
          break;
        case 'kalos':
          offset = 649;
          limit = 72;
          break;
        case 'alola':
          offset = 721;
          limit = 88;
          break;
        case 'galar':
          offset = 809;
          limit = 89;
          break;
        case 'paldea':
          offset = 905;
          limit = 112;
          break;
        default: // Kanto
          offset = 0;
          limit = 151;
          break;
      }

      const apiPoke = await axios.get(`${URL_POKEMON}?offset=${offset}&limit=${limit}`);
      setArrayPokemons(apiPoke.data.results);
    };

    api();
    getGlobalPokemon();
  }, [region]); // Vuelve a ejecutar el useEffect cuando la región cambie

  const obtenerSearch = (e) =>{
    const texto = e.toLowerCase()
    setSearch(texto)

  }

  const getGlobalPokemon = async () => {
    const res = await axios.get(`${URL_POKEMON}?offset=0&limit=1000`);

    const promises = res.data.results.map((pokemon) => {
      return pokemon;
    });

    const results = await Promise.all(promises);
    setGlobalPokemon(results);
  };

  const filtroPokemon = search?.length > 0 
  ? globalPokemon?.filter(pokemon =>  pokemon?.name?.includes(search))
  : arrayPokemons
  return (
    <>
      <div className={css.layout}>
        <Header obtenerSearch = {obtenerSearch} />
       
      </div>

      {/* Botones para cambiar de región */}
      <div className={css.buttons}>
        <button onClick={() => setRegion('kanto')}>Kanto</button>
        <button onClick={() => setRegion('johto')}>Johto</button>
        <button onClick={() => setRegion('hoenn')}>Hoenn</button>
        <button onClick={() => setRegion('sinnoh')}>Sinnoh</button>
        <button onClick={() => setRegion('unova')}>Unova</button>
        <button onClick={() => setRegion('kalos')}>Kalos</button>
        <button onClick={() => setRegion('alola')}>Alola</button>
        <button onClick={() => setRegion('galar')}>Galar</button>
        <button onClick={() => setRegion('paldea')}>Paldea</button>
      </div>

      <div className={css.card_content}>
        {filtroPokemon.map((card, index) => {
          return <Card key={index} card={card} />;
        })}
      </div>

      
    </>
  );
}
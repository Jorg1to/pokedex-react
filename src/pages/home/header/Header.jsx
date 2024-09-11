import React from 'react';
import css from "./header.module.scss";
import logo from '../../../assets/pokelogo.png';

export default function Header({obtenerSearch}) {
  return (
    <nav className={css.header}>
      <div className={css.div_header}>
        <a href="https://portfolio-jorg1tos-projects.vercel.app/">
        <div className={css.div_logo}>
          <img src={logo} alt="logo" />
        </div>
        </a>
        <div className={css.div_search}>
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pokeball mt-4" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="white" stroke-linecap="round" stroke-linejoin="round">
		      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
		      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
		      <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
		      <path d="M3 12h6" />
		      <path d="M15 12h6" />
	  </svg>
          <input type="search" onChange={(e) => obtenerSearch(e.target.value)} name="" id="" placeholder='Buscar' />
          </div>
          </div>
    </nav>

   
  )
}   

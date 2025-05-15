<script context="module">
import { pokemonStore } from '../store';
import { GET_POKEMON_BY_ID } from '../services/firebase';

export const addPokemonToStore = (_pokemon) => {
pokemonStore.set(_pokemon.national_number, _pokemon);
};

pokemonStore.subscribe((v) => console.log((v));

</script>
<script context="module">
import { pokemonStore } from '../store';
import { GET_POKEMON_BY_ID } from '../services/firebase';
import { resolveUrl } from '@roxi/routify/runtime/utils'
import { GET_POKEMON_NATIONAL_NUMBER } from '../../pages/services/firebase'

export const addPokemonToStore = (_pokemon) => {
pokemonStore.set(_pokemon.national_number, _pokemon);
};

export const fetchPokemons = (id) => {
 return new Promise(async (resolve, reject) => {
    await GET_POKEMON_NATIONAL_NUMBER(id)
    .then((pokemon) => {
        console.log(pokemon);
        let p = Object.values(pokemon)[0];
        addPokemonToStore(p);
        resolve(p);
    })
    .catch((err) => console.log(err))
    })
}
// pokemonStore.subscribe((v) => console.log((v));

</script>
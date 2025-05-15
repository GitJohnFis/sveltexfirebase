<script>
import { goto } from '@roxi/routify';
import { random } from 'lodash';
import { getPokemonById } from '../services';
import { addPokemonToStore } from '../components/Pokemon.svelte'
import { Loading, ListItem } from '../components';

let list = [];
let isLoading = false;

const getRandomPokemons = async () => {
    list = new Array()
    isLoading = true;
// console.log(random(0, 806))
for (let i = 0; i < 5; i++)
{
    let randomId = random(0, 806);
    await getPokemonById(randomId)
    .then((pokemon) => {
        list.push({ id: randomId, ...pokemon});
        addPokemonToStore(pokemon);
    })
    .catch((err) => {
        reject(err)
    })   
}
isLoading = false;
};

const goToPokemons = (id) => {
    $goto(`/pokemon/${id}`);
};

getRandomPokemons()
</script>

    <main>
        <div class="w-full lg:w-2/4 mx-auto px-1">
            {#if isLoading}
            <Loading />
            {:else if !list.length}
            <p>no result</p>
            {:else}
            {#each list as pokemon}
           <ListItem {pokemon} on:click={goToPokemon(pokemon.national_number)}/>
       {/each}
        {/if}
    </div>
    </main>
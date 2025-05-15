<script>
import { user } from '../auth';
import { userStore } from '../store'
import { Label } from './Label.svelte';
import { Loading } from './Loading.svelte';
import { Button } from './Button./svelte';
import { setPokemonAsFavorite } from '../services'


export let pokemon;
let _user;
let isLoading = false;
let favorites = []

user.subscribe((v) => (_user = v));
userStore.subscribe((v) => (favorites = v.favorites));

const setNewFavorite = async () => {
    await setPokemonAsFavorite(pokemon.national_number, user.id)
    .then((data) => {
        userStore.set('favorites', data)
    })
};
</script>

<div
class="cursor-pointer p-4 pb-2 border rounded-lg my-2 flex grid grid-flow-row grid-cols-12 gap-2" 
>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div class="col-span-3 flex-grow" on:click>
        <img src={pokemon.sprites.normal} alt={pokemon.name} class="w-24 h-24"/>
    </div>
    <div class="col-span-7" on:click>
        <p class="text-xs text-gray-500">{pokemon.national_number}</p>
        <p class="text-lg font-bold my-1">{pokemon.name}</p>
   <div class="list-item-type flex">
    {#each pokemon.type as type}
    <Label {type}/>
    {/each}
</div> 
</div>
<div class="col-span-2 flex items-start justify-end">
    {#if isLoading}
    <Loading/>
    {:else if favorites.includ(pokemon.national_id)}
    <Button title="Remove" red/>
    {:else}
    <Button title="Set as favorite" red/>
    {/if}
</div>
</div>
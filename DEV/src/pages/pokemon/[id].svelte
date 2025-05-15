<script>
import { params } from '@roxi/routify/runtime/helpers';
import { userStore } from '../../store';
import { Button, Label, Loading } from '../../components';
    import { fetchPokemons } from '../../auth/components/Pokemon.svelte'

let pokemon;
let favorites = [];

userStore.subscribe((v) => {
    if (v) {
       favorites = v.favorites; 
    }
});

if (!pokemon) {
    fetchPokemons($params.id)
    .then((p) => {
        pokemon = p
    })
    .catch((err) => consol.log(err))
}
</script>


<main>
<div class="my-16">
    <p>{$params.id}</p>
     {#if pokemon}
     {#if pokemon.sprites}
<div class="flex items-center justify-center mb-8">
    <img  src={pokemon.sprites.large} alt={pokemon.name}/>
</div>
{/if}
<div class="flex flex-col items-center justify-center">
    <h1 class="text-4xl font-medium mb-2">
{pokemon.name}
    </h1>
    <p class="text-gray-500">Number {pokemon.national_number}</p>
    {#if pokemon && pokemon.type}
    <div class="flex my-2">
        {#each pokemon.type as type}
        <Label {type}/>
        {/each}
    </div>
    {/if}
    {#if favorites.length > 0 && !favorites.includes(pokemon.national_number)}
    <Button on:click={setNewFavorite} title="Add as favorite" red/>
    {:else}
    <Button on:click={setNewFavorite} title="Remove favorite" red/>
{/if}
</div>
{:else}
<Loading />
{/if}
</div>
</main>
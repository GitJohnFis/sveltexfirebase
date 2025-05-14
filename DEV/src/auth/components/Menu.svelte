<script>
    import { createEventDispatcher } from 'svelte';
    import { clickOutside } from '../services/clickOutside';
    export let user;
    export let isOpen = false;

    const dispatch = createEventDispatcher();
    function handleClickOutside() 
    {
        isOpen = false;
    }
    function openMenu() 
    {
        isOpen = !isOpen;
    }
</script>
<div class="relative cursor-pointer">
    <div class="flex items-center justify-center" on:click={openMenu}>
    <p class="mr-2">{user.name}</p>
    <div class="w-8 h-8 rounded-full overflow-hidden">
    <img src={user.picture} class="w-8 h-8" alt={user.name} />
</div>
    </div>

{#if isOpen}
<div class="flex flex-col text-right absolute border top-16 right-0 bg-white rounded-lg p-4 text-black pl-32"
use:clickOutside
on:click_outside={handleClickOutside}>
<p class="text-red-500" on:click={() => dispatch('confirmLogout')}>Logout</p>
</div>
 {/if}
 </div>
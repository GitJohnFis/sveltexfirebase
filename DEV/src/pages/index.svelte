<script>
    import { user, logout, loginWithGoogle } from '../../components/Auth.svelte';
    import { Button } from './Button.svelte';
    // import { Auth } from '../components';

    let _user;
    user.subscribe((u) = (_user = u));
    </script>

<main>
    <div class="flex flex-col items-center justify-center my-8">
        {#if _user}
        <div class="w-32 h-32 rounded-full overflow-hidden mb-6">
            <img src={_user.picture} alt="user thumb" class="w-32 h-32"/>
            </div>
    <p class="text-2xl mb-4">{_user.name}</p>
    <Button on:click={logout} title="logout"/>
    {:else}
    <p class="text-2xl mb-4">{_user.name}</p>
    <Button on:click={loginWithGoogle} title="Sign in with Google"/>
    {/if}
    </div>
</main>
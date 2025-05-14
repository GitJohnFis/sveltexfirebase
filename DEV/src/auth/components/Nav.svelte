<script>
import { user, loginWithGoogle } from '../components/Auth.svelte'
    </script>

    <main>
        <button on:click={loginWithGoogle}>Login with Google</button>
    </main>
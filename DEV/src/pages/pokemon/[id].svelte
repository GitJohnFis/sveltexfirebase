<script>
import { params } from '@roxi/routify/runtime/helpers';
import { userStore } from '../../store';
import { Button, Label, Loading } from '../../components';

let pokemon;
let favorites = [];

userStore.subscribe((v) => {
    if (v) {
       favorites = v.favorites; 
})
}
</script>

<div class="my-16">
    <p>{$params.id}</p>
     {#if pokemon}
     {#if pokemon.sprites}

    
    
    
    
    
    
     </div>

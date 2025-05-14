import {} from './firebase'



export function getPokemonById(id)
{
    return new Promise(async (resolve, reject)  => {
 await GET_POKEMON_BY_ID(id)
 .then((pokemon) => {
    if(pokemon) {
        resolve(pokemon)
    } else {
        resolve('No pokemon found')
    }
 })
 .catch((err) => {
    console.log(err)
    reject(err)
 })
    })
}

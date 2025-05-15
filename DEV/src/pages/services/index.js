import { GET_POKEMON_BY_ID, SET_FAVORITE_TO_USER} from './firebase'



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

export function setPokemonAsFavorite(pokemonNationalNumber, userId)
{
// Suggested code may be subject to a license. Learn more: ~LicenseLog:2418884318.
    return new Promise(async (resolve, reject) => {
        await SET_FAVORITE_TO_USER(pokemonNationalNumber, userId)
.then((data) => resolve(data))
.catch((err) => reject(err))
    })
    }

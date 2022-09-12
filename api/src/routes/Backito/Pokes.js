const router = require('express').Router()
const axios = require ('axios')
const { Router } = require('express')
const {APi_KEY} = process.env
const {Pokemon} = require('../../db')


// GET https://pokeapi.co/api/v2/pokemon
// GET https://pokeapi.co/api/v2/pokemon/{id}
// GET https://pokeapi.co/api/v2/pokemon/{name}

// GET /pokemons:
// Obtener un listado de los pokemons desde pokeapi.
// Debe devolver solo los datos necesarios para la ruta principal
router.get('/', async(req,res)=>{
    let {PokeName} = req.query
    try{
    if(!PokeName){
        const Poke = await getApiPoke()
        const PokeDB = await getDbPoke()
        const allPoke = Poke.concat(PokeDB)
        res.send(allPoke)
    }else{
        
            const apiData = await axios.get (`https://pokeapi.co/api/v2/pokemon`, {header: { 'e-api-key':`${APi_KEY}`}})
            .then((data) => console.log(data.data))
            var pokes = []
            apiData.data.forEach(el=>{
                if(el.PokeName.toLowerCase().includes(PokeName.toLowerCase())){
                    pokes.push({
                        id: el.id,
                        name: el.result.name,
                        live: el.live,
                        height: el.height,
                

                    })
                }
            })

        }
        
        
    }catch(el){

    }
    
        
    
})


// GET /pokemons/{idPokemon}:
// Obtener el detalle de un pokemon en particular
// Debe traer solo los datos pedidos en la ruta de detalle de pokemon
// Tener en cuenta que tiene que funcionar tanto para un id de un pokemon existente en pokeapi o uno creado por ustedes
//  GET /pokemons?name="...":
// Obtener el pokemon que coincida exactamente con el nombre pasado como query parameter (Puede ser de pokeapi o creado por nosotros)
// Si no existe ningún pokemon mostrar un mensaje adecuado

module.exports = router
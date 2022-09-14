const router = require('express').Router()
const axios = require ('axios')
const { Router } = require('express')
const {APi_KEY} = process.env
const {Pokemon} = require('../../db')
// GET https://pokeapi.co/api/v2/pokemon
// GET https://pokeapi.co/api/v2/pokemon/{id}
// GET https://pokeapi.co/api/v2/pokemon/{name}

//--------------------------------------------------------------------------------------------------------------

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
                        name: el.name,
                        img: el.sprites.other.dream_worl.front_defaul,
                        attack:el.stats[1].base_stat,
                        type: el.type.map((el)=>({name:el.type.name})),
                        weight:el.weight,
                   })
                }
            })
            if(pokes.length>0){
                const PokeDB = await Poke.findAll({where:{PokeName:PokeName}})
                if(PokeDB){
                    let allPoke = [...Pokes,...PokeDB]
                    return res.send(allPoke)
                }
                return res.send(Pokes)
            }else{
                const PokeDB = await Poke.findAll({where: {PokeName:PokeName}})
                if(PokeDB){
                    res.send(PokeDB)
                }
                else return res.status(404).send(`does not exist(${PokeName})`)
            }
        }
    }catch(el){
        console.log('error', el)
    }
});



const getApiPoke= async()=>{
    try{
        const apiData = await axios.get (`https://pokeapi.co/api/v2/pokemon`, {header:{'e-api-key':`${APi_KEY}`}})
        console.log (apiData) 
        const pokes = apiData.data.results.map(el=>{
            if(!el.weight.metric.includes(' ')){
                if(!el.weight.metric.includes('NaN')){
                    return{
                        id: el.id,
                        name: el.name,
                        img: el.sprites.other.dream_worl.front_defaul,
                        attack:el.stats[1].base_stat,
                        type: el.type.map((el)=>({name:el.type.name})),
                        weight:`13 - 40`
                    }
                }
            }
            else if(Number(el.weight.metric)!== NaN){
                return{
                    id: el.id,
                    name: el.name,
                    img: el.sprites.other.dream_worl.front_defaul,
                    attack:el.stats[1].base_stat,
                    type: el.type.map((el)=>({name:el.type.name})),
                    weight:`1-${el.weight.metric}`
                }
            }
         })
         return {
            id: el.id,
                    name: el.name,
                    img: el.sprites.other.dream_worl.front_defaul,
                    attack:el.stats[1].base_stat,
                    type: el.type.map((el)=>({name:el.type.name})),
                    weight:el.weight.metric
         }
    
        return pokes
    }
    catch(el){
        console.log('error',el)
    }
}
router.get('/PokeApi',async(req,res)=>{
    const pepito =await getApiPoke()
    res.send(pepito)
})





const getDbPoke = async()=>{
    try{
        const PokeDB = await Poke.findAll({
            includes:{
                model: Type,
                atributes:['name'],
                throughht:{
                    atributes:[]
                },
            }
        })
        return PokeDB
    }
    catch{
        return 'no create pokemons'
    }
}
router.get('/PokeDB',async(req,res)=>{
    const chichito = await getDbPoke()
    res.send(chichito)
})
// GET /pokemons/{idPokemon}:
// Obtener el detalle de un pokemon en particular
// Debe traer solo los datos pedidos en la ruta de detalle de pokemon
// Tener en cuenta que tiene que funcionar tanto para un id de un pokemon existente en pokeapi o uno creado por ustedes

router.get('/id', async(req,res)=>{
    let {id} = req.params
    try{
        if(id){
            const apiData = await axios.get (`https://pokeapi.co/api/v2/pokemon/{id}`,{headrs:{'e-api-key':`${API_EY}`}})

            const data = apiData.data.find(el=> el.id=== Number(id))
            if(data){
                return res.send({
                    id: el.id,
                    name: el.name,
                    img: el.sprites.other.dream_worl.front_defaul,
                    attack:el.stats[1].base_stat,
                    type: el.type.map((el)=>({name:el.type.name})),
                    weight:el.weight,
                })
            }else{
                try{
                    const result = await Poke.findOne({where: {id:id}, include: [type]})
                    if(result){
                        return res.send ({
                            id: el.id,
                            name: el.name,
                            img: el.sprites.other.dream_worl.front_defaul,
                            attack:el.stats[1].base_stat,
                            type: el.type.map((el)=>({name:el.type.name})),
                            weight:el.weight,
                        })
                    }
                }catch{}
            }
            
        }else(el)
            res.status.send(`error,${id}`)
        
    }
    catch{el}{
        res.status(404).send(el)
    }
})


//  GET /pokemons?name="...":
// Obtener el pokemon que coincida exactamente con el nombre pasado como query parameter (Puede ser de pokeapi o creado por nosotros)
// Si no existe ningún pokemon mostrar un mensaje adecuado
// POST /pokemons:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de pokemons por body
// Crea un pokemon en la base de datos relacionado con sus tipos.

module.exports = router
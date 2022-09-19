const router = require('express').Router()
const axios = require('axios')

const { APi_KEY } = process.env
const { Pokemon } = require('../../db')
// GET https://pokeapi.co/api/v2/pokemon
// GET https://pokeapi.co/api/v2/pokemon/{id}
// GET https://pokeapi.co/api/v2/pokemon/{name}
// img: sprites.other.official-artwork.front_default
/*--------------------------------------------------------------------------------------------------------------*/

// GET /pokemons:
// Obtener un listado de los pokemons desde pokeapi.
// Debe devolver solo los datos necesarios para la ruta principal
router.get('/', async (req, res) => {
    let { name } = req.query
    console.log(req.query);
    try {
        if (!name) {
            const Poke = await getApiPoke()
            const PokeDB = await getDbPoke()
            const allPoke = Poke.concat(PokeDB)
            res.send(allPoke)
        } else {
            var PokeDB = await Pokemon.findOne({ where: { name: name } })
            if (PokeDB) {
                const stats = {
                    life: PokeDB.live,
                    speed: PokeDB.speed,
                    attack: PokeDB.attack,
                    defense: PokeDB.Defense,
                }

                const pokes = {
                    id: PokeDB.id,
                    name: PokeDB.name,
                    // type: PokeDB.types,
                    img: PokeDB.img,
                    weight: PokeDB.weight,
                    height: PokeDB.height,
                    ...stats
                }
                res.send(pokes)
            } else {
                const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLocaleLowerCase()}`, { header: { 'e-api-key': `${APi_KEY}` } })
                    .then((data) => data.data)
                console.log(data.code);
                const stats = {
                    life: data?.stats.find((el) => el?.stat?.name === 'hp').base_stat,
                    speed: data?.stats.find((el) => el?.stat?.name === 'speed').base_stat,
                    attack: data?.stats.find((el) => el?.stat?.name === 'attack').base_stat,
                    defense: data?.stats.find((el) => el?.stat?.name === 'defense').base_stat,
                }
                const pokes = {
                    id: data.id,
                    name: data.name,
                    type: data.types,
                    img: data.sprites?.other['official-artwork']?.front_default,
                    weight: data.weight,
                    height: data.height,
                    ...stats
                }
                console.log(pokes);
                res.send(pokes)
            }
        }
    } catch (err) {
        console.log('error', err)
        res.status(404)
        res.send('no existe ese pokemoncito :p')
    }

});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const getApiPoke = async () => {
    try {
        const apiData = await axios.get(`https://pokeapi.co/api/v2/pokemon`, { header: { 'e-api-key': `${APi_KEY}` } })
        const pokes = apiData.data.results.map(async (el) => {
            const pokeData = await axios.get(el.url, { header: { 'e-api-key': `${APi_KEY}` } })

            return {
                id: pokeData.data.id,
                name: pokeData.data.name,
                img: pokeData.data.sprites?.other['official-artwork'].front_default,
                type: pokeData.data.types.map((type) => (type.type.name)),
                weight: pokeData.data.weight,
            }
        }
        )
        return Promise.all(pokes)
    }
    catch (pokeData) {
        console.log('error', pokeData)
    }
    console.log(pokes);

}
router.get('/PokeApi', async (req, res) => {
    const pepito = await getApiPoke()
    res.send(pepito)
})

const getDbPoke = async () => {
    try {
        const PokeDB = await Poke.findAll({
            includes: {
                model: Type,
                atributes: ['name'],
                throughht: {
                    atributes: []
                },
            }
        })
        return PokeDB
    }
    catch {
        return []
    }
}
router.get('/PokeDB', async (req, res) => {
    const chichito = await getDbPoke()
    res.send(chichito)
})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7
// GET /pokemons/{idPokemon}:
// Obtener el detalle de un pokemon en particular
// Debe traer solo los datos pedidos en la ruta de detalle de pokemon
// Tener en cuenta que tiene que funcionar tanto para un id de un pokemon existente en pokeapi o uno creado por ustedes

router.get('/:id', async (req, res) => {
    let { id } = req.params
    console.log(id);
    try {
        if (id) {
            const apiData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`, { header: { 'e-api-key': `${APi_KEY}` } })
            console.log(apiData.data);
            const data = apiData.data
            if (data) {
                return res.send({
                    id: data.id,
                    name: data.name,
                    img: data.sprites.other['official-artwork'].front_default,
                    attack: data.stats[1].base_stat,
                    type: data.types.map((type) => (type.type.name)),
                    weight: data.weight,
                })
            } else {
                try {
                    const result = await Poke.findOne({ where: { id: id }, include: [type] })
                    if (result) {
                        return res.send({
                            id: el.id,
                            name: el.name,
                            img: el.sprites.other['official-artwork'].front_default,
                            attack: el.stats[1].base_stat,
                            type: el.type.map((el) => ({ name: el.type.name })),
                            weight: el.weight,
                        })
                    }
                } catch { }
            }

        } else (el)
        res.status.send(`error,${id}`)

    }
    catch (err) {
        console.log(err);
        res.status(404).send(err)
    }
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  GET /pokemons?name="...":
// Obtener el pokemon que coincida exactamente con el nombre pasado como query parameter (Puede ser de pokeapi o creado por nosotros)
// Si no existe ningún pokemon mostrar un mensaje adecuado


router.get('/pokemons', async (req, res) => {

    try {
        if (name) {
            const apiData = await axios.get(`https://pokeapi.co/api/v2/pokemon?=${name}`, { header: { 'e-api-key': `${APi_KEY}` } })
            console.log(apiData.data);
            const data = apiData.data
            if (data) {
                return res.send({
                    // id: data.id,
                    name: data.name,
                    // img: data.sprites.other['official-artwork'].front_default,
                    // attack: data.stats[1].base_stat,
                    // type: data.types.map((type) => (type.type.name)),
                    // weight: data.weight,
                })

            } console.log(data);
            //  else {
            //     try {
            //         const result = await Poke.findOne({ where: { name: name } })
            //         if (result) {
            //             return res.send({
            //                 id: el.id,
            //                 name: el.name,
            //                 img: el.sprites.other['official-artwork'].front_default,
            //                 attack: el.stats[1].base_stat,
            //                 type: el.type.map((el) => ({ name: el.type.name })),
            //                 weight: el.weight,
            //             })
            //         }
            //     } catch { }
            // }

        } else (el)
        res.status.send(`error,${name}`)

    }
    catch (err) {
        console.log(err);
        res.status(404).send(err)
    }
})

// POST /pokemons:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de pokemons por body
// Crea un pokemon en la base de datos relacionado con sus tipos.

router.post('/', async (req, res) => {
    const {
        name,
        live,
        attack,
        defence,
        speed,
        height,
        weight,
        image,
    } = req.body
    console.log(req.body);
    let newPoke = await Pokemon.create({
        name,
        live,
        attack,
        Defense: defence,
        speed,
        height,
        weight,
        image,
    })
    let typeDB = await Type.findAll({
        where: {
            name: type,
        }
    })
    console.log(typeDB);
    newPoke.addTypes(typeDB)
    res.send('crate new pokemons')
})


module.exports = router
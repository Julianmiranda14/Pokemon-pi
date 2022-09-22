const router = require('express').Router()
const axios = require('axios')

const { Type } = require('../../db')

router.get('/', async (req, res) => {
    try {
    let typesApi = await axios.get('https://pokeapi.co/api/v2/type');
    let types = typesApi.data.results.map(p => p.name);
    //console.log('ALL TYPES: ', types);
    types.forEach(t => {
        Type.findOrCreate({
            where: { name: t }
        })
    })
    let allTypes = await Type.findAll();
   return  res.status(200).send(allTypes);
} catch(e) {
    console.log(e)
}  
});

/*
router.get('/', async (req, res) => {
    const typeAll = await Type.findAll()
    console.log(typeAll.lenght > 0)
    if (typeAll.lenght > 0) {
        res.send(typeAll)
    } else {
        try {
            const types = await axios.get(`https://pokeapi.co/api/v2/type`)

            const typeData = types
            await typeData.data.results.forEach(el => {
                Type.create({ ...el })

            })

            console.log(types.data.results)
        } catch (err) {
            res.send(err)
        }
    }
})

*/


module.exports = router
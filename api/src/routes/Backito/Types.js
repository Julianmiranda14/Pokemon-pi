const router = require('express').Router()
const axios = require ('axios')
const { where } = require('sequelize')
const {APi_KEY} = process.env
const {Type} = require('../../db')

router.get('/types',async(req,res)=>{
    const types = await axios.get(`https://pokeapi.co/api/v2/pokemon/type`, { header: { 'e-api-key': `${APi_KEY}` } })
    const typeData = await types.typeData
    typeData.results.forEach(element => {
        Type.findOrCreate({where: {name: element.name}})
        
    })
})
const typeAll = await Type.findAll()
res.send(typeAll)

module.exports=router
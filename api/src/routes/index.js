const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const PokeRouter = require ('./Backito/Pokes')
const TypesRouter = require ('./Backito/Types')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use ('/pokemons', PokeRouter)
router.use ('/types', TypesRouter)

module.exports = router;

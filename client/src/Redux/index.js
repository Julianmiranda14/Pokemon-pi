import axios from 'axios'
import { composeWithDevTools } from 'redux-devtool-extension'
import thunk from 'redux-thunk'
import rootReducer from '.../reducer'

const {
    Get_AllPokes,
    Get_Pokes_Types,
    Get_AllTypes,
    Filter_PokeName,
    Filter_Types,
    Create_Pokes,
    Create_Types,
    Order_AZ,
    Order_ZA,
    Order_Type_AZ,
    Order_Type_ZA,

} = require('../Actions/Type')

const initialState{
    pokemons[],
    allPoke[],
    types[],
    detail[],
}
export default function rootRouter(state = initialState, actions) {
    switch (action.type) {
        case 'Get_AllPokes':
            return {
                ...state,
                pokemons: actions.payload,
                GetAllPokes: actions.payload,
            }
        case 'Get_AllTypes':
            return {
                ...state,
                types: action.payload,
            }

        case 'Filter_PokeName':
            const pokeName = sate.pokeName
            const fil = action.payload === 'created' ? allPoke.filter(e => e.createdInDb) : pokeName.filter(e => !e.createdInDb)
            return {
                ...sate,
                pokemons: actions.payload === 'All' ? sate.allPoke : filter
            }
        case 'Filter_Type':
            const filterType = state.allPoke
            const type = action.payload === 'ALL' ? filterType((pokemons) => pokemons.type.length > 0) : filterType.filter((pokemons) => pokemons.type && pokemons.type.map((type) => type.name.include(action.payload)))
            return {
                ...state,
                pokemons: type,
            }
        case 'Create_Pokes':
            
    }






import axios from 'axios'

const {
    Get_AllPokes,
    Get_Pokes_Types,
    Get_AllTypes,
    Find_PokeName,
    Filter_Types,
    Create_Pokes,
    Create_Types,
    Order_AZ,
    Order_ZA,
    Order_Type_AZ,
    Order_Type_ZA,
    Types_BD,
    Types_API,
    SET_PAGE
} = require ('../Actions/Type')

export function GetAllPokes(){
    return async function (dispach){
        try{
            const result = await axios.get(`https://localhost:3001/pokemons`)
            return dispach({
                type: Get_AllPokes,
                payload: result.data
            })
        }
        catch(err){}
    }
};

export function GetPokesTypes (id){
    return async function(dispach){
        try{
            const result = await axios.get(`https://localhost:3001/pokemons/${id}`)
            return dispach({
                type: Get_Pokes_Types,
                payload: result.data
            })
        }
        catch(err){}
    }
};

export function GetAllTypes(){
    return async function(dispach){
        try{
            const result = await axios.get(`https://localhost:3001/type`)
            return dispach({
                type:Get_AllTypes,
                payload: result.data,
            })
        }catch(err){}
    }
};

export function FindPokeName(name){
    return async function(dispach){
        try{
            const result = await axios.get(`https://localhost:3001/pokemons?name=${name}`)
            return dispach({
                type:Find_PokeName,
                payload: result.data,
            })
        }catch(err){}
    }
};

export function FilterTypes(){
    return async function(dispach){
        try{
            const result = await axios.get (`https://localhost:3001/type`)
            return dispach({
                type: Filter_Types,
                payload: result.data
            })
        }catch(err){}
    }
};

export function CreateTypes(){
    return async function(dispach){
        try{
            const result = await axios.get (`https://localhost:3001/type`)
            return dispach({
                type: Create_Types,
                payload: result.data
            })
        }catch(err){}
    }
};

let id = 0;
export function CreatePokes(valor){
    return {
        type: Create_Pokes,
        payload:{
            ...valor,
            id: ++id
        }
    }
};

export function OrderAZ(){
    return{
        type:Order_AZ,
    }
};

export function OrderZA(){
    return{
        type:Order_ZA,
    }
};

export function OrderTypeAZ(){
    return{
        type:Order_Type_AZ,
    }
};

export function OrderTypeZA(){
    return{
        type:Order_Type_ZA,
    }
};

export function TypesBD(){
    return async function(dispach){
        const result = await axios.get (`https://localhost:3001/pokemons/pokeDB`)
        return dispach({
            type: Types_BD,
            payload: result.data,
        })
}
};
export function TypesAPI(){
    return async function(dispach){
        const result = await axios.get (`https://localhost:3001/pokemons/typeAPI`)
        return dispach({
            type:Types_API,
            payload: result.data
        })
    }
}
// SET_PAGE


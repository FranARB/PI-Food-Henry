const axios = require('axios');

const GET_RECIPES = 'GET_RECIPES';
const FILTER_BY_DIET = 'FILTER_BY_DIET';
const ORDER_BY_NAME = 'ORDER_BY_NAME';
const ORDER_POINTS = 'ORDER_POINTS';
const GET_NAME = 'GET_NAME';
const GET_ID = 'GET_ID';
const GET_DIETS = 'GET_DIETS';

export function getRecipes(){
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/recipes`)
        return dispatch({
            type: GET_RECIPES,
            payload: json.data
        })
    }
}
export function filterDiet(payload){
    return {
        type: FILTER_BY_DIET,
        payload
    }
}

export function orderName(payload){
    return {
         type: ORDER_BY_NAME,
         payload
    }
}



export function orderPoint(payload){
    return {
        type: ORDER_POINTS,
        payload
    }
}

export function getName(name){
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/recipes?name=${name}`)
        return dispatch({
            type: GET_NAME,
            payload: json.data
        })
    }
}

export function getID(id){
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/recipes/${id}`)
        return dispatch({
            type: GET_ID,
            payload: json.data
        })
    }
}

export function getDiets(){
    return async function (dispatch){
        var json = await axios.get(`http://localhost:3001/diets`)
        console.log(json.data)
        return dispatch({
            type: GET_DIETS,
            payload: json.data
        })
    }
}

export function postRecipes(payload){
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/recipe`, payload)
        return json;
    }
}

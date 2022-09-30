const axios = require('axios');
const { Recipe, Diet } = require('../db');
const { sequelize } = require('sequelize');
// const Diet = require('../models/Diet');
const apiKey = process.env.API_KEY;

//obtención de la info de la receta en API

// const GinfoApi = async() =>{
//     const apiURL = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=100&addRecipeInformation=true`);  //llamada de receta, con su info en un listado de 100
//     const IApi = await apiURL.data.results.map(e =>{
//         return{
//             id: e.id, 
//              title: e.title,
//              img: e.image,
//              typeDiets: e.diets.map((d)=> {return{name:d}}), // un array con los tipos de dieta de esa receta
//              spoonacularScore : e.spoonacularScore,   // puntuacion
//              dishTypes: e.dishTypes.map((d)=> {return{name:d}}), // tipo de plato
//              summary: e.summary,            // un resumen del plato
//              healthScore: e.healthScore,    // que tan saludable es
//              analyzedInstructions: e.analyzedInstructions// el paso a paso de como se hace 
//         }
//     })
//     return IApi;
// }











//obtención de la info de la DB


const getAllRecipes = async () => {
    // const recipeFromapi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=100&addRecipeInformation=true`);

    const recipeFromapi = await axios.get(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`)

    const recipeFromDB = await Recipe.findAll({include: {
        model: Diet,
        required: true
    }})

    

    // console.log(recipeFromapi.data.results)
        const recipesAandDB = [...recipeFromapi.data.results, ...recipeFromDB];
    return recipesAandDB;
}

const detailById = async (id) => {
    // const detailID = await axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`)

    // console.log(detailID.data)

    // // const deTtailid = detailID.data.results.map((e) => {
    // //     return{
    // //         id: e.id,
    // //         title: e.title,
    // //     summary: e.summary,
    // //     analyzardInstruction: e.analyzardInstruction,
    // //     helthScore: e.helthScore,
    // //     image: e.image,
    // //     dishTypes: e.dishTypes,
    // //     diets: [e.diets],
    // //     }
    // // })
    // // console.log(deTtailid)
    // // const mealFound = deTtailid.find((e) => e.id === Number(id));
    // // console.log(mealFound);
    // // if(!mealFound){
    // //     throw new Error('Recipe not found')
    // // }
    // // return mealFound;

    // const detObj = {
    //     id: detailID.data.id,
    //     title: detailID.data.title,
    //     summary: detailID.data.summary,
    //     analyzedInstructions: detailID.data.analyzedInstructions,
    //     healthScore: detailID.data.healthScore,
    //     image: detailID.data.image,
    //     dishTypes: detailID.data.dishTypes,
    //     diets: [detailID.data.diets],
    // };

    // // const rrDB = await 

    // // const detObjAaDB={...detObj}

    // return detObj;

    const allrecADB = await getAllRecipes();
        
    const detailID = allrecADB.find(r => r.id.toString() === id)
        console.log(detailID)

    return detailID;

}

const createRecipe = async (
    title,
    summary,
    analyzedInstructions,
    healthScore,
    image,
    dishTypes,
    diets
) => {
    const newRecipe = await Recipe.create({
        title,
        summary,
        analyzedInstructions,
        healthScore,
        image,
        dishTypes,
        diets
    })



    let dietTypeDb = await Diet.findAll({ where:{ name:diets } })
    newRecipe.addDiet(dietTypeDb)


    // console.log(newRecipe)
    return newRecipe
}


// const GDBInfo = async () => {            
//     return await Recipe.findAll({
//         include : {
//             model : Diet,
//             attributes : ['name'],      
//             through: {
//                 attributes:[]
//             }
//         }
//     })
// }



module.exports = {
    // GAllRecipes,
    // GDBInfo,
    // GinfoApi,
    // GEveryRecipe,
    getAllRecipes,
    createRecipe,
    detailById
}
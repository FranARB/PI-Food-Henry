const { Router } = require('express');
const { Recipe, Diet } = require('../db')
const { getAllRecipes, createRecipe, detailById } = require('../controllers/getRecipes');
const { dbDiets } = require('../controllers/diets');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// const  recipes = require('./recipes');
// const  recipe = require ('./recipe');
// const  types = require ('./types');


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// Router.use('/recipes', recipes);
// Router.use('/recipe', recipe);
// Router.use('/types', types);


router.get('/recipes', async (req, res) => {
    const {name} = req.query;
    if(name){
        res.send(await getAllRecipes(name))
    }else{
        res.send(await getAllRecipes())
    }
})

router.get('/recipes/:id', async (req, res) => {
    const { id } = req.params;

    try{
        res.send(await detailById(id))
    }catch(e){
        console.log(e)
    }

})

router.post('/recipes', async (req, res) => {

    const { title,
        summary,
        analyzedInstructions,
        healthScore,
        image,
        dishTypes,
        diets } = req.body
    // console.log(req.body)

    try {
        let reciperecibido = await createRecipe(title,
            summary,
            analyzedInstructions,
            healthScore,
            image,
            dishTypes,
            diets)
        // console.log(reciperecibido);
        res.send(reciperecibido)


    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

router.get('/diets', async (req, res) => {
    const tTier = dbDiets(); 
    tTier.forEach(async(e) => {
         await Diet.findOrCreate({where: {name: e.name}})
        })
        const tt = await Diet.findAll();
       const tt2 = tt.map(e => e.name)
    res.send(tt2)
})

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Recipe.destroy({
      where: {
        id
      }
    })
      .then(() => {
        res.send('Recipe deleted');
      })
      .catch((error) => {
        next(error);
      });
  });


module.exports = router;

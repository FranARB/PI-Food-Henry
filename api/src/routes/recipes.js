const { Router } = require('express');
const router = Router();
const axios = require('axios');
const {getAllRecipes, getAallRecipes} = require('../controllers/getRecipes')
const{Recipe,TypeDiet} = require('../db')


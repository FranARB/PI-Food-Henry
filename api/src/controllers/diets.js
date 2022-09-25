const { default: axios } = require("axios");
const { get } = require("../routes");


const dbDiets = () =>{
	const diets = [{ name: 'gluten free' }, { name: 'ketogenic' }, { name: 'vegetarian' }, { name: 'lacto-vegetarian' },
	{ name: 'lacto ovo vegetarian' }, { name: 'vegan' }, { name: 'pescatarian' }, { name: 'paleolithic' }, { name: 'primal' },
	{ name: 'whole 30' }];

	return diets;
}

	module.exports = {
		dbDiets
	};




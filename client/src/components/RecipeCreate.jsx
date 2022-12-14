import React from "react";
import { Link } from "react-router-dom";
import { getDiets, getRecipes, postRecipes } from "../actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styles from './CSS/RecipeCreate.module.css'


function CreationForm(input) {
    const register = new RegExp('^[0-9]+$');

    let error = {};

    if (!input.tittle) error.tittle = 'Introduce a tittle for your meal'
    if (!input.summary) error.summary = 'Introduce a summary for your meal'
    // if (!input.spoonacularScore < 0 || !input.spoonacularScore > 100 || !register.test(input.spoonacularScore)) error.spoonacularScore = 'puntuation between 0 - 100'
    if (!input.healthScore < 0 || !input.healthScore > 100 || !register.test(input.healthScore)) error.healthScore = 'healthScore between 0-100'
    return error
}

export default function CreateRecipe() {
    const dispatch = useDispatch()
    let dietList = useSelector((state) => state.diets)
    console.log('esto es diet', dietList);
    const [errors, setErrors] = useState({})      // este estado local es para, las validaciones(del formulario controlado)
    const [input, setInput] = useState({
        title: '',
        summary: '',
        analyzedInstructions: '',
        healthScore: '',
        image: '',
        dishTypes: '',
        diets: []
    })
    // console.log(input);
    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch])


    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(CreationForm({
            ...input,
            [e.target.name]: e.target.value    // me copio todo lo que venga del formulario , en el caso de que en alguno
        }))                               // no cumpla con las validaciones, se va a poner un texto advirtiendo
    }
    function handleSelect(e) {      //recetas
        setInput({
            ...input,
            diets: [...input.diets, e.target.value]
        })
    }
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postRecipes(input))
        alert('Congratulations you created a new recipe!')
        setInput({
            title: '',
            summary: '',
            analyzedInstructions: '',
            healthScore: '',
            image: '',
            dishTypes: '',
            diets: []
        })
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (!input.name) {
    //       alert('Please enter a name');
    //     } else {
    //       dispatch(
    //         createRecipePost({
    //           ...input,
    //           steps: [{ number: '', step: input.steps }]
    //         })
    //       );
    //     }
    //     alert('Recipe created');
    //     history.push('/home');
    //   }


    function handleDelete(e) {
        setInput({
            ...input,
            diets: input.diets.filter(diet => diet !== e)
        }) //este es para borrar algun tipe diet que haya elegido, va a creat un nuevo array con todos los que no sean
    }//    el elemento que le hice click

    return (
        <div className={styles.bkg}>
            <div className={styles.container}>
                <Link to='/home' ><button className={styles.btn}>Back to the main page</button></Link>
                {/* <h1 className={styles.h1}>Create your recipe</h1> */}
                <form onSubmit={(e) => { handleSubmit(e) }} className={styles.form}>
                    <div>
                        <label>name:</label>
                        <input
                            type='text'
                            name='title'
                            value={input.title}
                            onChange={(e) => { handleChange(e) }}
                        />
                        {errors.title && (
                            <p className={styles.error}>{errors.title}</p>
                        )}
                    </div>
                    <div>
                        <label>summary:</label>
                        <input
                            type='text'
                            name='summary'
                            value={input.summary}
                            onChange={(e) => { handleChange(e) }}
                        />
                        {errors.summary && (
                            <p className={styles.error}>{errors.summary}</p>
                        )}
                    </div>
                    <div>
                        <label>Image:</label>
                        <input
                            type='text'
                            name='image'
                            value={input.image}
                            onChange={(e) => { handleChange(e) }}
                        />
                        {errors.image && (
                            <p className={styles.error}>{errors.image}</p>
                        )}
                    </div>
                    <div>
                        <label>DishTypes:</label>
                        <input
                            type='text'
                            name='dishTypes'
                            value={input.dishTypes}
                            onChange={(e) => { handleChange(e) }}
                            placeholder="Type of dish ex: 'Main Dish'"
                        />
                        {errors.image && (
                            <p className={styles.error}>{errors.dishTypes}</p>
                        )}
                    </div>
                    <div>
                        <label>healthScore:</label>
                        <input
                            type='number'
                            name='healthScore'
                            value={input.healthScore}
                            placeholder="numbers between 0 - 100"
                            onChange={(e) => { handleChange(e) }}
                        />
                        {errors.healthScore && (
                            <p className={styles.error}>{errors.healthScore}</p>
                        )}
                    </div>
                    <div>
                        <label>step by step:</label>
                        <input
                            type='text'
                            name='analyzedInstructions'
                            value={input.analyzedInstructions}
                            placeholder="Steps of recipe - 5 character or longer"
                            onChange={(e) => { handleChange(e) }}
                        />
                    </div>
                    <select onChange={(e) => handleSelect(e)} className={styles.select} >
                        {dietList?.map((t) => {

                            return <option value={t}> {t} </option>

                        })}

                    </select >
                    {errors.hasOwnProperty('title') || errors.hasOwnProperty('summary') || errors.hasOwnProperty('healthScore') ? <p className={styles.adv}> please complete all the inputs to create your recipe</p> : <button type='submit' className={styles.correct}> Create Recipe</button>}

                </form>

                {input.diets.map(e => {
                    return (
                        <div >
                            <h5 className={styles.types}>{e}</h5>
                            <button className={styles.btnx} onClick={() => handleDelete(e)}>X</button>

                        </div>
                    )
                })}
            </div>
        </div>
    )

}
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipes, filterDiet, orderName, orderPoint, getName} from "../actions";
import Card from './Card'
import Paginado from './Paging'
import styles from './CSS/Home.module.css'


export default function Home() {
    const dispatch = useDispatch();
    const allRec = useSelector((state) => state.recipes)    //mapStateToProps de otra forma


    //paginado en home


    const [search, setSearch] = useState('')                        //|
    const [orderN, setOrderN] = useState('')                        //|
    const [order, setOrder] = useState('')                          //|
    const [currentPage, setCurrentPage] = useState(1)               //| Paginado
    const [recipesPerPage, setRecipesPerPage] = useState(9)         //|
    const indexLRecip = currentPage * recipesPerPage;               //|
    const indexFRecip = indexLRecip - recipesPerPage;               //|
    const currentRecip = allRec.slice(indexFRecip, indexLRecip)     //|

    const paging = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getRecipes())          //hook del matchDispatchtoProps()
    }, [dispatch])

    function handleOnClick(e) {
        e.preventDefault();
        dispatch(getRecipes());         //recipes with no filters
    }


    function handleFilterDiets(e) {
        dispatch(filterDiet(e.target.value))
    }

    // function handleFilterRecipes(e) {
    //     dispatch(filterRecipe(e.target.value))
    // }

    function handleSort(e) {
        e.preventDefault()
        dispatch(orderName(e.target.value))
        setCurrentPage(1)
        setOrderN(`Ordenado ${e.target.value}`)
    }

    function handlePoints(e) {
        e.preventDefault()
        dispatch(orderPoint(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`)
    }

    function handleSubmit(e) {
        e.preventDefault(e);
        dispatch(getName(search))
        setSearch('')
    }

    function handleInputName(e) {
        setSearch(e.target.value)
    }


    return (

        <div className={styles.bkg}>
            <div className={styles.search}>
                <form onSubmit={(e) => { handleSubmit(e) }}> {/* este es para hacer enter y que funcione */}

                    <input type='text' placeholder='search...' value={search} onChange={(e) => { handleInputName(e) }} className={styles.input}></input>
                    <button type='submit' className={styles.btnsearch}>search</button>
                </form>

            </div>
            <div className={styles.filterC}>
                <Link to='/recipe'> <button className={styles.create}>Create Recipe </button></Link>

                <button onClick={e => handleOnClick(e)} className={styles.refresh}> Refresh Recipes</button>


                <div className={styles.filt}>

                    <select onChange={e => handleSort(e)} className={styles.select}>
                        <option value="All">choose your order</option>
                        <option value="asc">ascendent(A-Z)</option>
                        <option value="des">descendent(Z-A)</option>
                    </select>
                </div>
                <div>
                    <select onChange={e => handlePoints(e)} className={styles.select}>
                        <option value="All">choose your order</option>
                        <option value="mayormenor">major to minor by health</option>
                        <option value="menormayor">minor to major by health</option>
                    </select>
                </div>
                <div>
                    <select onChange={e => handleFilterDiets(e)} className={styles.select}>
                        <option value="All">All recipes</option>
                        <option value="gluten free">Gluten Free</option>
                        <option value="ketogenic">Ketogenic</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="lacto-vegetarian">Lacto-Vegetarian</option>
                        <option value="lacto ovo vegetarian">Ovo-Vegetarian</option>
                        <option value="vegan">Vegan</option>
                        <option value="pescatarian">Pescatarian</option>
                        <option value="paleolithic">Paleolithic</option>
                        <option value="primal">Primal</option>
                        <option value="whole 30">Whole 30</option>
                    </select>
                </div>
                {/* <div>
                    <select onChange={e => handleFilterRecipes(e)} className={styles.select}>
                        <option value="All">Recipes</option>
                        <option value="api">Existing</option>
                        <option value="Database">Created</option>
                    </select>
                </div> */}
            </div>

            <div className={styles.paging}>
                <Paginado
                    recipesPerPage={recipesPerPage}
                    allRec={allRec.length}
                    paging={paging}
                />
            </div>

            <div className={styles.cards}>
                {
                    currentRecip && currentRecip.map(e => {
                        return (
                            <Link to={'/recipes/' + e.id}>
                                <Card title={e.title} image={e.image}
                                    healthScore={e.healthScore}
                                    diets={e.diets}
                                    key={e.id} />
                            </Link>
                        )
                    })
                }
            </div>

        </div>

    )
}


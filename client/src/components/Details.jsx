import React from "react";
import {getID} from '../actions/index.js'
import { useParams } from "react-router";
import {  useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from './CSS/Details.module.css'

export default function Detail(props){
    const {id} = useParams();
    const disp = useDispatch();
    useEffect(() => {disp(getID(id))}, [id])
    const dState = useSelector((state) => state.details)
    console.log('Estos son los detalles', dState)

    return (
        <div>
         
       { 
         dState.id? 
         
         <div className={styles.dt}> 
             <Link to='/home'><button className={styles.btn}>Back to main Page </button> </Link>
             <h1 className={styles.title}> {dState.title} </h1>
             <img className={styles.image} src={dState.image ? dState.image :'https://st.depositphotos.com/1036708/2191/i/600/depositphotos_21918797-stock-photo-knife-and-fork-with-plate.jpg'}/>
             <h3 className={styles.typ}>Type Diet: {dState.Diets?.map(t => t.name)}</h3>
             <h4 className={styles.typ}>Dish Type: {dState.dishTypes ? dState.dishTypes.map(d => d.name) :'dish type not found'  }</h4>
             <h5 className={styles.typ}>summary: {dState.summary}</h5>
             <h5 className={styles.typ}>healthScore: {dState.healthScore}</h5>
             <h5 className={styles.typ}>puntutation: {dState.spoonacularScore}</h5>
             <h5 className={styles.typ}>steps:{ Array.isArray(dState.analyzedInstructions) ? dState.analyzedInstructions.map(e => e.steps.map(f => f.step)) : dState.analyzedInstructions }</h5>
         </div> : 
         
         <div> <h2> loading... </h2> </div>
  
      }
          </div>
      )
}
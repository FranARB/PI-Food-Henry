import React from "react";
import {getID, getRecipes} from '../actions/index.js'
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
    // console.log('Estos son los detalles', dState)

    const stepss =  Array.isArray(dState.analyzctedInstruions) ? dState.analyzedInstructions.map(e => e.steps.map(f => f.step)) : dState.analyzedInstructions
    // const score = dState.weightWatcherSmartPoints
    // stepss = stepss[0]
    // if(stepss) console.log(stepss[0].steps)

    // console.log(score)
   

    return (
        <div>
         
       { 
         dState.id? 
        
         <div className={styles.dt}> 
            <Link to='/home'><button className={styles.btn}>Back to main Page </button> </Link>
             <img className={styles.image} src={dState.image ? dState.image :'https://st.depositphotos.com/1036708/2191/i/600/depositphotos_21918797-stock-photo-knife-and-fork-with-plate.jpg'}/>
             <h1 className={styles.title}> {dState.title} </h1>
             <h3 className={styles.typ2}>Type Diet: { dState.diets.length && dState.diets[0].join(", ")}</h3>
             <h4 className={styles.typ2}>Dish Type: {dState.dishTypes.length && dState.dishTypes.join(", ") }</h4>
             <h5 className={styles.typ2}>healthScore: {dState.healthScore}</h5>
             <h5 className={styles.typ}>summary: {dState.summary.replace(/<[^>]*>?/g, "")}</h5>
             <h5 className={styles.typ}>steps: <div className={styles.steps}>{ stepss && stepss[0].steps.map(e => <span>paso {e.number}: {e.step}</span>)}</div></h5>
         </div> : 
         
         <div> <h2 className={styles.back}> loading... </h2> </div>
  
      }
          </div>
      )
}
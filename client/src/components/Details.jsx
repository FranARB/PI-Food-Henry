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
    console.log('Estos son los detalles', dState)


    // const stepss =  Array.isArray(dState.analyzedInstructions) ? dState.analyzedInstructions.map(e => e.steps.map(f => f.step)) : dState.analyzedInstructions

    
    const stepss = Array.isArray(dState.analyzedInstructions) ? dState.analyzedInstructions[0].steps.map(e => {return{number:e.number, step: e.step}}) : [dState.analyzedInstructions] 

    console.log("Esto son los stepss",stepss)

    const stateDiet = Array.isArray(dState.diets) ? dState.diets.map((e) =>{return e.name}) : dState.diets
    console.log("aca estan los diets", stateDiet)
    // const typeDiets = Array.isArray(dState.diets) ? dState.diets.length
    //    console.log(dState.dishTypes)

    // stateDiet.length && stateDiet.join(", ")
    //stepss.number && stepss.step ? stepss && stepss.map(e => <span>paso {e.number} : {e.step}</span>) : <span>{stepss}</span>
    
    return (
        <div>
         
       { 
         dState.id? 
        
         <div className={styles.dt}> 
            <Link to='/home'><button className={styles.btn}>Back to main Page </button> </Link>
             <img className={styles.image} src={dState.image ? dState.image :'https://st.depositphotos.com/1036708/2191/i/600/depositphotos_21918797-stock-photo-knife-and-fork-with-plate.jpg'}/>
             <h1 className={styles.title}> {dState.title} </h1>
             <h3 className={styles.typ2}>Type Diet: { typeof stateDiet[0] === 'string' ? <span>{stateDiet.length && stateDiet.join(", ")}</span> :  <span>{dState.diets.length && dState.diets.join(', ')}</span> }</h3>
             <h4 className={styles.typ2}>Dish Type: {dState.dishTypes.length && dState.dishTypes }</h4>
             <h5 className={styles.typ2}>healthScore: {dState.healthScore}</h5>
             <h5 className={styles.typ}>summary: {dState.summary.replace(/<[^>]*>?/g, "")}</h5>
             <h5 className={styles.typ}>steps: <div className={styles.steps}>{ typeof stepss[0] === 'string' ? <span>{stepss}</span> : stepss && stepss.map(e => <span>paso {e.number} : {e.step}</span>)  }</div></h5>
         </div> : 
         
         <div> <h2 className={styles.back}> loading... </h2> </div>
  
      }
          </div>
      )
}
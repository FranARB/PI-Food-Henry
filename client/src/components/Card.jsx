import React from "react";
import style from './CSS/Card.module.css'
import img from '../pictures/PimageCard.jpg'
export default function Card ({title, image, diets, id, healthScore}){

    
    if(typeof id === 'string'){
        diets = diets.map((e) => e.name)
        console.log(diets)
    }

    const typeDiet =  Array.isArray(diets) ? diets.map((e) =>{return e.name}) : diets

    return (
        <div key={id} className={style.card}>
        <div className={style.cd}>
        <img className={style.carding} src={image? image: img} alt="img not found" width='200px' height='250px'/>
        <h3 className={style.ti}> {title} </h3>
        <div className={style.types}>  {typeof typeDiet[0] === 'string' ? <span>{typeDiet.join(', ')}</span> : diets.join(', ')}  </div>
        <h4 className={style.types}>Health score: {healthScore}</h4>
        </div>
        </div>

    )
}

//arreglar el ternario
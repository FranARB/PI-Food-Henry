import React from "react";
import style from './CSS/Card.module.css'
export default function Card ({title, image, diets, id, healthScore}){

    


    return (
        <div key={id} className={style.card}>
        <div className={style.cd}>
        <img className={style.carding} src={image? image:`https://image.freepik.com/foto-gratis/tabla-picar-rodeada-verduras-huevos-granos-arroz-escritorio_23-2148062361.jpg`} alt="img not found" width='200px' height='250px'/>
        <h3 className={style.ti}> {title} </h3>
        <div className={style.types}>  {diets.join(', ')}  </div>
        <h4 className={style.types}>Health score: {healthScore}</h4>
        </div>
        </div>

    )
}
import React from "react";
import style from './CSS/Card.module.css'
export default function Card ({tittle, image, Diets, id}){
    return (
        <div key={id} className={style.card}>
        <div className={style.cd}>
        <h3>{tittle}</h3>
        <img className={style.carding} src={image? image:`https://image.freepik.com/foto-gratis/tabla-picar-rodeada-verduras-huevos-granos-arroz-escritorio_23-2148062361.jpg`} alt="img not found" width='200px' height='250px'/>
        <div className={style.types}> {Diets && Diets.map(t => <h5> {t.name} </h5>)}</div>
        </div>
        </div>

    )
}
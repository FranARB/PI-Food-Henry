import React from "react";
import styles from './CSS/Paging.module.css'


export default function Paging({recipesPerPage, allRec, paging }){
        const pageN = []


        //Math.ceil me devuelve el entero mayor a un número dado | making the number of the page increase
        for(let i =0; i<Math.ceil(allRec/recipesPerPage);i++){
            pageN.push(i+1);
        } 
        return(
            <nav  >
        <ul className={styles.ul} >
            {
                pageN && pageN.map(n => (
                    <li key={n}  >
                    <a key={n} className={styles.ul} onClick= {() => paging(n)} >{n}</a>
                    </li>
                ))
            }
        </ul>
    </nav>
        )
}

import {hide,show,setText} from './utils/util.js';



//get all the elements
const inputEl=document.getElementById("textInput");
const buttonEl=document.getElementById("search");
const resultEl=document.getElementById("results");
const errorEl=document.getElementById("error");
const loaderEl=document.getElementById("loader");

//add event listener
buttonEl.addEventListener('click',serveRecipe);


async function serveRecipe(){
    //get the text
    const query=inputEl.value;
//check if the text is valid,
    if(!query){
        alert("Type the food!");
        return;
    }

show(loaderEl);

//call the api using the query endpoint
try{
    const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);

    const mealData= await data.json();
 

    if(!mealData.meals){
        setText(errorEl,"No Data available!");
        return;
        
    }
}
catch(error){
    setText(errorEl,error.message);
}
finally{
    hide(loaderEl);
}

}

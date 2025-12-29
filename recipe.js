//get the elements
const mealEl=document.getElementById("meal");
const instrucEl=document.getElementById("instructions");

//get the text from localeStorage
let meal=localStorage.getItem("meal");
let instruction=localStorage.getItem("instructions"); 

mealEl.textContent=meal;
instrucEl.textContent=instruction;
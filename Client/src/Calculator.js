import React, { Component, useState } from 'react';
import styled from "styled-components";
import { set } from 'lodash';

const Calculator = () => {

    const [entry1, setEntry1] = useState("");
    const [operator, setOperator] = useState("");
    const [entry2, setEntry2] = useState("");
    // const [selected, setSelected] = useState("");
    const [userInput, setInput] = useState();
    const [result, setResult] = useState("");
    const [searched, setSearched]  =useState(false)

const numbers = ["0" , "1" , "2" , "3" , "4" , "5" , "6" , "7" , "8" , "9" , "." ];

const operators = [ "/", "x", "-", "+"]

const input = (value) => { 

    if(operator === "" && numbers.includes(value)){
    setEntry1(entry1 + value);
    setInput(entry1 + value);
    }

    if(operators.includes(value) && entry1 != ""){
                setOperator(value);
                
    }

    if(operator != "" && numbers.includes(value) ){
        setEntry2(entry2 + value);
        setInput(entry2 + value);
        }

if(entry2 != "" && entry1 != "" && operators.includes(value)  ) {
    setOperator(value);
}

if (operator === "" && entry1 != "" && entry2 === "" && numbers.includes(value) && searched === true){
    console.log(value);
    setEntry1(value);
    setEntry2("");
    setOperator("");
    setSearched(false);
    setInput(value);
}

    if(value === "=" && operator === "+"){
        console.log(entry1, entry2);
            add(entry1, entry2);
    }

    // if(numbers.includes(value) && entry1 != "" ){
    //     setEntry2(value)
    // }


    if(value === "=" && operator === "-"){
        minus(entry1, entry2);
        // setEntry1(entry2);
}

if(value === "=" && operator === "x"){ 
    multiply(entry1, entry2);
    // setEntry1(entry2);
}

if(value === "=" && operator === "/"){
    divide(entry1, entry2);
    // setEntry1(entry2);
}
if(value === "%" && entry2 === "" && entry1 !==""){
   setResult(entry1/100);
   setInput(entry1/100);
   setEntry1(entry1/100);
   setEntry2("");
   setOperator("");
   setSearched(true);

}

if(value === "%" && entry1 != "" && entry2 != ""){
    setResult(result/100);
    // setEntry1(entry2);
    setInput(result/100);
    setEntry1(entry1/100);
    setEntry2("");
    setOperator("");
    setSearched(true);

}

 if(value==="AC"){
     setEntry2("");
     setEntry1("");
     setOperator("");
     setResult("");
     setInput("");
     setSearched(false);
 }

 if(value === "+/-" ){
   if (userInput > 1 && entry2 === "" && result === ""){
       setInput("-" + userInput);
       setEntry1("-" + entry1);
    
   }

   if (userInput < 1 && entry2 === "" && result === ""){
       setInput(userInput.substring(1));
       setEntry1(userInput.substring(1));
   }

   if (userInput > 1 && entry2 != "" && result === ""){
    setInput("-" + userInput);
    setEntry2("-" + entry2)
 
}

if (userInput < 1 && entry2 != "" && result === ""){
    setInput(userInput.substring(1));
    setEntry2(entry2.substring(1));
}
if (userInput > 1 && result != "" && searched===true){
    setInput("-" + userInput);
    setResult("-" + result);
    setEntry1("-" + result);
 
}

if (userInput < 1 && searched === true && result != ""){
    const value = userInput.toString();
    setInput(value.substring(1));
    setResult(value.substring(1));
    setEntry1(value.substring(1));
    console.log(value);
}
}

}

const add = (a,b) => {
    const aNumber = Number(a);
    const bNumber = Number(b);
  setResult(aNumber + bNumber);
  setInput(aNumber + bNumber);
  setEntry1(aNumber + bNumber);
  setEntry2("");
  setOperator("");
  console.log("entry1: "+ entry1);
  console.log("entry2: "+ entry2);
  console.log("result: "+result);
  console.log("operator: " +operator);
  setSearched(true);

}

const minus = (a,b) => {
    const aNumber = Number(a);
    const bNumber = Number(b);
  setResult(aNumber - bNumber);
  setInput(aNumber - bNumber);
  setEntry1(aNumber - bNumber);
  setEntry2("");
  setOperator("");
  setSearched(true);
}

const multiply = (a,b) => {
    const aNumber = Number(a);
    const bNumber = Number(b);
  setResult(aNumber * bNumber);
  setInput(aNumber * bNumber);
  setEntry1(aNumber * bNumber);
  setEntry2("");
  setOperator("");
  setSearched(true);

}

const divide = (a,b) => {
    const aNumber = Number(a);
    const bNumber = Number(b);
  setResult(aNumber / bNumber);
  setInput(aNumber / bNumber);
  setEntry1(aNumber / bNumber);
  setEntry2("");
  setOperator("");
  setSearched(true);

}
 

const handleClick = (event) => {

  }

// const checkType = (value) => {

// }


    return (
        <Style>
            <div id="calcBox">
      <div id="input">{ userInput}</div>
       <div id="row0">
           <p  onClick={() => input("AC")} className="button tools">AC</p>
           <p  onClick={() => input("+/-")} className="button tools">+/-</p>
           <p  onClick={() => input("%")} className="button tools">%</p>
           <p  onClick={() => input("/")} className={operator === "/" ? "button orangeSelected" : "button orange" }>/</p>
         
       </div>
       <div id="row1">
           <p onClick={() => input("7")} className="button number">7</p>
           <p  onClick={() => input("8")} className="button number">8</p>
           <p  onClick={() => input("9")} className="button number">9</p>
           <p  onClick={() => input("x")}  className={operator === "x" ? "button orangeSelected" : "button orange" }>x</p>
         
       </div>
       <div id="row2">
       <p  onClick={() => input("4")}  className="button number">4</p>
       <p  onClick={() => input("5")} className="button number">5</p>
       <p  onClick={() => input("6")} className="button number">6</p>
       <p  onClick={() => input("-")} className={operator === "-" ? "button orangeSelected" : "button orange" }>-</p>
       </div>
       <div id="row3">
       <p  onClick={() => input("1")}  className="button number">1</p>
       <p  onClick={() => input("2")}  className="button number">2</p>
       <p  onClick={() => input("3")} className="button number">3</p>
       <p  onClick={() => input("+")} className={operator === "+" ? "button orangeSelected" : "button orange" }>+</p>
       </div>
       <div id="row4">
           <p  onClick={() => input("0")} className="button button0 number">0</p>
           <p  onClick={() => input(".")}  className="button number period">.</p>
           <p  onClick={() => input("=")}  className="button orangeLast">=</p>
           </div>
           </div>
        </Style>
    )

}

const Style = styled.section`
.tools{
  background-color: #6b6b6b;
  outline: 1px solid black;
  outline-right:none;
  
}

.number{
    background-color: #999797;
    outline: 1px solid black;
    outline-top:none;
    outline-right;
}

#calcBox{
overflow: hidden;
height: 32.33vh;
border-radius: 15px;
// background-color: black;
// color:white;
}

#input{
height: 5vh;
width: 100%;
background-color: #3b3b3b;
color:white;
padding-top: 2.2vh;
    margin: 0;
    padding-left: 3%;
}

.button{
    padding: 1vh 1.8%;
    margin: 0;
    height: 3vh;
    width: 22%;
    text-align: left;
    font-size: 0.9em;
    text-align: center;
}

.orange{
    outline: black 1px solid;
    outline-bottom:0;
    background-color: #ffaa00;
    color: white;
    font-weight: 700;
}

.orangeSelected{
    outline: black 1px solid;
    outline-bottom:0;
    background-color: #ffc042;
    color: white;
    font-weight: 700;
}

.orangeLast{
    outline: black 1px solid;
    background-color: #ffaa00;
    color: white;
    font-weight: 700;

    padding: 1vh 1.8%;
    width: 21.9%;
}

.button0{
    margin: 0;
    height: 3vh;
    text-align: left;
    font-size: 0.9em;
    text-align: left;
    padding-left: 11.2%;
    width: 37.7%;
}
#row0{
    display:flex;

}
#row1{
    display:flex;

}
#row2{
    display:flex;
}
#row3{
    display:flex;
}

#row4{
    display:flex;
}

.period{
    width: 21.9%;

}


`;


export default Calculator;
import * as React from 'react';
import styles from './FirstWebPart.module.scss';
import type { IFirstWebPartProps } from './IFirstWebPartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import BasicForm from './FluentControls/BasicForm';
import DropdownFiles from './FluentControls/DropdownFiles';
import UseStateHook from '../../../Hooks/UseStateHook';
import UseEffectHook from '../../../Hooks/UseEffectHook';
import StopWatchTimer from '../../../Hooks/StopWatchtimer';
import UseCallbackHook from '../../../Hooks/UseCallbackHook';
import UseMemoHook from '../../../Hooks/UseMemoHook';
// import useDebounceExample from './UseDebounceExample';
// import useDebounceExample from '../../../Hooks/UseDebounceExample';
import UseDebounceExample from '../../../Hooks/UseDebounceExample';
// import useDebounce from '../../../Hooks/DebounceHook';
const FirstWebPart:React.FC<IFirstWebPartProps>=(props)=>{
//const -> const is constant means it is non volatile we can not update the value after declaring
//Number

const number1:number=5;
console.log(number1); //5
//way to name the varaibe. numericChar -abc1 =/ab-1 abC

//let -> it is volatile means you can update the value of let after decalring
//String
let name:string="Vijay";
console.log(name); //Vijay

name="Vijay Thapak";
console.log(name); //Vijay thapak

//Boolean
const infoGiven:boolean=true;
console.log(infoGiven);

//array
let fruits:string[]=["Apple","Mango","Banana","Grapes","Papaya"];
//Apple
//Mango
console.log(fruits);
console.log(fruits.length);
console.log(typeof(fruits));


//array
let counting:number[]=[1,2,3,4,5,6,7];
console.log(counting);

//loops 
//foreach-
console.log("****I am foreach looop*****");

fruits.forEach((items)=>{
  console.log(items);
});
//for loop
console.log("****I am for looop*****");

for(let i=0;i<fruits.length;i++){
  console.log(fruits[i]);

  //
}

//While looop
console.log("****I am While looop*****");

let i=0;
while(i<fruits.length){
  
  console.log(fruits[i]);
  i++;
}
 // do while loop
 console.log("****I am do While looop*****");
 let j=0;
 do{
 
  console.log(fruits[j]);
   j++;
 }
 while(j<fruits.length);
 const conditionstatement=()=>{
  let age:number=10;
  if(age>=18){
    console.log("you are elible to vote");
  }
  else if(age>65&&age<=100){
    console.log("You are senior citizen");
  }
  else if(age>18){
    console.log("you are not eliblge for voting")
  }
  else{
    console.log("invalid age")
  }

  switch(true){
    case (age>=18&&age<65):
      console.log("You are elibilbe to vote");
      break;

    case (age>=65&&age<=100):
      console.log("You are senior citizen");
      break;
    case (age<18):
      console.log("You are not ready for voting");
      break;
    default:
      console.log("Invalid age")
  }
  
 }
 //paramter
 const myParameter=(a:number,b:number)=>{
console.log("Addition of both number ",(a+b));
 }



return(
    <>
    <p>Hello ! world</p>
    {/* Basic form */}
    <BasicForm/>
    <DropdownFiles/>
    {/* Map function */}
    {fruits.map((items)=>{
      return <p>{items}</p>
    })}
    {/* calling fucntion */}
    {conditionstatement()}
    {/* addition */}
    {myParameter(10,20)}
    {props.context.pageContext.user.displayName}
    {props.context.pageContext.web.absoluteUrl}

    <br/>
    <UseStateHook/>
    <br/>
    <UseEffectHook/>
    <br/>
    <h2>Timer</h2>
    <StopWatchTimer/>
    <UseCallbackHook/>
    <UseMemoHook/>
    <UseDebounceExample/>
    </>
  )
}
export default FirstWebPart;

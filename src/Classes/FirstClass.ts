import { WebPartContext } from "@microsoft/sp-webpart-base";

export default class MYFirstClass{
    constructor(context:WebPartContext){
        
    }

public static async myMethod():Promise<any>{
try{
console.log("I am fine")
}
catch(err){
    console.log(err);
}
}
}
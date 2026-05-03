export interface ITypeScriptInterface{
    Name:string; //explicit decalaration
    Address:any|string; //
    Date:any|null;
    Admin?:string; // optional
    Skills:any; //implicit
    Age:number;
    Permissions:boolean;
    Managers:string[];
    //lookup
    City:{
        Title:string,
        Id:number
    }
}
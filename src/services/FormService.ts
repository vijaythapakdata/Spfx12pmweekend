import {Web} from "@pnp/sp/presets/all";
import { ListNames } from "../Enum/ListNames";
import { ISharePointColumnState } from "../models/ISharePointColumnState";

export class ServiceClassApi{
    private web;
    constructor(siteurl:string){
        this.web=Web(siteurl);
    }

    public async createFormdata(formdata:ISharePointColumnState):Promise<any>{
        try{
const listName=this.web.lists.getByTitle(ListNames.EmployeeList);
const result=await listName.items.add({
    Title:formdata.Name,
    EmailAddress:formdata.Email,
    Department:formdata.Department
});
return result;
        }
        catch(err){
console.log("Error while creating the data....");
throw err;
        }
    }
}
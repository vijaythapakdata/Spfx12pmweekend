import { Web } from "@pnp/sp/presets/all";
import { ListNames } from "../Enum/ListNames";
import { ISharePointFormState } from "../models/ISharePointColumnState";

export class ServiceApiClass{
private web;
constructor(siteurl:string){
this.web=Web(siteurl);
}

public async createItems(Formdata:ISharePointFormState):Promise<any>{
    try{
const list=this.web.lists.getByTitle(ListNames.SharePointFormList);///listnames of the sharepoint site
const result=await list.items.add({
Title:Formdata.Name,
EmailAddress:Formdata.Email,
Address:Formdata.FullAddress,
Age:parseInt(Formdata.Age),
Salary:parseFloat(Formdata.Compensation),
Permission:Formdata.Permission,
AdminId:Formdata.AdminId,
ManagerId:{results:Formdata.ManagerId},
Department:Formdata.Department,
Gender:Formdata.Gender,
CityId:Formdata.City,
Skills:{results:Formdata.Skills},
DOB:new Date(Formdata.DOB),
Score:Formdata.Experience

});
return result;
    }
    catch(err){
        console.log(err);

    }
}

public async uploadFiles(itemsId:number,Attachments:File[]):Promise<void>{
    if(!Attachments||Attachments.length===0)return;
    const list =this.web.lists.getByTitle(ListNames.SharePointFormList);
    for(const file of Attachments){
        await list.items.getById(itemsId).attachmentFiles.add(file.name,file);
    }
}
}
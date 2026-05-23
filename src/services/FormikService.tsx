import {sp} from "@pnp/sp/presets/all";
import "@pnp/sp/items";
import "@pnp/sp/lists";
import { ListNames } from "../Enum/ListNames";

export const FormikService=()=>{
    const createItems=async(body:any)=>{

        const createData=await sp.web.lists.getByTitle(ListNames.ValidationList).items.add(body);
        return createData;
    }
    return(
        {createItems}
    )
}
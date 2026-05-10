import * as React from 'react';
import { ISharePointFormState } from '../models/ISharePointColumnState';
import { IDropdownOption } from '@fluentui/react';

export const HandleMultiselectdropdown=(options:IDropdownOption,
    formdata:ISharePointFormState,
    setFormData:React.Dispatch<React.SetStateAction<ISharePointFormState>>)=>{
const selectedKey=options.selected?[...formdata.Skills,options?.key as string]
:formdata.Skills.filter((key:any)=>key!==options.key);

setFormData(prev=>({...prev,Skills:selectedKey}));

}

//[1,2,3,4]=[3,4]
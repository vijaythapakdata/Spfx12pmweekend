import * as React from 'react';
// import styles from './ProjectStructure.module.scss';
import type { IProjectStructureProps } from './IProjectStructureProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ServiceClassApi } from '../../../services/FormService';
import { ISharePointColumnState } from '../../../models/ISharePointColumnState';
import { PrimaryButton, TextField } from '@fluentui/react';
const ProjectStructure:React.FC<IProjectStructureProps>=(props)=>{
  const [formdata,setFormData]=React.useState<ISharePointColumnState>({
    Name:"",
    Email:"",
    Department:""
  });

  const createItems=async()=>{
    try{
const _service=new ServiceClassApi(props.siteurl);
const result=await _service.createFormdata(formdata);
console.log(result);
setFormData({
  Name:"",
  Email:"",
  Department:""
})
    }
    catch(err){
console.log(err);
    }
  }

      const handleChange=React.useCallback((field:string,value?:string|boolean|number)=>{
  setFormData(prev=>({...prev,[field]:value}));
      },[]);
  return(
    <>
    <TextField
            label='Name'
            value={formdata.Name}
            onChange={(_,val)=>handleChange("Name",val||"")}
            />
              <TextField
            label='Email'
            value={formdata.Email}
            onChange={(_,val)=>handleChange("Email",val||"")}
            />
              <TextField
            label='Department'
            value={formdata.Department}
            onChange={(_,val)=>handleChange("Department",val||"")}
            />
            <br/>
            <PrimaryButton
            text='Save'
            iconProps={{iconName:'save'}}
            onClick={createItems}
            />
    </>
  )
}
export default ProjectStructure;
import * as React from 'react';
import styles from './SharePointForm.module.scss';
import type { ISharePointFormProps } from './ISharePointFormProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ISharePointFormState } from '../../../models/ISharePointColumnState';
import { ServiceApiClass } from '../../../services/SharePointFormServiceApi';
import { Dialog } from '@microsoft/sp-dialog';
import { ChoiceGroup, DatePicker, Dropdown, Label, PrimaryButton, Slider, TextField, Toggle } from '@fluentui/react';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { HandleMultiSelectedPeoplePicker, HandleSingleSelectedPeoplePicker } from '../../../helpers/PeoplePickerItems';
import { HandleMultiselectdropdown } from '../../../helpers/MultiselectDropdown';
import { DateFormat, DatePickerString } from '../../../helpers/IDatePickerFormat';
import { handleAttachment } from '../../../helpers/AttachementHelpers';
const SharePointForm:React.FC<ISharePointFormProps>=(props)=>{
  const [formdata,setFormdata]=React.useState<ISharePointFormState>({
    Name:"",
    Email:"",
    FullAddress:"",
    Compensation:"",
    Age:"",
    Experience:0,
    Manager:[],
    ManagerId:[],
    Admin:"",
    AdminId:0,
    Skills:[],
    Department:"",
    Gender:"",
    City:"",
    Permission:false,
    DOB:""
  });
  const [att,setAtt]=React.useState<File[]>([]);

  const AddItems=async()=>{
    try{
const _service=new ServiceApiClass(props.siteurl);
const result=await _service.createItems(formdata);
const itemid=result.data.Id;
await _service.uploadFiles(itemid,att);
Dialog.alert("Item added successfully");
console.log("Item added",result);
setFormdata({
  Name:"",
    Email:"",
    FullAddress:"",
    Compensation:"",
    Age:"",
    Experience:0,
    Manager:[],
    ManagerId:[],
    Admin:"",
    AdminId:0,
    Skills:[],
    Department:"",
    Gender:"",
    City:"",
    Permission:false,
    DOB:""
})
    }
    catch(err){
Dialog.alert("Error");
console.log(err);
    }
  }
     const handleChange=React.useCallback((field:keyof ISharePointFormState,value:string|boolean|number)=>{
    setFormdata(prev=>({...prev,[field]:value}));
        },[]);
  return(
    <>
      <TextField
                label='Name'
                value={formdata.Name}
                onChange={(_,val)=>handleChange("Name",val||"")}
                />

                <TextField
                label='Email Address'
                value={formdata.Email}
                onChange={(_,val)=>handleChange("Email",val||"")}
                />

                <TextField
                label='Age'
                value={formdata.Age}
                onChange={(_,val)=>handleChange("Age",val||"")}
                />

                <TextField
                label='Compensation'
                value={formdata.Compensation}
                onChange={(_,val)=>handleChange("Compensation",val||"")}
                prefix='$'
                suffix='USD'
                />

<Slider
label='Experience'
value={formdata.Experience}
onChange={(val)=>handleChange("Experience",val)}
min={0}
max={40}
step={0.1}
/>

<Toggle
label="Permission"
checked={formdata.Permission}
onChange={(_,checked)=>handleChange("Permission",!!checked)}
/>
{/* Single Selected people picker */}
<PeoplePicker
    context={props.context as any}
    titleText="Admin"
    personSelectionLimit={1}
    showtooltip={true}
   ensureUser={true}
    onChange={(items)=>HandleSingleSelectedPeoplePicker(items,setFormdata)}
    principalTypes={[PrincipalType.User]}
    resolveDelay={1000} 
    defaultSelectedUsers={[formdata.Admin?formdata.Admin:""]}
    webAbsoluteUrl={props.siteurl}
    />
    {/* Multiselect people picker */}
    <PeoplePicker
    context={props.context as any}
    titleText="Manager"
    personSelectionLimit={2}
    showtooltip={true}
   ensureUser={true}
    onChange={(items)=>HandleMultiSelectedPeoplePicker(items,setFormdata)}
    principalTypes={[PrincipalType.User]}
    resolveDelay={1000} 
    defaultSelectedUsers={formdata.Manager}
    webAbsoluteUrl={props.siteurl}
    />
{/* Department */}
<Dropdown
label='Department'
options={props.departmentoptions}
placeholder='--select--'
selectedKey={formdata.Department}
onChange={(_,opt)=>handleChange("Department",opt?.key as string)}
/>
{/* City */}
<Dropdown
label='City'
options={props.cityoptions}
placeholder='--select--'
selectedKey={formdata.City}
onChange={(_,opt)=>handleChange("City",opt?.key as string)}
/>
{/* Skills */}

<Dropdown
label='Skills'
options={props.skillsoptions}
placeholder='--select--'
defaultSelectedKeys={formdata.Skills}
onChange={(_,opt)=>HandleMultiselectdropdown(opt!,formdata,setFormdata)}
multiSelect
/>
{/* date picker */}
<DatePicker
label='DOB'
strings={DatePickerString}
formatDate={DateFormat}
onSelectDate={(e)=>setFormdata(re=>({...re,DOB:e}))}
/>
{/* Gender */}
<ChoiceGroup
label='Gender'
options={props.genderoptions}

selectedKey={formdata.Gender}
onChange={(_,opt)=>handleChange("Gender",opt?.key as string)}
/>
                <TextField
                label='Full Address'
                value={formdata.FullAddress}
                onChange={(_,val)=>handleChange("FullAddress",val||"")}
                rows={5}
                multiline
                />

      <Label>Upload File</Label>
      <input
      type='file'
      title='upload file'
      multiple
      onChange={(e)=>handleAttachment(e,setAtt)}
      />
      <br/>
      <PrimaryButton
      text='Save'
      onClick={AddItems}
      iconProps={{iconName:'save'}}
      />
    </>
  )
}
export default SharePointForm;

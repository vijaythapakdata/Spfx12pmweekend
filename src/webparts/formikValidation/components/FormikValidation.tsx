import * as React from 'react';
// import styles from './FormikValidation.module.scss';
import type { IFormikValidationProps } from './IFormikValidationProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {FormikService} from '../../../services/FormikService';
import {sp} from "@pnp/sp/presets/all";
import * as Yup from "yup";
import { Formik,FormikProps } from 'formik';
import { Dialog } from '@microsoft/sp-dialog';
import { DatePicker, Dropdown, PrimaryButton, Stack, TextField } from '@fluentui/react';
import { PeoplePicker,PrincipalType } from '@pnp/spfx-controls-react/lib/PeoplePicker';
import { DateFormat, DatePickerString } from '../../../helpers/IDatePickerFormat';
const stackTokens={childrenGap:10}
const FormikValidation:React.FC<IFormikValidationProps>=(props)=>{
  const [service,setService]=React.useState<ReturnType<typeof FormikService>|null>(null);

React.useEffect(()=>{
  sp.setup({
    spfxContext:props.context as any
  });
  setService(FormikService());
},[props.context]);

//apply validation on form submit
const SignupSchema = Yup.object().shape({
name:Yup.string().required("Task Name is required"),
details:Yup.string().min(15,"minimum 15 characters are required").required("Task Details are required"),
startDate:Yup.date().required("Start Date is required"),
endDate:Yup.date().min(Yup.ref("startDate"),"End date should be greater than start date").required("End Date is required"),
projectName:Yup.string().required("Project Name is required"),
phoneNumber:Yup.string().required("Phone number is required").matches(/^[0-9]{10}$/,"Phone number must be 10 digits"),
emailAddress:Yup.string().email("Invalid email format").required("Email address is required").test(
  "Invalid =domain","Personnal email domains(hotmail.com,gmail.com,outlook.com,yahoo.com,onmicrosoft.com) are not allowed",
  (value)=>{
    if(!value) return false;
    const email=value.toLowerCase();
    //block all personnal email domains
    const blockedDomains=["hotmail.com","gmail.com","outlook.com","yahoo.com","onmicrosoft.com"];
    return !blockedDomains.some(domain=>email.endsWith(`@${domain}`));
  }
)
});

//form event handlers
const getFieldProps=(formik:FormikProps<any>,field:string)=>({
  ...formik.getFieldProps(field),errorMessage:formik.errors[field] as string
});

//create item
const addrecord=async(items:any)=>{
  try{
if(!service) return;
const item=await service.createItems({
  Title:items.name,
  TaskDetails:items.details,
  StartDate:items.startDate,
  EndDate:items.endDate,
  ProjectName:items.projectName,
  PhoneNumber:items.phoneNumber,
  EmailAddress:items.emailAddress
});

Dialog.alert("Item created successfully with ID: "+item.data.Id);
console.log("Item created with ID: ",item.data.Id);
  }
  catch(err:any){
console.error("Error creating item: ",err);
Dialog.alert("Error creating item: "+err.message);
  }
}

  return(
    <>
    <Formik
    initialValues={{
      name:"",
      details:"",
      projectName:"",
      emailAddress:"",
      phoneNumber:"",
      startDate:"",
      endDate:""
    }}
    validationSchema={SignupSchema}
    onSubmit={(value,helpers)=>{
      addrecord(value).then(()=>helpers.resetForm())
    }}
    >
      {(formik:FormikProps<any>)=>(
        <form onSubmit={formik.handleSubmit}>
<Stack tokens={stackTokens}>

<PeoplePicker
context={props.context as any}
titleText='User Name'
personSelectionLimit={1}
showtooltip={true}
disabled={true}
ensureUser={true}
principalTypes={[PrincipalType.User]}
resolveDelay={1000}
webAbsoluteUrl={props.siteurl}
defaultSelectedUsers={[props.context.pageContext.user.displayName]}
/>
<TextField
label='Task Name'
{...getFieldProps(formik,"name")}
/>
<TextField
label='Email Address'
{...getFieldProps(formik,"emailAddress")}
/>
<TextField
label='Phone Number'
{...getFieldProps(formik,"phoneNumber")}
/>
<Dropdown
label ="Project Name"
placeholder='Select Project'
options={[
  {key:"Project A",text:"Project A"},
  {key:"Project B",text:"Project B"}
]}
onChange={(_,e)=>formik.setFieldValue("projectName",e?.key as string)}
errorMessage={formik.errors.projectName as string}
/>
{/* DatePicker */}
<DatePicker
label ="Start Date"
value={formik.values.startDate}
strings={DatePickerString}
formatDate={DateFormat}
textField={{...getFieldProps(formik,"startDate")}}
onSelectDate={(date)=>formik.setFieldValue('startDate',date)}
/>
<DatePicker
label ="End Date"
value={formik.values.endDate}
strings={DatePickerString}
formatDate={DateFormat}
textField={{...getFieldProps(formik,"endDate")}}
onSelectDate={(date)=>formik.setFieldValue('endDate',date)}
/>
<TextField
label='Task Details'
{...getFieldProps(formik,"details")}
rows={5}
multiline
/>
</Stack>
<br/>
<PrimaryButton
type='submit'
text="Save"
iconProps={{iconName:'save'}}

/>&nbsp;&nbsp;&nbsp;&nbsp;
<PrimaryButton
text="Reset"
iconProps={{iconName:'refresh'}}
onClick={()=>formik.resetForm()}
/>
        </form>
      )}

    </Formik>
    </>
  )
}
export default FormikValidation;

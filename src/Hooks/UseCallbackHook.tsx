import { Slider, TextField, Toggle } from '@fluentui/react';
import * as React from 'react'
import { useState,useCallback ,useEffect} from 'react';

const UseCallbackHook:React.FC<{}>=()=>{
    const [formData,setFormData]=useState({
        Name:"",
        Email:"",
        Address:"",
        Phone:"",
        Exprience:0,
        isTrue:false
    });
    useEffect(()=>{
        console.log("useeffect is callled!!!!");
        return()=>{
            console.log("useEffect is unmounted");
        }
    },[]);

    const handleChange=useCallback((field:string,value?:string|boolean|number)=>{
setFormData(prev=>({...prev,[field]:value}));
    },[]);

    return(
        <>
        <TextField
        label='Name'
        value={formData.Name}
        onChange={(_,val)=>handleChange("Name",val||"")}
        />
          <TextField
        label='Email'
        value={formData.Email}
        onChange={(_,val)=>handleChange("Email",val||"")}
        />
          <TextField
        label='Phone'
        value={formData.Phone}
        onChange={(_,val)=>handleChange("Phone",val||"")}
        />
        {/* Experience */}
        <Slider
        label='Exprience'
        value={formData.Exprience}
        onChange={(v)=>handleChange("Experience",v)}
        />
        <Toggle
        checked={formData.isTrue}
        label="Permission"
        onChange={(_,chekced)=>handleChange("isTrue",!!chekced)}
        />
          <TextField
        label='Address'
        value={formData.Address}
        onChange={(_,val)=>handleChange("Address",val||"")}
        multiline
        rows={5}
        />
        </>
    )
}
export default UseCallbackHook
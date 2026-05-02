import { PrimaryButton, Slider, TextField } from '@fluentui/react';
import * as React from 'react';

const BasicForm:React.FC<{}>=()=>{
    return(
        <>
        <form>
            <TextField
            label='Name'
            placeholder='write your name here.'
            />
            <Slider
            label='Experience'
            min={0}
            max={100}
            step={0.1}
            />
            <br/>
            <PrimaryButton
            text='Save'
            onClick={()=>alert("Saved Successfully")}
            iconProps={{iconName:"save"}}
            />
        </form>
        </>
    )
}
export default BasicForm;
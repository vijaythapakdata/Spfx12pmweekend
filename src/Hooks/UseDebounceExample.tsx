import * as React from 'react';
import { TextField } from '@fluentui/react';
import useDebounce from './DebounceHook';
// import useDebounce from '../../../Hooks/DebounceHook';
// import useDebounce from './DebounceHook';
const UseDebounceExample :React.FC<{}>=()=>{
    const [name,setName]=React.useState<string>("");
    //calling custom hook
    const debounceValue=useDebounce(name,1000);

    return(
        <>
        <TextField
        label='Enter Name'
        value={name}
        onChange={(_,e)=>setName(e||"")}
        />
        <h3>Current value:{name}</h3>
        <h3>Debounce Value:{debounceValue}</h3>
        </>
    )
}
export default UseDebounceExample
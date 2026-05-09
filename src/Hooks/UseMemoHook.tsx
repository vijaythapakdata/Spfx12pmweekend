import { TextField } from '@fluentui/react';
import * as React from 'react';
import { useState,useMemo } from 'react';
const UseMemoHook:React.FC<{}>=()=>{
    const [name,setName]=useState<string>("");
    const greeting=useMemo(()=>{
        return `Hello , ${name}! welcome to the react hooks`

    },[name])
    return(
        <>
        <p>{greeting}</p>
        <TextField
        label='Person Name'
        value={name}
        onChange={(_,e)=>setName(e||"")}
        />
        </>
    )
}
export default UseMemoHook
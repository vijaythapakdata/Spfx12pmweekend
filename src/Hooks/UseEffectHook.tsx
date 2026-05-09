import { PrimaryButton } from '@fluentui/react';
import * as React from 'react';
import { useState,useEffect } from 'react';

const UseEffectHook:React.FC<{}>=()=>{
    const [count,setCount]=useState<number>(0)
    useEffect(()=>{
        console.log("Use Effect is called");
    },[count]);
    return(
        <>
        <p>Count:{count}</p>
        <PrimaryButton
        text='Counter'
        onClick={()=>setCount(count+1)}
        />
        </>
    )
}
export default UseEffectHook
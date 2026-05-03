import { PrimaryButton } from '@fluentui/react';
import * as React from 'react';
import { useState } from 'react';

const UseStateHook:React.FC<{}>=()=>{
    const [count,setCount]=useState<number>(0)
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
export default UseStateHook
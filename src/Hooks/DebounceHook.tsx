import * as React from 'react';
const useDebounce=(value:string,delay:number)=>{
    const[debounceValue,setdebouncevalue]=React.useState<string>(value);

    React.useEffect(()=>{
        const timer=setTimeout(()=>{
            setdebouncevalue(value);
        },delay)
return ()=>clearTimeout(timer);
    },[value,delay]);
    return debounceValue;
}
export default useDebounce;
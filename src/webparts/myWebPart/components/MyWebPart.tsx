import * as React from 'react';
import styles from './MyWebPart.module.scss';
import type { IMyWebPartProps } from './IMyWebPartProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import {useAppDispatch,useAppSelector} from '../store/hooks';
import { increment,decrement,reset,removeItem,addItem } from '../store/action';

const MyWebPart:React.FC<IMyWebPartProps>=(props)=>{
  const dispatch=useAppDispatch();
  //select state from redux
  const count=useAppSelector((state)=>state.count);
  const items=useAppSelector((state)=>state.items);
  const user=useAppSelector((state)=>state.user);

  const [inputvalue,setInputvalue]=React.useState<string>('');

  const handleAddItems=():void=>{
    if(inputvalue.trim()){
      dispatch(addItem(inputvalue.trim()));
      setInputvalue('');
    }
  }

  const handleKeyDown=(e:React.KeyboardEvent<HTMLInputElement>):void=>{
    if(e.key=='Enter'){
      handleAddItems();
    }
  };

  return(
    <>
    <div className={styles.myWebPart}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>
          hello,{props.userDisplayName||user} !🫠
        </h2>
        <p className={styles.subtitle}>
          {props.description||'SPFX webpart powebered by Redux'}
        </p>
        {props.hasTeamsContext&&(
          <span className={styles.badge}>Running in teams</span>
        )}
      </div>

      {/* Counter section */}
      <section className={styles.section} >
        <h3 className={styles.sectionTitle}>Counter</h3>
        <div className={styles.counterDisplay}>{count}</div>
        <div className={styles.buttonGroup}>
          <button className={`${styles.btn} ${styles.btnDanger}`}
          onClick={()=>dispatch(decrement())}>- Decrement</button>

           <button className={`${styles.btn} ${styles.btnDanger}`}
          onClick={()=>dispatch(reset())}>🔄️ Reset</button>

           <button className={`${styles.btn} ${styles.btnSuccess}`}
          onClick={()=>dispatch(increment())}>+ Increment</button>
        </div>


      </section>
      {/* Item list section */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Items List</h3>
        <div className={styles.inputRow}>
<input 
className={styles.input}
type="text"
value={inputvalue}
onChange={(e)=>setInputvalue(e.target.value)}
onKeyDown={handleKeyDown}
placeholder='Type an item and press enter'
/>
<button className={`${styles.btn} ${styles.btnPrimary}`}
onClick={handleAddItems}
>Add</button>

        </div>
{items.length==0?(
  <p className={styles.emptyMessage}>No items yet. Add some above!</p>
):(
  <ul
  className={styles.itemList}

  >

    {items.map((item,index)=>(
      <li key={index} className={styles.item}>
        <span className={styles.itemText}>{item}</span>
<button
className={styles.removeBtn}
onClick={()=>dispatch(removeItem(index))}
title='Remove item'
></button>
      </li>
    ))}
  </ul>
)}
<p className={styles.itemCount}>Total items:<strong>{items.length}</strong></p>
      </section>

    </div>
    </>
  )
}
export default MyWebPart;

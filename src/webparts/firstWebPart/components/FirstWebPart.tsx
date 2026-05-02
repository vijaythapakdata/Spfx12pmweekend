import * as React from 'react';
import styles from './FirstWebPart.module.scss';
import type { IFirstWebPartProps } from './IFirstWebPartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import BasicForm from './FluentControls/BasicForm';
import DropdownFiles from './FluentControls/DropdownFiles';
const FirstWebPart:React.FC<IFirstWebPartProps>=(props)=>{
  return(
    <>
    <p>Hello ! world</p>
    {/* Basic form */}
    <BasicForm/>
    <DropdownFiles/>
    </>
  )
}
export default FirstWebPart;

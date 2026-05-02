import { ChoiceGroup, Dropdown } from '@fluentui/react';
import * as React from 'react';

const DropdownFiles:React.FC<{}>=()=>{
    return(
        <>
        {/* Single Selected dropdwon */}
        <Dropdown
        label='Department'
        options={[
            {key:'IT',text:'IT'},
            {key:'HR',text:'HR'}
        ]}
        placeholder='--select--'
        />
        {/* Multiselect */}
        <Dropdown
        label='Cities'
        options={[
            {key:'Delhi',text:'Delhi'},
            {key:'Pune',text:'Pune'}
        ]}
        multiSelect
        placeholder='--select--'
        />
        {/* Radio button */}
        <ChoiceGroup
        label='Gender'
        options={
            [
                {key:'Male',text:'Male'},
                {key:'Female',text:'Female'}
            ]
        }
        />
        </>
    )
}
export default DropdownFiles
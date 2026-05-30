import * as React from 'react';
// import styles from './GetAlluserS.module.scss';
import type { IGetAlluserSProps } from './IGetAlluserSProps';
import { IUserInfo } from '../../../models/ISharePointColumnState';
import { DetailsList, PrimaryButton, SearchBox, Spinner } from '@fluentui/react';

const GetAlluserS:React.FC<IGetAlluserSProps>=(props)=>{
  const [users,setUsers]=React.useState<IUserInfo[]>([]);
  const [searchText,setSearchText]=React.useState<string>('');
  const [nextLink,setNextLink]=React.useState<string|null>('');
  const [loading,setLoading]=React.useState<boolean>(false);

  const getUserS=React.useCallback(async(url?:string)=>{
setLoading(false);
const client=await props.graphClient.getClient('3');
const response=url? await client.api(url).get():await client.api("/users")
.version("v1.0").select("id,displayName,mail,department,jobTitle").top(5).get();

const list:IUserInfo[]=response.value.map((u:any)=>({
  id:u.id,
  displayName:u.displayName,
  mail:u.mail,
  department:u.department,
  jobTitle:u.jobTitle
}));
setUsers(list);
setNextLink(response['@odata.nextLink']||null);
setLoading(false);
  },[]); 

  const nextpage=()=>{
    if(nextLink) getUserS(nextLink);
  }

  const filteredItems=users.filter((items:any)=>items?.displayName?.toLowerCase().includes(searchText.toLowerCase())
||items?.mail?.toLowerCase().includes(searchText.toLowerCase())||
items?.department?.toLowerCase().includes(searchText.toLowerCase())||
items?.jobTitle?.toLowerCase().includes(searchText.toLowerCase())


);
  return(
    <>
    <PrimaryButton
    text="Get Users"
    onClick={()=>getUserS()}
    iconProps={{iconName:"users"}}
    style={{marginTop:20}}
    />
    <br/>
    <SearchBox
    placeholder='search here...'
    iconProps={{iconName:'search'}}
    value={searchText}
    onChange={(_,val)=>setSearchText(val||"")}
    style={{width:300,marginTop:20}}
    />
    {loading&&<Spinner label='loading users...'></Spinner>}
    <DetailsList
    
    items={filteredItems}

    />
    {/* next button */}
    {nextLink&&(
      <PrimaryButton
      text="Next Page"
      onClick={nextpage}
      style={{marginTop:20}}
      iconProps={{iconName:'next'}}
      />
    )}
    </>
  )
}

export default GetAlluserS;
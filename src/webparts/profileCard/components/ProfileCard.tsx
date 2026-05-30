import * as React from 'react';
// import styles from './ProfileCard.module.scss';
import type { IProfileCardProps } from './IProfileCardProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {GraphError,ResponseType} from "@microsoft/microsoft-graph-client";
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
import { LivePersona } from '@pnp/spfx-controls-react';
import {Link,Persona,PersonaSize} from "@fluentui/react";
import { useState,useEffect } from 'react';
const ProfileCard :React.FC<IProfileCardProps>=(props)=>{
  const [name,setName]=useState<string>('');
  const [mail,setMail]=useState<string>('');
  const [phone,setPhone]=useState<string>('');
  const [image,setImage]=useState<string>('');
useEffect(()=>{
 props.graphClient.api('me')
 .get((err:GraphError,user:MicrosoftGraph.User)=>{
  if(!err){
    setName(user.displayName||''),
    setMail(user.mail||""),
    setPhone(user.businessPhones?.[0]||"")
  }
 }) ;
 props.graphClient.api('/me/photo/$value')
 .responseType(ResponseType.BLOB)
 .get((err:GraphError,photoResponse:Blob)=>{
  const bolburl=URL.createObjectURL(photoResponse);
  setImage(bolburl);
 });
},[props.graphClient]);

//render phone
const renderedPhone=():JSX.Element|null=>{
  return phone?<Link href={`tel:${phone}`}>{phone}</Link>:<div/>
}

//render mail
const renderedMail=():JSX.Element|null=>{
  return mail?<Link href={`mailto:${mail}`}>{mail}</Link>:<div/>
}
  return(
    <>
    
    <LivePersona
    
    upn={mail}
    template={
      <>
      <Persona
      text={name}
      secondaryText={mail}
      onRenderSecondaryText={renderedMail}
      tertiaryText={phone}
      onRenderTertiaryText={renderedPhone}
      imageUrl={image}
      size={PersonaSize.size100}
      />
      </>
    }
    serviceScope={props.context.serviceScope as any}
    />
    </>
  )
}
export default ProfileCard ;

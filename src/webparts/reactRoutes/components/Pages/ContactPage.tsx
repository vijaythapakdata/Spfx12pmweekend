import * as React from'react';

const ContactPage:React.FC=()=>{
    return(
        <>
        <div style={styles.page}>
        <h1 style={styles.title}>Welcome to the Contact Page</h1>
        <p style={styles.text}>This is the contact page of our React application. You can reach out to us using the information provided.</p>
        </div>
            
        </>
    )
}
const styles={
    page:{
        padding:'20px',
    }as React.CSSProperties,
    title:{
        fontSize:'24px',
        fontWeight:'bold',
        marginBottom:'20px',
    } as React.CSSProperties,
    text:{
        fontSize:'16px',
        lineHeight:'1.5',
        color:'#333',
    } as React.CSSProperties
}

export default ContactPage;
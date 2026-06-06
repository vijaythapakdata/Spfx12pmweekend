import * as React from'react';

const ProjectPage:React.FC=()=>{
    return(
        <>
        <div style={styles.page}>
        <h1 style={styles.title}>Welcome to the Project Page</h1>
        <p style={styles.text}>This is the project page of our React application. You can view our projects and their details here.</p>
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
export default ProjectPage;
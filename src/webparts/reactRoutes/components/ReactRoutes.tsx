import * as React from 'react';
// import styles from './ReactRoutes.module.scss';
import type { IReactRoutesProps } from './IReactRoutesProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import { HashRouter as Router, Route, NavLink,Switch } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import ContactPage from './Pages/ContactPage';
import ProjectPage from './Pages/ProjectPage';
const NavItems=[
  {label:"Home",icon:"🏠",path:"/home",component:HomePage},
  {label:"About",icon:"ℹ️",path:"/about",component:AboutPage},
  {label:"Contact",icon:"📞",path:"/contact",component:ContactPage},
  {label:"Project",icon:"📁",path:"/project",component:ProjectPage}
];
const ReactRoutes:React.FC<IReactRoutesProps> = (props) => {

  return(
    <>
    <Router>
      <div style={styles.wrapper}>
        {/* header */}
        <div style={styles.header}>
          🔗 Routes Webpart
          </div>
          <nav style={styles.nav}>
            {NavItems.map((item,index)=>(
              <NavLink key={index} 
              to={item.path} 
              style={styles.navLink}
              activeStyle={styles.navLinkActive}>
                {item.icon} {item.label}
              </NavLink>
            ))}
          </nav>
          <Switch>
            {NavItems.map((item,index)=>(
              <Route key={index} path={item.path} component={item.component} />
            ))}
          </Switch>
      </div>
    </Router>
    </>
  )
  
}
const styles={
  //outer card container
  wrapper:{
    fontFamily:'Segoe UI, sans-serif',
    maxwidth:'600px',
    border:'1px solid #ddd',
    borderRadius:'8px',
    boxShadow:'0 2px 4px rgba(0,0,0,0.1)',
    overflow:'hidden',
    margin:'20px auto'
  } as React.CSSProperties,
  //blue header bar
  header:{
    backgroundColor:'#0078d4',
    color:'#fff',
    padding:'16px',
    fontSize:'18px',
    fontWeight:600
  } as React.CSSProperties,
  //navigation menu container
  nav:{
    display:'flex',
    borderBottom:'1px solid #ddd',
    backgroundColor:'#f9f9f9'
  } as React.CSSProperties,
  //individual nav item
  
  navLink:{
    flex:1,
    padding:'12px 16px',
    textAlign:'center',
    textDecoration:'none',
    color:'#333',
    fontSize:'14px',
    borderBottom:'3px solid transparent',
    transition:'all 0.3s ease'
  } as React.CSSProperties,
  navLinkActive:{
    color:'#0078d4',
    borderBottom:'3px solid #0078d4',
    fontWeight:600
  } as React.CSSProperties,
}
export default ReactRoutes;
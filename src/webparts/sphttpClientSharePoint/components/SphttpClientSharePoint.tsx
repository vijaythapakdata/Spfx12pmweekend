import * as React from 'react';
// import styles from './SphttpClientSharePoint.module.scss';
import type { ISphttpClientSharePointProps } from './ISphttpClientSharePointProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ListNames } from '../../../Enum/ListNames';
import { ISPHTTPCLIENTCOLUMNSTATE } from '../../../models/ISharePointColumnState';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { SPHttpClient ,SPHttpClientResponse} from '@microsoft/sp-http';
const SphttpClientSharePoint:React.FC<ISphttpClientSharePointProps>=(props)=>{

  const [fullName,setFullName]=React.useState<string>("");
  const [age,setAge]=React.useState<any>("");
  const [items,setItems]=React.useState<ISPHTTPCLIENTCOLUMNSTATE[]>([]);

  //create items

  const createItems=async():Promise<void>=>{
    const body:string=JSON.stringify({
      'Title':fullName,
      'Age':age
    });
    try{
const response:SPHttpClientResponse=await props.context.spHttpClient.post(`${props.siteurl}/_api/web/lists/getbytitle('${ListNames.CrudList}')/items`,
SPHttpClient.configurations.v1,
{
  headers:{
    'Accept':'application/json;odata=nometadata',
    'Content-type':'application/json;odata=nometadata',
    'odata-version':''
  },
  body:body
}


);

if(response.ok){
  const responseJSON=await response.json();
  console.log(responseJSON);
  alert(`Item created successfully with ID:${responseJSON.ID}`);
}
else{
  const errorResponse=await response.json();
  console.error('Error creating item:',errorResponse);
  alert(`Error creating item:${errorResponse.error.message}`);
}
    }
    catch(err){
console.error('Error creating item:',err);
alert(`Error creating item:${err}`);
    }
  }


  //update items

  const updateItems=():void=>{
    const idElement=document.getElementById('itemId') as HTMLInputElement;
    if(idElement){
      const id:number=parseInt(idElement.value);
      const body:string=JSON.stringify({
        'Title':fullName,
        'Age':age
      });
      if(id>0){
        props.context.spHttpClient.post(`${props.siteurl}/_api/web/lists/getbytitle('${ListNames.CrudList}')/items(${id})`,
        SPHttpClient.configurations.v1,
        {
          headers:{
             'Accept':'application/json;odata=nometadata',
    'Content-type':'application/json;odata=nometadata',
    'odata-version':'',
    'IF-MATCH':'*',
    'X-HTTP-Method':'MERGE'
          },
          body:body
        }
        )
        .then((response:SPHttpClientResponse)=>{
          if(response.ok){
            alert(`Item with ID:${id} updated successfully`);
          }
          else{
            response.json().then((responseJSON)=>{
              console.log(responseJSON);
              alert(`Error updating item:${responseJSON.error.message}`);
            });
          }
        })
        .catch((err)=>{
          console.error('Error updating item:',err);
        });
      }
      else{
        alert('Please enter a valid item ID greater than 0');
      }
    }
    else{
      alert('Item ID input element not found');
    }
  }
  //delete item
  const deleteItems=():void=>{
    const idElement=document.getElementById('itemId') as HTMLInputElement;
    const id:number=parseInt(idElement.value);
    if(id>0){
      props.context.spHttpClient.post(`${props.siteurl}/_api/web/lists/getbytitle('${ListNames.CrudList}')/items(${id})`,
      SPHttpClient.configurations.v1,
      {
        headers:{
           'Accept':'application/json;odata=nometadata',
    'Content-type':'application/json;odata=nometadata',
    'odata-version':'',
    'IF-MATCH':'*',
    'X-HTTP-Method':'DELETE'
        }
      }
      )
      .then((response:SPHttpClientResponse)=>{
        if(response.ok){
          alert(`Item with ID:${id} deleted successfully`);
        }
        else{
          response.json().then((responseJSON)=>{
            console.log(responseJSON);
            alert(`Error deleting item:${responseJSON.error.message}`);
          });
        }
      })
      .catch((err)=>{
        console.error('Error deleting item:',err);
      })
    }
    else{
      alert('Please enter a valid item ID greater than 0');
    }
  }

  //get item by id

  const getItemBYID=():void=>{
    const idElement=document.getElementById('itemId') as HTMLInputElement;
    if(idElement?.value){
      const id:number=parseInt(idElement.value);
      if(id>0){
        props.context.spHttpClient.get(`${props.siteurl}/_api/web/lists/getbytitle('${ListNames.CrudList}')/items(${id})`,
          SPHttpClient.configurations.v1,
          {
            headers:{
               'Accept':'application/json;odata=nometadata',
    'Content-type':'application/json;odata=nometadata',
    'odata-version':''
            }
          }
        )
        .then((response:SPHttpClientResponse)=>{
          if(response.ok){
            response.json().then((responseJSON)=>{
              setFullName(responseJSON.Title);
              setAge(responseJSON.Age);
              alert(`Item with ID:${id} retrieved successfully`);
            })
          }
          else{
            response.json().then((responseJSON)=>{
              console.log(responseJSON);
              alert(`Error retrieving item:${responseJSON.error.message}`);
            });
          }
        })
      
      }
      else{
        alert('Please enter a valid item ID greater than 0');
      }
     
      
    }
  }
  
  //get all items
  const getALLitems=():void=>{
    props.context.spHttpClient.get(`${props.siteurl}/_api/web/lists/getbytitle('${ListNames.CrudList}')/items`,
    SPHttpClient.configurations.v1,
    {
      headers:{
         'Accept':'application/json;odata=nometadata',
    'Content-type':'application/json;odata=nometadata',
    'odata-version':''
      }
    }
    )
    .then((response:SPHttpClientResponse)=>{
      if(response.ok){
        response.json().then((responseJSON)=>{
          setItems(responseJSON.value);
          alert('Items retrieved successfully');
        });
      }
      else{
        response.json().then((responseJSON)=>{
          console.log(responseJSON);
          alert(`Error retrieving items:${responseJSON.error.message}`);
        });
      }
    })
    .catch((err)=>{
      console.error('Error retrieving items:',err);
    })
  }
  return(
    <>
     <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p>{escape(props.description)}</p>
            <div className="form-group">
              <label htmlFor="itemId">Item ID:</label>
              <input type="text" className="form-control" id="itemId"></input>
            </div>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" className="form-control" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)}></input>
            </div>
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input type="text" className="form-control" id="age" value={age} onChange={(e) => setAge(e.target.value)}></input>
            </div>
            <div className="form-group">
              <label htmlFor="allItems">All Items:</label>
              <div id="allItems">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Full Name</th>
                      <th>Age</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.ID}>
                        <td>{item.ID}</td>
                        <td>{item.Title}</td>
                        <td>{item.Age}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="d-flex justify-content-start">
              <button className="btn btn-primary mx-2" onClick={createItems}>Create</button>
              <button className="btn btn-success mx-2" onClick={getItemBYID}>Read</button>
              <button className="btn btn-info mx-2" onClick={getALLitems}>Read All</button>
              <button className="btn btn-warning mx-2" onClick={updateItems}>Update</button>
              <button className="btn btn-danger mx-2" onClick={deleteItems}>Delete</button>
            </div>
          </div>
        </div>
        </div>
    </>
    
  )
}
export default SphttpClientSharePoint;

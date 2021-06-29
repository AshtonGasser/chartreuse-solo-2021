import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { DataGrid } from '@material-ui/data-grid';
// import {
//   randomCreatedDate,
//   randomTraderName,
//   randomUpdatedDate,
// } from '@material-ui/x-grid-data-generator';
function Ingredients () {
    const history = useHistory();
    const dispatch = useDispatch();
    const ingredient = useSelector((store) => store.ingredient)

    useEffect(() => {
        dispatch({ type: "FETCH_INGREDIENT", payload: {id} })
    },[])
    const { id } = useParams()
    const handleClick = () => {
        console.log('clicked add ingredient');
        dispatch({
            type: "SET_INGREDIENT",
            payload: ingredient,
        });
    }

const handleBack = () => {
    console.log('clicked back to dash');
    history.push('/user')
}
const columns = [
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    { field: 'ingredient type', headerName: 'ingredient_type', value: 'text', editable: true },
     
    {
      field: 'description',
      headerName: 'Description',
      type: 'character varying(500)',
      width: 220,
      editable: true,
    },
    {
      field: 'dateCreated',
      headerName: 'Date Created',
      type: 'date',
      width: 180,
      editable: true,
    },
   
  ];
  const rows = [
    {
      id: 1,
      name: 'john snow',
      age: 25,
      dateCreated: 11/11/95,
      lastLogin: 12/31/93,
    },
    ]

return (
    <div style={{ display: 'flex', height: '100%' }}>
    <div style={{ flexGrow: 1 }}>
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
    </div>
  </div>
  
    
  

    //     {/* <section className ="ingredients">
    //     {ingredient.map((ingredients => {
    //         return (
    //             <div key = {ingredients.id}><ul><li>{ingredients.name}</li></ul></div>
    //         )
    //     }))}

    // </section> */}
    
    
)

}

export default Ingredients
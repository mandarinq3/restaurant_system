import { doc, setDoc } from 'firebase/firestore';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { db } from '../../firebase_config';
import store from '../../store';
import './tablesSection.scss';


function TablesBlock(props) {
  const freeTablesCollection = useState([1,2,3,4,5,6,7,8,9,11,12,13,14,15])[0];
  let currentTableServerId ;


  const setNewTableToTheServer = async (table) =>{
    await setDoc(
      doc(db, `tables/${store.monthDocumentId}/${store.dayCollectionId}` ,table.createdAt),{ table}
      );
      currentTableServerId = table.createdAt;
  }


  const setNewTableToTheStore = async (number)=>{
    let table = {
      number,
      orders:[],
      disabled:true,
      createdAt:new Date().toLocaleTimeString(),
    };

    store.addTableHandler(table);// set in store
    setNewTableToTheServer(table);// set in server
  }


  return (
    <div className='block tables-block'>
    <span className='block-header'>TABLES</span>
      <ul className='free-tables-list'>
        {freeTablesCollection.map((table, _i)=>{
          let result = toJS(store.openedTables).map((openedTable)=>{
            return openedTable.number;
          })

          return (
            <li key={_i}>
              <button 
                disabled={result.includes(table)}
                className={result.includes(table)? 'disable' : 'able'}
                onClick={(e)=>{
                  let tableNumber = table;
                  e.currentTarget.disabled=result;
                  setNewTableToTheStore(tableNumber);
                  store.menuBlockInfoHandler(null);
                }}>{table}</button>
            </li>
          )
        })}
      </ul>
  </div>
  )
}

export default observer(TablesBlock);

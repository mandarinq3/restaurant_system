import React, { useEffect, useState } from 'react';
import './stopListSection.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleInfo, faTrash } from '@fortawesome/free-solid-svg-icons';
import store from '../../store';
import { observer } from 'mobx-react-lite';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase_config';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';


function StopListSection() {

  const [menuItemsList, setMenuItemsList ] = useState([]);


  useEffect(()=>{
    let array=[];
    store.foods.forEach((item)=>{
      item._items.forEach((el)=>{
        array.push(el);
      })
    })
    setMenuItemsList(array);
  },[])


  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {<span className='note'>to add items to the stop list press search button above and press red button next to the item !!!</span> }
    </Tooltip>
  );


  return (
    <div className='block stop-list-block'>
      <div className='block-header'>
        STOP LIST
        <OverlayTrigger
            placement="left"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
        >
          <FontAwesomeIcon icon={faCircleInfo} color='yellow'/>
        </OverlayTrigger>
    </div>
      
          <ul className='stop-list'>
            {menuItemsList.map((item)=>{
              return !item._isAvailable && 
                      <li key={item._name}>
                        <FontAwesomeIcon 
                          icon={faTrash} 
                          color='yellowgreen'
                          onClick={async ()=>{
                            await deleteDoc(doc(db, "stopList", item._name))
                            .then(()=>{
                              alert('item now is avilable to order')
                            })
                          }}
                        />
                        <span>{item._name}</span>
                      </li>
            })}
          </ul>
    </div>
  )
}

export default observer(StopListSection);

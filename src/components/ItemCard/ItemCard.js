import { observer } from 'mobx-react-lite';
import React, { useState } from 'react'
import store from '../../store';
import OrderDetailsModal from '../OrderDetailsModal/OrderDetailsModal';
import './itemCard.scss'

function ItemCard(props) {
  const [show, setShow] = useState(false);
  const [item, setItem] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow =  () => setShow(true);
  
  
  return (
    <>
      <li 
        className={!props.itemObject._isAvailable ? 'not-available-item-card wrapper' : 'wrapper'}
        onClick={()=>{
          if(!props.itemObject._isAvailable){
            return 
          }else if(store.currentTableNumber){
              setItem(props.itemObject);
              handleShow();
          }else{
            store.menuBlockInfoHandler('NO TABLE PICKED');
          }
        }}
      >
        <span>{props.itemObject._name}</span>
      </li>
      { item 
        ? <OrderDetailsModal show={show} handleClose={handleClose} item={item}/> 
        : null
      }
    </>

  )
}

export default observer(ItemCard)

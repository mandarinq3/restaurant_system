import React, { useEffect, useState } from 'react'
import './order.scss'
//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar, faCheckCircle, faClockFour,  faPersonWalkingLuggage } from '@fortawesome/free-solid-svg-icons';
import { observer } from 'mobx-react-lite';
import store from '../../store';



function Order(props) {

  const markPickedOrder = (id)=>{
    Array.from(
      document.querySelectorAll('.order-wrapper')
    ).forEach((element) => {
      element.style.scale = element.dataset.id === id ? 1.04 : 1;
      element.style.border = element.dataset.id === id ?  '1px double blue' : 'none';
    });
  }

  return (
      <li 
      className='order-wrapper'
      data-id={props.itemObj._uniqId}
      onClick={(e)=>{
        let thisItem = props.itemObj;
        store.currentPickedOrderHandler(thisItem);
        markPickedOrder(thisItem._uniqId);
      }}
          style={{ 
            backgroundColor:!props.itemObj._has_been_sent
            ?'rgba(87, 129, 227, 0.4)'
            :'rgba(59, 136, 59, 0.7)'
          }}
      >
        <div className='order-row-top'>
        <span className='order_signs'>
        {props.itemObj._has_been_sent 
            ? <FontAwesomeIcon icon={faCheckCircle} style={{color:'rgba(255, 249, 62,1)'}} size={'xl'}/>
            : <FontAwesomeIcon icon={faClockFour} style={{color:'blue'}} size={'xl'}/>
        }
      </span>

    
      <span className='order_signs'>
        { 
          props.itemObj._delivery &&
          <FontAwesomeIcon icon={faCar} style={{color:'rgba(255, 249, 62,1)'}} size={'1x'}/>
        }
        { 
          props.itemObj._takeAway &&
          <FontAwesomeIcon icon={faPersonWalkingLuggage} style={{color:'rgba(255, 249, 62,1)'}} size={'1x'}/> 
        }
      </span>

      <span className='order_name'>{props.itemObj._name}</span>
      <span className='order_amount'>{props.itemObj._amount}</span>
      <span className='order_price'>{props.itemObj._price}</span>
    </div>
    { props.itemObj._comment &&
      <div className='order-row-bottom'>
        <span className='order_comment'>{props.itemObj._comment}</span>
      </div>
    }
         
      
    </li>   
  )
}
 export default observer(Order);
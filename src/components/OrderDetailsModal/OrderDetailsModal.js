import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import store from '../../store';
import { orderTypes } from '../../constants';
import './orderDetailsModal.scss';

export default function OrderDetailsModal(props) {
  const orderQuantityNumbers = [1,2,3,4,5,6,7,8,9];

  const [isAmountPicked,setIsAmountPicked] = useState(false);
  const [pickedAmount,setPickedAmount]=useState(null); 

  const setOrder = (e) => {
    const {...item} = props.item;

    switch (e.currentTarget.dataset.type) {

        case orderTypes.TAKE_AWAY:
        item._takeAway = true;
        props.handleClose();
        break;
      
        case orderTypes.DELIVERY:
        item._delivery = true;
        props.handleClose();
        break;
    
        default:
        props.handleClose();
    }

    item._amount = pickedAmount;

    store.modifyOrdersHandler({
      type:'ITEM_ADDED',
      thisItem:item,
    })

    store.addOrderToSendList(item);  
    setIsAmountPicked(false);
  }

  return (
      <Modal
        show={props.show}
        onHide={()=>{
          props.handleClose();
          setIsAmountPicked(false);
          setPickedAmount(null);
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{ !isAmountPicked ? 'AMOUNT' : 'TYPE' }</Modal.Title>
        </Modal.Header>
        {
          ! isAmountPicked 
          ? <Modal.Body>
          <ul className="numbers-list">
           {
             orderQuantityNumbers.map((n)=>{
               return <li
               key={n}
               data-number={n} 
               onClick={(e)=>{
                setPickedAmount(e.currentTarget.dataset.number);
                setIsAmountPicked(true);
               }}>{n}</li>
             })
            }
          </ul>
         </Modal.Body>
        : <Modal.Footer>
          <Button className='modal-btns' data-type={orderTypes.TAKE_AWAY} onClick={(e)=>{setOrder(e)}}>
            take away
          </Button>
          <Button className='modal-btns' data-type={orderTypes.DELIVERY} onClick={(e)=>{setOrder(e)}}>
            delivery
          </Button>
          <Button className='modal-btns' data-type={orderTypes.HERE} onClick={(e)=>{setOrder(e)}}>
            here
          </Button>
        </Modal.Footer>
        }
      </Modal>
  );
}


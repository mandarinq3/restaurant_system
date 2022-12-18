import React, { useRef, useState } from 'react';
import './ordersPanel.scss';

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleMinus, faCirclePlus, faCommentDots, faMessage, faPrint, faShare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

//firebase
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase_config';

//mobx
import store from '../../store';
import { observer } from 'mobx-react-lite';

import { printOrders } from '../../functions';
import CommentModal from '../CommentModal/CommentModal';


function OrdersPanel() {
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState('');
  const handleCloseCommentModal = () => setShow(false);
  const handleShowCommentModal = () => setShow(true);
  


const editOrder = (type)=>{
    store.modifyOrdersHandler({ 
      type})
}


const sendOrder = ()=>{
    
  const currentTable = store.getCurrentTable();
  const [...orders] = currentTable.orders;


//set modified orders to the store
  store.modifyOrdersHandler({
    type:'ITEM_SENT',
    orders,
  })

//set new orders to the server
  getCurrentTableOrdersFromServer(currentTable.createdAt)
  .then(async (result)=>{
    if(result){
      // set or change modified local orders with server's current table's orders
      await setDoc(doc(db, `tables/${store.monthDocumentId}/${store.dayCollectionId}`, result.createdAt), {
        table:{
          orders,
        }
      },{merge:true});
    } 
  })
  .then(()=>{
    printOrders(store.ordersToSend);
  })
  .then(()=>{
    store.clearOrdersToSendList();
  })
}

const getCurrentTableOrdersFromServer = async (tableId)=>{
  const docRef = doc(db, `tables/${store.monthDocumentId}/${store.dayCollectionId}`, tableId);
  const docSnap = await getDoc(docRef);
  let result = null;
  if (docSnap.exists()) {
   result=docSnap.data().table;
  }
  return result;
}

const setCurrentTableToTheArchive = async (table) =>{
  if(table.orders.length>0){
    await setDoc(
      doc(db, `archive/${store.monthDocumentId}/${store.dayCollectionId}` ,table.createdAt),{ table}
    ); 
  }
  return table.createdAt;
}

const printCheck = async () => {
  const isConfirmed = window.confirm('are you sure');
  
  if(isConfirmed){
    const currentTable = store.getCurrentTable();
    
    //put this table to the archive
    await setCurrentTableToTheArchive(currentTable)
    //delete from server
    .then(async (id)=>{
      id && await deleteDoc(doc(db, `tables/${store.monthDocumentId}/${store.dayCollectionId}`, id));
      
    })
    //delete from storage
    .then(async ()=>{
      await store.deleteTableHandler(currentTable.number)
      .then(()=>{
        if(store.openedTables.length<1){
          store.changeCurrentTableNumber(null);
        }
        else{
          store.changeCurrentTableNumber(store.openedTables[store.openedTables.length-1].number);
        } 
      })
    })
  }//if
}

const addCommentToItem = () => {
  store.addCommentHandler(comment);
}

  return (
    <div className='orders-panel'>
      <div className='column-left'>
        <FontAwesomeIcon icon={faCirclePlus} 
          onClick={()=>{
            editOrder('ITEM_INCREMENTED')
          }}
        />
        <FontAwesomeIcon icon={faTrashCan} 
          onClick={()=>{
            editOrder('ITEM_REMOVED');
          }}
        />
        <FontAwesomeIcon icon={faCircleMinus} 
          onClick={()=>{
            editOrder('ITEM_DECREMENTED');
          }}
        />
        <FontAwesomeIcon 
          icon={faCommentDots} 
          color='yellow'
          className='comment-icon' 
          onClick={()=>{
            if(store.currentPickedOrder && !store.currentPickedOrder._has_been_sent){
              handleShowCommentModal();
            }else{
              if(!store.currentPickedOrder){
                alert( 'No item picked')
              }
              if(store.currentPickedOrder?._has_been_sent){
                alert('Impossible to comment sended item, pick not sended one')
              }
            } 
          }}
        />
      </div>

      <div className='column-right'>
        <FontAwesomeIcon 
          icon={faPrint} 
          color='green' 
          onClick={(e)=>{
            store.openedTables.length>0 && printCheck();      
          }}
           
        />
        <FontAwesomeIcon 
          icon={faShare} 
          color='blue' 
          onClick={sendOrder}
        />
      </div>
      <CommentModal show={show} handleClose={handleCloseCommentModal} handleShow={handleShowCommentModal} setComment={setComment} addCommentToItem={addCommentToItem}/>
    </div>
  )
}

export default observer(OrdersPanel);

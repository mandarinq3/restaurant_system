import { observable, toJS } from "mobx";
import { nanoid } from "nanoid";
import { menuItemsCollection } from "./foods";

const store = observable({

showSearchList: false,
setShowSearchList(){
  this.showSearchList = !this.showSearchList;
  console.log(this.showSearchList)
},

foods:menuItemsCollection,
changeFoodIsAvailableProperty(action){
  this.foods.forEach((category)=>{
    category._items.forEach((item)=>{
      if(item._name === action.name){
        item._isAvailable = action.type === 'added' ? false : true;
      }
    })
})},

monthDocumentId:null,
monthDocumentIdHandler(id){
  this.monthDocumentId = id;
},

dayCollectionId:null,
dayCollectionIdHandler(id){
  this.dayCollectionId = id;
},

currentTableNumber:null,
changeCurrentTableNumber(number){
  this.currentTableNumber = number;
},

openedTables:[],
addTableHandler(table){
  this.openedTables.push(table);
  this.currentTableNumber = table.number;
},

ordersToSend:[],
addOrderToSendList(order){
  this.ordersToSend.push(order);
},
clearOrdersToSendList(){
  this.ordersToSend = [];
},

closeTableHandler(number){
  alert('CLOSE TABLE NUMBER',number)
},

menuBlockInfo:null,
menuBlockInfoHandler(text){
  this.menuBlockInfo = text;
},

currentPickedOrder:null,
currentPickedOrderHandler(order){
  this.currentPickedOrder = order;
},

removeOrderHandler(){
     const currentTable = this.getCurrentTable();

    if(!this.currentPickedOrder){
      alert('no item picked');
    }

    if(this.currentPickedOrder && this.currentPickedOrder._has_been_sent){
      alert('you are not allowed to delete this item');
    }

    else{
      currentTable.orders.every((order,index)=>{
        
        if(this.currentPickedOrder && this.currentPickedOrder._uniqId === order._uniqId && !order._has_been_sent ){
          let removedOrder = currentTable.orders.splice(index,1);
          this.ordersToSend.length>0 && this.ordersToSend.forEach((item,i)=>{
            if(item._uniqId === removedOrder[0]._uniqId){
              this.ordersToSend.splice(i,1);
              this.currentPickedOrder = null;
            }
          });
          return false;
        }  
        return true;    
      })
    } 
       
},

incrementOrDecrementOrderHandler(type){
  if(!this.currentPickedOrder){
    alert('no order picked')
  }
  else{
      if(this.currentPickedOrder && !this.currentPickedOrder._has_been_sent ){
        switch (type){
          case 'ITEM_INCREMENTED': 
          this.currentPickedOrder._amount = +this.currentPickedOrder._amount+1;
          break;

          case 'ITEM_DECREMENTED': 
          if(+this.currentPickedOrder._amount>=1){
            this.currentPickedOrder._amount = +this.currentPickedOrder._amount-1;
          }
          if(+this.currentPickedOrder._amount === 0 ){
            this.removeOrderHandler();
          }
          break;
        }
      }
      else{
        alert('you are not allowed to increment or decrement this item');
      }
  }
},

addCommentHandler(comment){
  const pickedOrderId = this.currentPickedOrder._uniqId
  this.currentPickedOrder._comment = comment;
  const result = this.ordersToSend.find((item)=>{
    return item._uniqId === pickedOrderId;
  })
  result._comment = comment;
},

modifyOrdersHandler(action){
  if(action.type === 'ITEM_ADDED'){
    this.openedTables.forEach((table)=>{  
      if(table.number === this.currentTableNumber){
        action.thisItem._uniqId = nanoid();
        table.orders.push(toJS(action.thisItem))
      }
    })
  }

          

  if(action.type === 'ITEM_INCREMENTED'){
    this.incrementOrDecrementOrderHandler('ITEM_INCREMENTED');
    
  }

  if(action.type === 'ITEM_DECREMENTED'){
    this.incrementOrDecrementOrderHandler('ITEM_DECREMENTED');
  }

  if(action.type === 'ITEM_REMOVED'){
    this.removeOrderHandler();
  }

  if(action.type === 'ITEM_SENT'){
      action.orders.forEach((order)=>{
      if(order._has_been_sent){
        return order;
      }else{
        order._has_been_sent = true;
        order._uniqId = nanoid();
        return order;
      }
    })
  }
},//modifyOrdersHandler

getCurrentTable(){
  const currentTable = store.openedTables.filter((table)=>{
    return table.number === store.currentTableNumber;
  });

  return currentTable[0]; 
},

async deleteTableHandler(tableNumber){
  this.openedTables.forEach((table,index)=>{
    if(table.number === tableNumber){
      this.openedTables.splice(index,1);
    }
  })
  return 'deleted'
}
})

export default store; 
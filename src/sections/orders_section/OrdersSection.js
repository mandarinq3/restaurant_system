import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import TableSwitcher from '../../components/TableSwitcher/TableSwitcher';
import Order from '../../components/Order/Order';
import OrdersPanel from '../../components/OrdersPanel/OrdersPanel';
import store from '../../store';
import './ordersSection.scss';

function OrdersSection() {

  const [currentTableOrders,setCurrentTableOrders] = useState(null);

  useEffect(() => {
    const currentTable = store.currentTableNumber !== null
      ? store.openedTables.find(table => table.number === store.currentTableNumber)
      : null;
    setCurrentTableOrders(currentTable?.orders);
  }, [store.currentTableNumber]);


  return (
    <div className='block orders-block'>
      <div className='block-header'>
        <TableSwitcher/>
        <div className='table-number'>
          table:<b>{store.currentTableNumber ? store.currentTableNumber : '--'}</b>
        </div>

        <div className='total-bill'>
          bill:<b>{ currentTableOrders  && currentTableOrders.reduce((prev,current)=>{
            return prev+current._price*current._amount;
            },0)}</b>
        </div>
      </div>     
      <ul className='orders-list'>
        {
          currentTableOrders && currentTableOrders.map((order, _i)=>{
            return <Order key={order._uniqId} itemObj={order} />
          })
        }
      </ul>
      <OrdersPanel/>
    </div>
  )
}

export default observer(OrdersSection);
import './tableSwitcher.scss';
import React from 'react';

//mobx
import { observer } from 'mobx-react-lite';
import store from '../../store';

//bootstrap
import Dropdown from 'react-bootstrap/Dropdown';



function TableSwitcher() {

      return (
        <>
          <Dropdown className="d-inline mx-1">
            <Dropdown.Toggle id="dropdown-autoclose-true" className="tableSwitcher" 
            disabled={store.openedTables.length > 0 ? false : true }
            >
            {store.openedTables.length > 0 ? 'Tables' : '--'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {
                store.openedTables.map((table)=>{
                  return (
                  <Dropdown.Item href="#" key={table.number}
                    onClick={()=>{
                      let thisTableNumber = table.number;
                      store.changeCurrentTableNumber(thisTableNumber)
                    }}
                    >
                      {table.number}
                  </Dropdown.Item>)
                })
              }
            </Dropdown.Menu>
          </Dropdown>
        </>
      );
    }

    export default observer(TableSwitcher);

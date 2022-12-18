import './searchInput.scss';
import React, { useEffect, useState } from 'react';


//icons
import { faCircleMinus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//bootsrap
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

//mobx
import store from '../../store';
import OrderDetailsModal from '../OrderDetailsModal/OrderDetailsModal';
import { observer } from 'mobx-react-lite';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase_config';




function SearchInput(props) {

  const [itemsAll, setItemsAll]=useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow =  () => setShow(true);

  const [item, setItem] = useState(null);

  useEffect(()=>{
    const [...fullMenu] = props.itemsCollection ? props.itemsCollection : [] ;
    const concatedItemsArray = [];

    fullMenu && fullMenu.forEach((item)=>{
      item._items.forEach((data)=>{
        concatedItemsArray.push(data);
      })
    })

  setItemsAll(concatedItemsArray);

  },[props.itemsCollection])


const addItemToTheStopList = async (name)=>{
      await setDoc(doc(db, "stopList", name), {
        name,
      });
}
  
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a href="" ref={ref} className='custom-toggle' onClick={(e)=>{e.preventDefault(); onClick(e)}}>
    {children}
  </a>
));

const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
        <Form.Control
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="search..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter((child) =>{
              return !value || child.props.children[0].props.children.toLowerCase().startsWith(value)
            } 
          )}
        </ul>
      </div>
    );
  },
);

  return (
    <>
    <Dropdown className={ store.showSearchList && 'show'}>
    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" className='searchIcon' >
      <FontAwesomeIcon icon={faMagnifyingGlass} className='searchIcon'/>
    </Dropdown.Toggle>

    <Dropdown.Menu as={CustomMenu} 
    className='search-dropdown-menu-wrapper dropdown-menu'
    >
      {
       itemsAll && itemsAll.map((item)=>{
        return (
          <Dropdown.Item 
              eventKey="1" 
              key={item._name} 
              onClick={(e)=>{
                  if(!item._isAvailable){
                    return 
                  }else if(store.currentTableNumber){
                      setItem(item);
                      handleShow();
                  }else{
                    store.menuBlockInfoHandler('NO TABLE PICKED');
                  }
          }}>
            {/* {item._name} */}
            <span className={!item._isAvailable ? 'not-available-order' : ''}>{item._name}</span>
            <span className='add-to-stop-btn'>
            {item._isAvailable && 
            <FontAwesomeIcon 
                icon={faCircleMinus}
                onClick={(e)=>{
                  e.stopPropagation();
                  const isConfirmed = window.confirm('are you sure?');
                  isConfirmed && addItemToTheStopList(item._name)
                }}
              />}
            </span>
          </Dropdown.Item>
        )
       })
      }
    </Dropdown.Menu>
  </Dropdown>
  { item && <OrderDetailsModal show={show} handleClose={handleClose} item={item}/> }
  </>
  )
}

export default observer(SearchInput);
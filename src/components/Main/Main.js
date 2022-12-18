import './main.scss'
import React, { useEffect, useState } from 'react'

//COMPONENTS
import ItemCard from '../ItemCard/ItemCard';
import SearchInput from '../SearchInut/SearchInput';
import OrdersSection from '../../sections/orders_section/OrdersSection';
import TablesSection from '../../sections/tables_section/TablesSection';

//ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

//BOOTSTRAP
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

import { menuCategoriesCollection } from '../../foods';

//MOBX
import store from '../../store';
import { observer } from "mobx-react-lite";

//FIREBASE
import StopListSection from '../../sections/stop_list_section/StopListSection';


function Main(props) {
  const [pickedCategoryName, setPickedCategoryName] = useState(null);
  const [categoryNamesCollection, setCategoryNamesCollection] = useState(null);
  const [itemsCollection, setItemsCollection] = useState(null);
  const [itemsFromPickedCategory, setItemsFromPickedCategory ] = useState(null);
 

  useEffect(()=>{
    setCategoryNamesCollection(menuCategoriesCollection);
    setItemsCollection(store.foods);
  },[])


  return (
    <main className='main'>
        <div className='container'>
        <OrdersSection/>
        <div className='block menu-block'>
      <Navbar variant='dark'  expand="lg"  className='navbar'>
        <Container fluid>
        <Navbar.Brand >MENU</Navbar.Brand>
            <Nav className="navigation"  >
              <NavDropdown
                id="nav-dropdown-dark-example"
                title={pickedCategoryName ? pickedCategoryName :  "categories"}
                menuVariant="light"
              >
                {
                
                categoryNamesCollection && categoryNamesCollection.map((categoryObject)=>{
                  return (
                  <NavDropdown.Item 
                  key={categoryObject._id}
                  onClick={()=>{
                    let categoryName = categoryObject._category;
                    let filteredItems;
                    setPickedCategoryName(categoryName);
                    if(categoryName){
                      filteredItems = itemsCollection.filter((item)=>{
                        return item._category===categoryName
                      })
                    }
                    setItemsFromPickedCategory(filteredItems);
                  }}
                  >
                    {categoryObject._category}
                  </NavDropdown.Item>)
                })
                
                }
              </NavDropdown>
              <SearchInput 
            itemsCollection={itemsCollection} 
          />
            </Nav>

        </Container>
    </Navbar>

    <ul className='items-list'>
      {
        itemsFromPickedCategory && itemsFromPickedCategory[0]._items.map((itemObject)=>{
          return <ItemCard itemObject={itemObject} key={`itemCard${itemObject._id}`}/>
        })
      }
    </ul>

      {
      store.menuBlockInfo && 
        <div className='menu-info-display'>
          <span>
            <FontAwesomeIcon icon={faExclamationCircle}/> {store.menuBlockInfo}
          </span>
        </div>
      }
        </div>
        <TablesSection/>
        <StopListSection/>
      </div>
    </main>
  )
}

export default observer(Main)

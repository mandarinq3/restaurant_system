import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import './informationModal.scss'

export default function InformationModal() {
  const values = [true];

  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  return (
    <>
      <div className='about-web-btn-wrapper' onClick={() => handleShow()}>
        <FontAwesomeIcon icon={faCircleInfo} className={show ? 'about-web-btn on': 'about-web-btn off'}/>
        <span className={!show ? 'show-text':'hide-text'}>nstruction</span>
      </div>
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Instruction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
 
Visually, the program is divided into 4 blocks:<br/><br/>
1. Bills ( upper left block )<br/>
2. Tables <br/>
3. Menu<br/>
4. Stop list <br/><br/>

To start work let's go to the tables block, click on the number and create a check with this number.
Then in the menu block the assortment from the menu will be available. In the menu block assortment sorted by category. Also all products can be found by name by clicking on the search icon.<br/><br/>

After the product has been selected, it is necessary to specify the quantity and the method of serving food (delivery, pickup or in the restaurant). <br/><br/>

Now in the Bills block , item is shown, its color is blue because the item has not yet been sent to the appropriate department of the restaurant to begin cooking. Before the item is sent, you can increase / decrease its quantity, delete it or write any comment under it. Keep in mind that once the item has been sent, it cannot be changed.<br/><br/>

You can send an item by using the arrow in the bottom panel of the Bill block, after which the order will be shown in the different sections of the restaurant and the employee will start cooking the item.<br/><br/>

There is also a print check button on this panel. 
After printing the receipt, it will be deleted from the panel and stored in the archive on the server.<br/><br/>

If for any reason a product runs out in the restaurant, it can be removed for a while from the menu and placed in the stop list. It will help to avoid accidental ordering which is out of stock.<br/><br/>

In order to place an item in the stop list you need to click on the search button in the menu block and click on the red button next to the item.<br/><br/>
</Modal.Body>
      </Modal>
    </>
  );
}

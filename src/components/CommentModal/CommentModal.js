import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

export default function CommentModal(props) {
  return (
    <>
    <Modal show={props.show} onHide={()=>{
          props.setComment('');
          props.handleClose();
          }}>
      <Modal.Header closeButton/>
      <Modal.Body>
        <Form>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>Write comment...</Form.Label>
            <Form.Control as="textarea" rows={3} onChange={(e)=>{
              props.setComment(e.currentTarget.value);
            }}/>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={()=>{
          props.setComment('');
          props.handleClose();
          }}>Close</Button>
        <Button variant="primary" onClick={()=>{
          props.handleClose();
          props.addCommentToItem();
        }
          
          }>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}

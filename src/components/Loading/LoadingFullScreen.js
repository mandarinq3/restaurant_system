import React from 'react';
import { Spinner } from 'react-bootstrap';
import './loadingFullScreen.scss'

export default function LoadingFullScreen(props) {
  return (
  <>
    {
      props.show && 
      <div className='loading-window'>
          <Spinner animation="border" role="status" variant='light'>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
    }
   </>
  )
}

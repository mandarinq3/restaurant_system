import React from 'react';
import InformationModal from '../InformationModal/InformationModal';
import './header.scss';

export default function Header() {
  return (
    <header>
      <div className='container'>
      <InformationModal/>
      </div>
    </header>
  )
}

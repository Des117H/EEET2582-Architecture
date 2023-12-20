'use client'

import {Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppHeader from '../components/app.header';

const Welcome = () => {
    return (
      <div>
        <AppHeader/>
        this is welcome
        <Button> this is a button with react</Button>
      </div>
    )
  }

export default Welcome;
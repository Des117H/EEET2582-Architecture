"use client";

import {Container, Row, Col, Ratio, ListGroup, Form, Button} from 'react-bootstrap'
import global from '../styles/global.module.css';

function AppFooter() {
  return (
    <Container fluid>
    <Row>
      <Col className="footer-col">
        <h4>About Us</h4>
        <span>Phone number: </span> 
        <a href="tel:02837761300">028 3776 1300</a>
      </Col>
      <Col className="footer-col">
        <h4>Social Media</h4>
        <ListGroup horizontal >
            <ListGroup.Item className='border-0'>
            <a href="https://www.facebook.com/RMITUniversityVietnam">Facebook </a>
            </ListGroup.Item>
            <ListGroup.Item className='border-0'>
            <a href="https://twitter.com/rmitvietnam">Twitter </a>
                </ListGroup.Item>
                <ListGroup.Item className='border-0'>
                <a href="https://www.instagram.com/rmituniversityvietnam/">Instagram </a>
                </ListGroup.Item>
                <ListGroup.Item className='border-0'>
                <a href="https://www.youtube.com/c/RMITUniversityVietnam%2520">Youtube</a>
                </ListGroup.Item>
        </ListGroup>
       
      </Col>
      <Col className="footer-col">
        <h4>Receive Notification</h4>
        <Form>
            <Row>
                <Col md={8}>
                <Form.Control
            type="text"
            placeholder="Email"
            defaultValue="example@gmail.com"
          />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Col>
                <Col md={4}>
                <Button variant ='secondary' type="submit">Submit</Button>
                </Col>
            </Row>
           
        </Form>
      </Col>
    </Row>
    <Row>
      <Col>
        <Ratio aspectRatio="21x9">
        <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.071655379082!2d106.69319177573556!3d10.728956760066048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fbea5fe3db1%3A0xfae94aca5709003f!2zxJDhuqFpIEjhu41jIFJNSVQgTmFtIFPDoGkgR8Oybg!5e0!3m2!1svi!2s!4v1702751099901!5m2!1svi!2s"
        width="100%" height="200" style={{ border: '0' }} allowFullScreen={true} loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"></iframe>
        </Ratio>
    </Col>
    </Row>
  </Container>
  );
}

export default AppFooter;
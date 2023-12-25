"use client";

import { Container, Row, Col, Ratio, ListGroup, Form, Table } from "react-bootstrap";
import { Button } from "@mui/material";
import global from "../styles/global.module.css";
import { Facebook, Instagram, Twitter, Youtube } from "react-bootstrap-icons";

function AppFooter() {
  return (
    <Container className={global.footer} fluid>
      <Row>
        <Col className="footer-col">
          <p className={global.footerTitle}>About Us</p>
          

          <ListGroup variant="flush">
          <Table borderless size="sm">
      
      <tbody>
        <tr>
          <td className = {global.footerTableTitle}>Website</td>
          <td ><a className = {global.footerTableContent} target="_blank" href="https://www.rmit.edu.vn/vi">RMITUniversityVietnam</a></td>
        </tr>
        <tr>
          <td className = {global.footerTableTitle}>Phone</td>
          <td ><a className = {global.footerTableContent} href="tel:02837761300">028 3776 1300</a></td>
        </tr>
        <tr>
          <td className = {global.footerTableTitle}>Address</td>
          <td ><a className = {global.footerTableContent} target="_blank" href="https://maps.app.goo.gl/bEUudhRzf6xRe5859">702 Đ. Nguyễn Văn Linh, Tân Hưng, Quận 7, Thành phố Hồ Chí Minh 700000</a></td>
          
        </tr>
      </tbody>
    </Table>
    </ListGroup>
        </Col>
        <Col className="footer-col">
          <p className={global.footerTitle}>Social Media</p>
          <ListGroup horizontal className="justify-content-around">
            <ListGroup.Item className="border-0">
              <a target="_blank"  href="https://www.facebook.com/RMITUniversityVietnam">
                {" "}
                <Facebook className={global.footerIcon}></Facebook>{" "}
              </a>
            </ListGroup.Item>
            <ListGroup.Item className="border-0">
              <a target="_blank"  href="https://twitter.com/rmitvietnam">
                <Twitter className={global.footerIcon}></Twitter>{" "}
              </a>
            </ListGroup.Item>
            <ListGroup.Item className="border-0">
              <a target="_blank"  href="https://www.instagram.com/rmituniversityvietnam/">
                {" "}
                <Instagram className={global.footerIcon}></Instagram>{" "}
              </a>
            </ListGroup.Item>
            <ListGroup.Item className="border-0" >
              <a target="_blank"  href="https://www.youtube.com/c/RMITUniversityVietnam%2520">
                <Youtube className={global.footerIcon}></Youtube>
              </a>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md = {6} className="footer-col">
          <p className={global.footerTitle}>Receive Notification</p>
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
                <Button variant="contained" color="secondary">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Ratio className={global.footerMap} aspectRatio="21x9">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.071655379082!2d106.69319177573556!3d10.728956760066048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fbea5fe3db1%3A0xfae94aca5709003f!2zxJDhuqFpIEjhu41jIFJNSVQgTmFtIFPDoGkgR8Oybg!5e0!3m2!1svi!2s!4v1702751099901!5m2!1svi!2s"
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </Ratio>
              
              </div>
              <hr></hr>
              <div>
                <p className={global.footerText}>-- By Group in architecture --</p>
              </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AppFooter;

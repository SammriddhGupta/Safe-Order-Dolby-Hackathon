import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Modal from 'react-bootstrap/Modal';
import { MdLocationOn } from 'react-icons/md'; // Import the MdLocationOn icon
import callList from './callList.jsx';
import NavbarPage from './NavbarPage.jsx';

const MiddlemanHomePage = () => {
  const [data, setData] = useState(callList);
  const [showModal, setShowModal] = useState(false);
  const [selectedTranscription, setSelectedTranscription] = useState("");
  const [filter, setFilter] = useState(""); // State to store the filter value

  const handleOpenModal = (transcription) => {
    setSelectedTranscription(transcription);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedTranscription("");
    setShowModal(false);
  };

  const handleFilter = (status) => {
    setFilter(status);
  };

  const filteredData = filter ? data.filter((values) => values.status === filter) : data; // Apply filter to data

  const renderCards = () => {
    return filteredData.map((values) => {
      const { id, firstName, lastName, addressLine, city, state, postCode, visitType, transcription, phone } = values;
      const isDiscreetVisit = visitType === "Discreet Visit"; // Check if Visit Type is "Silent"

      return (
        <Col key={id}>
          <CardGroup>
            <Card>
              <Card.Body>
                <div className="text-center">
                  <Card.Title>{firstName} {lastName}</Card.Title>
                  <Card.Text><b>Location: {addressLine} {city} {state} {postCode}</b>
                    <a href={`https://maps.google.com/?q=${addressLine} ${city} ${state} ${postCode}`} target="_blank" rel="noopener noreferrer">
                      <MdLocationOn className="location-icon" />Map</a>
                  </Card.Text>
                  <Card.Text><b>Phone: {phone}</b></Card.Text>
                  <Card.Text className={isDiscreetVisit ? "text-danger" : ""}><b>Visit Type: {visitType}</b></Card.Text>
                  <Button variant="primary" target="_blank" href="https://safe-order.netlify.app/conference?id=safe-order%7C1688432269330">Answer the phone</Button>
                  <Button className="mt-1" variant="secondary" onClick={() => handleOpenModal(transcription)}>Read transcription</Button>
                </div>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      );
    });
  };

  return (
    <>
      <NavbarPage />
      <Container fluid>
        <Row className='mt-5'></Row>
        <Row>
          <Col md={2} className='bg_colour_a mt-5'>
            <Row>
              <ButtonGroup vertical>
                <Button variant="light" onClick={() => handleFilter("Active")}>ACTIVE CALLS</Button>
                <Button variant="light" onClick={() => handleFilter("Pending")}>PENDING CALLS</Button>
                <Button variant="light" onClick={() => handleFilter("Missed")}>MISSED CALLS</Button>
              </ButtonGroup>
            </Row>
          </Col>
          <Col className='bg_colour_b mt-5'> {/* Add mt-4 class for margin-top spacing */}
            <Row xs={1} md={4} className="g-4">
              {renderCards()}
            </Row>
          </Col>
        </Row>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Transcription</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{selectedTranscription}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default MiddlemanHomePage;

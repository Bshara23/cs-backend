import React, {useState} from 'react';
import pcs from '../data/pcs.json';
import BasicCard from '../components/BasicCard';
import CreditCard from '../components/CreditCard';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function PCsPage () {
  const [show, setShow] = useState (false);
  const handleClose = () => setShow (false);
  const handleShow = () => setShow (true);

  return (
    <div>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Credit Card Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreditCard onSuccess={handleClose} />
        </Modal.Body>

      </Modal>

      <h1 className="text-center m-5">PCs</h1>
      <div className="d-flex align-content-sm-center flex-wrap">

        {pcs.devs.map ((x, i) => {
          return (
            <div key={i} className="m-3">
              <BasicCard
                title={x.id}
                description={x.description}
                onBuyClick={handleShow}
                imgSrc={require ('../data/images/' + x.src).default}
              />
            </div>
          );
        })}

      </div>
    </div>
  );
}

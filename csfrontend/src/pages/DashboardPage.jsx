import React, {useState} from 'react';
import pcs from '../data/pcs.json';
import phones from '../data/phones.json';

import BasicCard from '../components/BasicCard';
import CreditCard from '../components/CreditCard';
import Modal from 'react-bootstrap/Modal';
export default function DashboardPage () {
  const [show, setShow] = useState (false);
  const handleClose = () => setShow (false);
  const handleShow = () => setShow (true);

  return (
    <div>

      <h1 className="text-center m-5">Welcome to Hasob </h1>
      <h3 className="text-center m-5">Check out our latest products! </h3>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Credit Card Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreditCard onSuccess={handleClose} />
        </Modal.Body>

      </Modal>
      <div className="d-flex align-content-sm-center flex-wrap">

        {pcs.devs.map ((x, i) => {
          return (
            <div>
              {i <= 2
                ? <div key={i} className="m-3">
                    <BasicCard
                      title={x.id}
                      description={x.description}
                      onBuyClick={handleShow}
                      imgSrc={require ('../data/images/' + x.src).default}
                    />
                  </div>
                : <div />}
            </div>
          );
        })}
        {phones.devs.map ((x, i) => {
          return (
            <div>
              {i <= 1
                ? <div key={i} className="m-3">
                    <BasicCard
                      title={x.id}
                      description={x.description}
                      onBuyClick={handleShow}
                      imgSrc={require ('../data/images/' + x.src).default}
                    />
                  </div>
                : <div />}
            </div>
          );
        })}

      </div>
    </div>
  );
}

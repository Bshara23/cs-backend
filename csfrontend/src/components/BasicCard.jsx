import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import img1 from '../data/images/3.png';

export default function BasicCard({title, description, onBuyClick, imgSrc}) {
  return (
    <div className="m-2">
      <Card >
        <div style={{width: '300px', height: '300px'}}>
        <Card.Img
          style={{width: '100%', maxHeight: '80%', objectFit: 'contain'}}
          variant="top"
          src={imgSrc ? imgSrc : img1}
          className="p-3"
        />
        </div>
        <Card.Body>
          <Card.Title className="text-center">{title}</Card.Title>
          <Card.Text className="text-center">
            {description}
          </Card.Text>

          <Button className="w-100" variant="primary" onClick={onBuyClick}>
            Buy Now!
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

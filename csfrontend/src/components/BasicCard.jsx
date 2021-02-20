import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import img1 from '../data/images/3.png';

export default function BasicCard({title, description, onBuyClick, imgSrc}) {
  return (
    <Card style={{width: '18rem'}}>
      <Card.Img variant="top" src={imgSrc ? imgSrc : img1} className="p-3" />
      <Card.Body>
        <Card.Title className="text-center">{title}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>

        <Button className="w-100" variant="primary" onClick={onBuyClick}>
          Buy Now!
        </Button>
      </Card.Body>
    </Card>
  );
}

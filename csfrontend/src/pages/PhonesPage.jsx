import React from 'react';
import pcs from '../data/phones.json';
import BasicCard from '../components/BasicCard';

export default function PhonesPage () {
  return (
    <div>
      <h1 className="text-center m-5">Phones</h1>
      <div className="d-flex align-content-sm-center flex-wrap">

        {pcs.devs.map ((x, i) => {
          return (
            <div key={i} className="m-3">
              <BasicCard
                title={x.id}
                description={x.description}
                onBuyClick={() => {
                  console.log ('clicked');
                }}
                imgSrc={require ('../data/images/' + x.src).default}
              />
            </div>
          );
        })}

      </div>
    </div>
  );
}

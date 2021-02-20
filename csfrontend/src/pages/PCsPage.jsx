import React from 'react';
import pcs from '../data/pcs.json';
import BasicCard from '../components/BasicCard';

export default function PCsPage () {
  return (
    <div>
      <h1 className="text-center m-5">PCs</h1>
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

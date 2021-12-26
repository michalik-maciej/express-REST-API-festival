import './Workshop.scss'

import React from 'react';

const Workshops = ({event}) => {
  return (
    <section>
      <h2>Day {event.day}</h2>
      <p>Price: {event.price}$</p>
      <h4 className="title">Workshops: </h4>
      {event.workshops.map(workshop => <p className="workshop_name">{workshop.name}</p>)}
      
    </section>

  )
}

export default Workshops;

import './SeatChooser.scss';

import { Alert, Button, Progress } from 'reactstrap';

import React from 'react';
import io from 'socket.io-client';

class SeatChooser extends React.Component {
  
  state = {
    socket: io(
      process.env.NODE_ENV === 'production' 
      ? null 
      : 'http://localhost:8000'
    )
  }

  componentDidMount() {
    const { loadSeatsOnMount, refreshSeats } = this.props;
    const { socket } = this.state;
    loadSeatsOnMount();

    socket.on('seatsUpdated', (seats) => {
      refreshSeats(seats)
    })
  }

  isTaken = (seatId) => {
    const { seats, chosenDay } = this.props;
    return (seats.some(item => (item.seat === seatId && item.day === chosenDay)));
  }

  prepareSeat = (seatId) => {
    const { chosenSeat, updateSeat } = this.props;
    const { isTaken } = this;

    if(seatId === chosenSeat) return <Button key={seatId} className="seats__seat" color="primary">{seatId}</Button>;
    else if(isTaken(seatId)) return <Button key={seatId} className="seats__seat" disabled color="secondary">{seatId}</Button>;
    else return <Button key={seatId} color="primary" className="seats__seat" outline onClick={(e) => updateSeat(e, seatId)}>{seatId}</Button>;
  }

  render() {
    const { prepareSeat } = this;
    const { chosenDay, seats, requests } = this.props;

    return (
      <div>
        <h3>Pick a seat</h3>
        <small id="pickHelp" className="form-text text-muted ml-2"><Button color="secondary" /> – seat is already taken</small>
        <small id="pickHelpTwo" className="form-text text-muted ml-2 mb-4"><Button outline color="primary" /> – it's empty</small>
        { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].success) && <div className="seats">{[...Array(50)].map((x, i) => prepareSeat(i+1) )}</div> }
        { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].pending) && <Progress animated color="primary" value={50} /> }
        { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].error) && <Alert color="warning">Couldn't load seats...</Alert> }
        { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].success) && <h5>Seats taken: {seats.filter(seat => seat.day === chosenDay).length}/50</h5> }
      </div>
    )
  };
}

export default SeatChooser;

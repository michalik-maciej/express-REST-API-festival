import { getRequests, getSeats, loadSeats, loadSeatsRequest } from '../../../redux/seatsRedux';

import SeatChooser from './SeatChooser';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  seats: getSeats(state),
  requests: getRequests(state),
});

const mapDispatchToProps = dispatch => ({
  loadSeatsOnMount: () => dispatch(loadSeatsRequest()),
  refreshSeats: (payload) => dispatch(loadSeats(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(SeatChooser);

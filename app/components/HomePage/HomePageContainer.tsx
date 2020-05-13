/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from 'react-redux';
import HomePage from './HomePage';

function mapStateToProps(state: any) {
  return {
    courses: state.entities.courses
  };
}

export default connect(mapStateToProps)(HomePage);

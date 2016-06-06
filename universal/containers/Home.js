import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import HomePage from '../components/HomePage';
import * as PulseActions from '../actions/PulseActions';

class Home extends Component {
  static propTypes = {
    isLoggedIn: React.PropTypes.bool
  }

  render() {
    return (
      <HomePage />
    );
  }
}

/**
 * Expose "Smart" Component that is connect-ed to Redux
 */
export default connect(
  state => ({
    isLoggedIn: state.pulseApp.isLoggedIn
  })
)(Home);

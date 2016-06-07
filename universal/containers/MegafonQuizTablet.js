import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MegafonQuizTabletPage from '../components/MegafonQuizTabletPage';
import * as PulseActions from '../actions/PulseActions';

class MegafonQuizTablet extends Component {
  static propTypes = {
    quizState: React.PropTypes.object,
    startAnswering: React.PropTypes.func.isRequired,
    startHelping: React.PropTypes.func.isRequired
  }

  render() {
    return (
      <MegafonQuizTabletPage quizState={this.props.quizState} startAnswering={this.props.startAnswering} startHelping={this.props.startHelping} />
    );
  }
}

/**
 * Expose "Smart" Component that is connect-ed to Redux
 */
export default connect(
  state => ({
    quizState: state.pulseApp.quizState
  }),
  dispatch => bindActionCreators(PulseActions, dispatch)
)(MegafonQuizTablet);

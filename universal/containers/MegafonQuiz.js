import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MegafonQuizPlazmaPage from '../components/MegafonQuizPlazmaPage';
import * as PulseActions from '../actions/PulseActions';

class MegafonQuiz extends Component {
  static propTypes = {
    quizState: React.PropTypes.object,
    initState: React.PropTypes.func.isRequired,
    startHelping: React.PropTypes.func.isRequired
  }

  render() {
    return (
      <MegafonQuizPlazmaPage quizState={this.props.quizState} initState={this.props.initState} startHelping={this.props.startHelping} />
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
)(MegafonQuiz);

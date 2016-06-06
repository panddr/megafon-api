import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ProjectPage from '../components/ProjectPage';
import * as PulseActions from '../actions/PulseActions';

class Project extends Component {
  static propTypes = {
    events: React.PropTypes.array
  }

  render() {
    return (
      <ProjectPage events={this.props.events} slug={this.props.params} />
    );
  }
}

/**
 * Expose "Smart" Component that is connect-ed to Redux
 */
export default connect(
  state => ({
    events: state.pulseApp.events
  }),
  dispatch => bindActionCreators(PulseActions, dispatch)
)(Project);

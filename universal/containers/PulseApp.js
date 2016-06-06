import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Home from '../components/HomePage';
import NasedkinList from '../components/NasedkinList';
import BadaninaList from '../components/BadaninaList';
import AsyncBar from '../components/AsyncBar';
import EventInput from '../components/EventInput';

import * as PulseActions from '../actions/PulseActions';

class PulseApp extends Component {
  static propTypes = {
    addEvent: React.PropTypes.func.isRequired,
    editEvent: React.PropTypes.func.isRequired,
    deleteEvent: React.PropTypes.func.isRequired,
    uploadImage: React.PropTypes.func.isRequired,
    submitLogin: React.PropTypes.func.isRequired,
    userId: React.PropTypes.string,
    events: React.PropTypes.array,
    isWorking: React.PropTypes.bool,
    isLoggedIn: React.PropTypes.bool,
    error: React.PropTypes.any
  };

  render() {
    let actions = {
      editEvent: this.props.editEvent,
      deleteEvent: this.props.deleteEvent
    };

    return (
      <div className="portfolio-container">
        <AsyncBar isWorking={this.props.isWorking} error={this.props.error} />
        {this.props.home}
        {this.props.nasedkin}
        {this.props.badanina}
        {this.props.login}
        {this.props.project}
      </div>
    );
  }
}

/**
 * Expose "Smart" Component that is connect-ed to Redux
 */
export default connect(
  state => ({
    events: state.pulseApp.events,
    userId: state.pulseApp.userId,
    isLoggedIn: state.pulseApp.isLoggedIn,
    isWorking: state.pulseApp.isWorking,
    error: state.pulseApp.error
  }),
  dispatch => bindActionCreators(PulseActions, dispatch)
)(PulseApp);

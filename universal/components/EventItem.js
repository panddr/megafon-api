import React, {PropTypes, Component} from 'react';
import moment from 'moment';
import EventInput from './EventInput';
import { Link } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PulseActions from '../actions/PulseActions';

export default class EventItem extends Component {
  static propTypes = {
    id: PropTypes.any.isRequired,
    event: PropTypes.object.isRequired,
    editable: PropTypes.bool,
    editEvent: PropTypes.func,
    deleteEvent: PropTypes.func,
    uploadImage: PropTypes.func,
    addImagesToStore: PropTypes.func,
    images: React.PropTypes.array
  };

  constructor(props, context){
    super(props, context);
    this.state = {
      editing: false
    };
  }

  handleClick() {
    const { event } = this.props;

    if (this.props.editable) {
      this.setState({ editing: true });

      this.props.addImagesToStore(event.images);
    }
  }

  handleSave(event) {
    if (event.title.length === 0) {
      this.props.deleteEvent(event);
    } else {
      this.props.editEvent(event);
    }
    this.setState({ editing: false });
  }

  render() {
    const { id, event, editEvent, deleteEvent } = this.props;

    let element;
    let modified = (event.updated) ? event.updated : event.created;

    const imageUrl = (event.images.length > 0) ? 'https://s3-eu-west-1.amazonaws.com/projectsuploads/uploads/images/' + event.images[0].key : null;

    const link = '/project/' + event.slug;

    if (this.state.editing) {
      element = (
        <EventInput title={event.title}
                    description={event.description}
                    artist={event.artist}
                    editing={this.state.editing}
                    onSubmit={ (event) => this.handleSave(Object.assign({}, event, { id: id })) }
                    onImageSubmit={ this.props.uploadImage } />
      );
    } else {
      let del = (this.props.editable) ?
        <button className='destroy pure-button' onClick={ () => deleteEvent(event) }>Удалить</button> :
        null;
      element = (
        <div>
          <Link to={link}>
            {event.images.length > 0 ?
              <div>
                <img src={imageUrl} />
              </div>
              : null}
            {event.title}
          </Link>
          <button onClick={::this.handleClick}>Редактировать</button>
          {del}
        </div>
      );
    }

    return (
      <li className='portfolio-project-item'>{element}</li>
    );
  }
}


/**
 * Expose "Smart" Component that is connect-ed to Redux
 */
export default connect(
  state => ({
    images: state.pulseApp.images
  }),
  dispatch => bindActionCreators(PulseActions, dispatch)
)(EventItem);

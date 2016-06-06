import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import { VALUE_CLASSES } from '../constants/ActionTypes.js';

export default class EventInput extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onDropImage: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    textLabel: PropTypes.string,
    nameLabel: PropTypes.string,
    editing: PropTypes.bool
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      errors: [],
      text: this.props.text || '',
      name: this.props.name || '',
      images: this.props.images || '',
      value: this.props.value || 50
    };
  }

  handleSubmit(e) {
    let errors;
    e.preventDefault();

    if (this.state.text.length === 0) {
      errors = ['You have not said what happened!'];
    }

    if (this.state.value < 1 || this.state.value > 100) {
      errors = [...errors, 'You have somewhere set an invalid value!'];
    }

    if (errors && errors.length > 0) {
      this.setState({errors: errors});
    } else {
      this.props.onSubmit({text: this.state.text, name: this.state.name, images: this.state.images, userId: this.props.userId});
      this.setState({text: '', value: 50});
    }
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleValueChange(e) {
    this.setState({ value: parseInt(e.target.value, 10) });
  }

  handleImagesChange(e) {
    this.setState({ images: e.target.files });
  }

  onDrop(files) {
    this.props.onDropImage({files: files});
    // let filesToSave = [];
    // filesToSave = [filesToSave, ...files];
    // this.setState({ files: filesToSave });
    // console.log('Received files: ', files);
    // console.log('Files to save: ', filesToSave);
  }

  render() {
    let self = this;
    let saveText = (this.props.editing) ? 'Save' : 'Add';
    let className = Object.keys(VALUE_CLASSES).reduce((current, key) => {
      if (!current && self.state.value <= key) {
        return VALUE_CLASSES[key];
      } else {
        return current;
      }
    }, null);

    return (
      <form className='Pulse-eventInput pure-form' encType="multipart/form-data" method="post" action="/api/0/events">
        <fieldset>
          <input type='text' placeholder={this.props.textLabel} autoFocus='true' value={this.state.text} onChange={::this.handleTextChange} />
          <textarea placeholder={this.props.descriptionLabel} value={this.state.name} onChange={::this.handleNameChange} />
          <Dropzone onDrop={::this.onDrop}>
            <div>Try dropping some files here, or click to select files to upload.</div>
          </Dropzone>
          {this.state.files ? <div>
          <h2>Uploading {files.length} files...</h2>
          <div>this.state.files.map((file) => <img src={file.preview} />)</div>
          </div> : null}
          <button type='submit' className='save pure-button' onClick={::this.handleSubmit}>{saveText}</button>
        </fieldset>
      </form>
    );
  }
}

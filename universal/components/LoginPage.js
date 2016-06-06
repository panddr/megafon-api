import React, { PropTypes, Component } from 'react';

import EventInput from '../components/EventInput';
import * as PulseActions from '../actions/PulseActions';

export default class LoginPage extends Component {
  static propTypes = {
    submitLogin: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoggedIn: false,
      login: this.props.login || '',
      password: this.props.password || ''
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const login = "user"
    const password = "1234"
    if (this.state.login == login && this.state.password == password) {
      this.setState({ isLoggedIn: true });
      this.props.submitLogin(true);
    }
  }

  handleLogout(e) {
    e.preventDefault();
    this.setState({ isLoggedIn: false });
    this.props.submitLogin(false);
  }

  handleLoginChange(e) {
    this.setState({ login: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <div className="portfolio-login">
        {!this.props.isLoggedIn ?
          <div className="overlay">
            <form className='form' method="post" action="/api/0/login">
              <fieldset>
                <input
                  type='text'
                  placeholder='Логин'
                  value={this.state.title}
                  onChange={::this.handleLoginChange} />
                <input
                  type='password'
                  placeholder='******'
                  value={this.state.password}
                  onChange={::this.handlePasswordChange} />
                <button
                  type='submit'
                  className='button'
                  onClick={::this.handleSubmit}>
                  Войти
                </button>
              </fieldset>
            </form>
          </div>
          :
          <div>
            <button
              type='submit'
              className='button'
              onClick={::this.handleLogout}>
              Выйти
            </button>
            <section className='Pulse-addEventForm'>
              <EventInput
                onSubmit={this.props.addEvent}
                images=''
                onImageSubmit={ (event) => this.props.uploadImage(Object.assign({}, event, { id: id }))}
                titleLabel='Название проекта'
                descriptionLabel='Описание' />
            </section>
          </div>
        }
      </div>
    );
  }
}

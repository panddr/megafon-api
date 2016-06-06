import React, { PropTypes, Component } from 'react';
import { IndexLink, Link } from 'react-router';

if (process.env.BROWSER) {
  require("../../style/Header.scss");
}

export default class Header extends Component {
  render() {
    return (
      <div>
        <header className='portfolio-header'>
          <div className='portfolio-links'>
            <h1><IndexLink to='/' activeClassName='active'>Владимир Наседкин</IndexLink></h1>
            <h1><Link to='/badanina' activeClassName='active'>Татьяна Бададина</Link></h1>
          </div>
        </header>
      </div>
    );
  }
}

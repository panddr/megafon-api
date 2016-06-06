import React, { PropTypes, Component } from 'react';
import { IndexLink, Link } from 'react-router';

if (process.env.BROWSER) {
  require("../../style/HomePage.scss");
}

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <div className='portfolio-homepage'>
          <div className='portfolio-links'>
            <h1><Link to='/nasedkin' activeClassName='active'>Владимир Наседкин</Link></h1>
            <h1><Link to='/badanina' activeClassName='active'>Татьяна Баданина</Link></h1>
          </div>
        </div>
      </div>
    );
  }
}

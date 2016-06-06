import React, {PropTypes, Component} from 'react';
import EventItem from './EventItem';
import { Link } from 'react-router';

export default class BadaninaList extends Component {
  static propTypes = {
    events: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    uploadImage: React.PropTypes.func.isRequired
  };

  render() {
    const { events, userId, actions } = this.props;
    const badanina = events.filter(row => row.artist == 'badanina' );
    let editable = true;

    return (
      <section className='portfolio-project-list'>
        <header className='portfolio-header'>
          <div className='portfolio-links'>
            <h1><Link to='/nasedkin' activeClassName='active'>Владимир Наседкин</Link></h1>
            <h1><Link to='/badanina' activeClassName='active'>Татьяна Баданина</Link></h1>
          </div>
        </header>
        <div>
          <p className="bio">Татьяна Баданина родилась в 1955 году в г. Нижний Тагил, Урал. Училась на художественно-графическом факультете Нижнетагильского Государственного Педагогического Института (1973—1978).Учителя: Антоний В.П., Перевалов Л.И., Багаев И.И. Участник выставок с 1978 года.</p>          <ul>
            {badanina.slice(0,this.props.length).map((event, key) =>
              <EventItem key={key} row={key} id={event.id} event={event} editable={editable} uploadImage={this.props.uploadImage} {...actions} />
            )}
          </ul>
        </div>
      </section>
    );
  }
}

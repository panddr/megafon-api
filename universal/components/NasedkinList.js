import React, {PropTypes, Component} from 'react';
import { Link } from 'react-router';
import EventItem from './EventItem';

export default class NasedkinList extends Component {
  static propTypes = {
    events: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    uploadImage: React.PropTypes.func.isRequired
  };

  render() {
    const { events, userId, actions } = this.props;
    const nasedkin = events.filter(row => row.artist == 'nasedkin' );
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
          <p className="bio">Родился в городе Ивдель Свердловской области. В 1976 закончил художественно-графический факультет Нижнетагильского Государственного Педагогического Института. Учился у Перевалова Л. И. и Черепанова К. П. Работает совместно с женой, художницей Татьяной Баданиной. Дочь Анна Наседкина (1978 г. р.) — иконописец.</p>
          <ul>
            {nasedkin.slice(0,this.props.length).map((event, key) =>
              <EventItem key={key} row={key} id={event.id} event={event} editable={editable} uploadImage={this.props.uploadImage} {...actions} />
            )}
          </ul>
        </div>
      </section>
    );
  }
}

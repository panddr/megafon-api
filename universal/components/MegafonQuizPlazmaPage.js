import React, { PropTypes, Component } from 'react';
import { IndexLink, Link } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PulseActions from '../actions/PulseActions';

const timer = require('react-native-timer');
let TIME = 10;
let timerStarted = false;

if (process.env.BROWSER) {
  require("../../style/MegafonQuizPlazmaPage.scss");
}

export default class MegafonQuizPlazmaPage extends Component {
  static propTypes = {
    quizState: PropTypes.object.isRequired,
    initState: React.PropTypes.func.isRequired,
    startHelping: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      timer: TIME
    };
  }

  stopTimer() {
    timerStarted = false;
    let stopQuizState = this.props.quizState;
    stopQuizState.isHelping = false;
    this.props.startHelping(stopQuizState);
    this.setState({
      timer: TIME
    });

    console.log(this.props.quizState.isHelping)

    timer.clearInterval(this);
  }

  startTimer(timerStarted) {
    if (!timerStarted) {
      console.log(this.props.quizState.isHelping)
      timer.setInterval(this, 'countTimer', () => this.setState({
        timer: this.state.timer-1
      }), 1000);

      timer.setTimeout(this, 'showTimer', () => this.stopTimer(), 10000);
    }
  }

  handleInitState() {
    this.props.initState();
  }

  render() {
    if (this.props.quizState.isHelping) {
      this.startTimer(timerStarted);
      timerStarted = true;
    }

    return (
      <div>
        { this.props.quizState.isHelping ?
          <h1>{this.state.timer}</h1>
        :null}
        <div
          className = "button-reload"
          onClick = { this.handleInitState.bind(this) }>
          Обновить
        </div>
        { this.props.quizState.isAnswering && !this.props.quizState.isHelping ?
          <div>
            <h1>В каком году был проложен первый трансатлантический кабель связи?</h1>
          </div>
          :
          <ul className="megafon-quiz">
            {quiz.slice(0,this.props.length).map((question, index) =>
              <li
                className = "question"
                key = {index}>
                ?
              </li>
            )}
          </ul>
        }
      </div>
    );
  }
}


const quiz = [
  {
    question: "В каком году был проложен первый трансатлантический кабель связи?",
    answers: [
      {
        answer: '1896',
        correct: true
      },
      {
        answer: '1908',
        correct: false
      }
    ],
    isAnswered: false,
    isWrongAnswered: false,
    isCorrectAnwsered: false
  },
  {
    question: "В каком году был проложен первый трансатлантический кабель связи?",
    answers: [
      {
        answer: '1896',
        correct: true
      },
      {
        answer: '1908',
        correct: false
      }
    ],
    isAnswered: false,
    isWrongAnswered: false,
    isCorrectAnwsered: false
  },
  {
    question: "В каком году был проложен первый трансатлантический кабель связи?",
    answers: [
      {
        answer: '1896',
        correct: true
      },
      {
        answer: '1908',
        correct: false
      }
    ],
    isAnswered: false,
    isWrongAnswered: false,
    isCorrectAnwsered: false
  },
  {
    question: "В каком году был проложен первый трансатлантический кабель связи?",
    answers: [
      {
        answer: '1896',
        correct: true
      },
      {
        answer: '1908',
        correct: false
      }
    ],
    isAnswered: false,
    isWrongAnswered: false,
    isCorrectAnwsered: false
  },
  {
    question: "В каком году был проложен первый трансатлантический кабель связи?",
    answers: [
      {
        answer: '1896',
        correct: true
      },
      {
        answer: '1908',
        correct: false
      }
    ],
    isAnswered: false,
    isWrongAnswered: false,
    isCorrectAnwsered: false
  },
  {
    question: "В каком году был проложен первый трансатлантический кабель связи?",
    answers: [
      {
        answer: '1896',
        correct: true
      },
      {
        answer: '1908',
        correct: false
      }
    ],
    isAnswered: false,
    isWrongAnswered: false,
    isCorrectAnwsered: false
  },
  {
    question: "В каком году был проложен первый трансатлантический кабель связи?",
    answers: [
      {
        answer: '1896',
        correct: true
      },
      {
        answer: '1908',
        correct: false
      }
    ],
    isAnswered: false,
    isWrongAnswered: false,
    isCorrectAnwsered: false
  },
  {
    question: "В каком году был проложен первый трансатлантический кабель связи?",
    answers: [
      {
        answer: '1896',
        correct: true
      },
      {
        answer: '1908',
        correct: false
      }
    ],
    isAnswered: false,
    isWrongAnswered: false,
    isCorrectAnwsered: false
  },
  {
    question: "В каком году был проложен первый трансатлантический кабель связи?",
    answers: [
      {
        answer: '1896',
        correct: true
      },
      {
        answer: '1908',
        correct: false
      }
    ],
    isAnswered: false,
    isWrongAnswered: false,
    isCorrectAnwsered: false
  }
]

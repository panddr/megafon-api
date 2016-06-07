import React, { PropTypes, Component } from 'react';
import { IndexLink, Link } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PulseActions from '../actions/PulseActions';

if (process.env.BROWSER) {
  require("../../style/MegafonQuizPlazmaPage.scss");
}

export default class MegafonQuizTabletPage extends Component {
  static propTypes = {
    quizState: PropTypes.object.isRequired,
    startAnswering: React.PropTypes.func.isRequired,
    startHepling: React.PropTypes.func.isRequired
  }

  handleStartAnswering(index) {
    const { quizState } = this.props;
    let newQuizState = this.props.quizState;
    newQuizState.isAnswering = true;
    this.props.startAnswering(newQuizState);
  }

  handleStartHelping() {
    const { quizState } = this.props;
    let newQuizState = this.props.quizState;
    newQuizState.isHelping = true;
    this.props.startHelping(newQuizState);
  }

  render() {
    return (
      <div>
        { this.props.quizState.isAnswering ?
          <div>
            <a href="#">1896</a>
            <a href="#">1908</a>
            <a href="https://www.google.ru/" onClick={ this.handleStartHelping.bind(this) }>HELP</a>
          </div>
          :
          <ul className="megafon-quiz">
            {quiz.slice(0,this.props.length).map((question, index) =>
              <li
                className = "question"
                key = {index}
                onClick={ this.handleStartAnswering.bind(this, index) }>
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

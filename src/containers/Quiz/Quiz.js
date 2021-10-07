import React from 'react'
import './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import { connect } from 'react-redux'
import Loader from '../../components/UI/Loader/Loader'
import { fetchQuizById, quizAnswerClick, retryQuiz } from '../../store/actions/quizActions'

class Quiz extends React.Component {
    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.retryQuiz()
    }

    render() {
        return (
            <div className='Quiz'>
                <div className='QuizWrapper'>
                    <h1>Ответьте на все вопросы</h1>

                    {
                        this.props.loading || !this.props.quiz
                            ? <Loader />
                            : this.props.isFinished
                                ? <FinishedQuiz 
                                    results={this.props.results}
                                    quiz={this.props.quiz}
                                    onRetry={this.props.retryQuiz}
                                />
                                : <ActiveQuiz 
                                    question={this.props.quiz[this.props.activeQuestion].question}
                                    answers={this.props.quiz[this.props.activeQuestion].answers}
                                    onAnswerClick={this.props.quizAnswerClick}
                                    quizLength={this.props.quiz.length}
                                    questionNumber={this.props.activeQuestion + 1}
                                    state={this.props.answerState}
                                />
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
    quiz: state.quiz.quiz,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    isFinished: state.quiz.isFinished,
    loading: state.quiz.loading,
    results: state.quiz.results 
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)

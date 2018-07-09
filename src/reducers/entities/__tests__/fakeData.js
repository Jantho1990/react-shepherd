import { setQuestionId } from '../../../actions/questions'
import { setAnswerId } from '../../../actions/answers'

setQuestionId(2)
setAnswerId(2)

const testQuestions = [
  {
    id: 0,
    text: 'Is this not a question?',
    answers: []
  },
  {
    id: 1,
    text: 'Will this test ever end?',
    answers: [0, 1]
  }
]

const testAnswers = [
  {
    id: 0,
    text: 'Yes',
    questionId: 2
  },
  {
    id: 1,
    text: 'No',
    questionId: 2
  }
]

const testPlayers = [
  {
    id: 0,
    name: 'John Doe'
  },
  {
    id: 1,
    name: 'Finnegan Shaw'
  },
  {
    id: 2,
    name: 'Alicia Halibut'
  }
]

export const initialState = () => {
  return {
    answers: testAnswers,
    players: testPlayers,
    questions: testQuestions
  }
}
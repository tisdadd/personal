import React, { useState } from 'react'

// import logo from './logo.svg';
// import './App.css';
import questions from './all-questions.json'

import { Box, Typography, Button, FormControlLabel, Checkbox, FormGroup, Paper } from '@mui/material'

// simple shuffle from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function App() {

  const [orderedQuestions, setOrderedQuestions] = useState(questions)

  const [questionNumber, setQuestionNumber] = useState(0)

  const [selectedAnswers, setselectedAnswers] = useState([])

  const [checkingAnswer, setCheckingAnswer] = useState(false)

  const { question, answers, explanation } = orderedQuestions[questionNumber]

  const swapSelectedAnswer = (index) => {
    let newSelectedAnswers = [...selectedAnswers]
    newSelectedAnswers[index] = !newSelectedAnswers[index]
    setselectedAnswers(newSelectedAnswers)
  }

  // simple question status reset
  const reset = () => {
    setselectedAnswers([])
    setCheckingAnswer(false)
  }

  const advance = () => {
    reset()
    setQuestionNumber((questionNumber + 1) % questions.length)
  }

  // simple shuffle from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  const shuffleQuestions = () => {
    const newArray = [...questions]
    shuffleArray(newArray)
    setOrderedQuestions(newArray)
  }

  const answerWidgets = answers.map(({ text, isRealAnswer }, index) => {
    let color
    const selected = selectedAnswers[index] || false
    if (checkingAnswer) {
      if (isRealAnswer && selected) {
        color = 'green'
      }

      if ((isRealAnswer && !selected) || !isRealAnswer && selected) {
        color = 'red'
      }
    }
    return <FormControlLabel style={{ backgroundColor: color }} key={index} control={<Checkbox checked={selected} onChange={() => {
      swapSelectedAnswer(index)
    }} />} label={text} />
  })

  return (
    <Box m={3} maxWidth='50rem'>
      <Button onClick={shuffleQuestions}>Shuffle Questions</Button>
      <Box>
        <Typography variant="h4">Question</Typography>
      </Box>
      <Paper>
        <Typography>{question}</Typography>
        <Box>
          <FormGroup>
            {answerWidgets}
          </FormGroup>
        </Box>
      </Paper>
      {!checkingAnswer && <Button onClick={() => { setCheckingAnswer(true) }}>Check Answer</Button>}
      {checkingAnswer && <Box><Button onClick={() => { advance() }}>Next Question</Button><Typography>{explanation}</Typography></Box>}

    </Box>
  )
}

export default App;

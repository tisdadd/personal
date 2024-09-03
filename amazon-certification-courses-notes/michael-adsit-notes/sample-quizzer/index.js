const util = require('util')
const fs = require('fs')
const arrayOfRegexGroupStrings = require('./arrayOfRegexGroupStrings')
const glob = require('glob')

const promiseGlob = util.promisify(glob)


const MAIN_REGEX = /Question: (.*?)(- \[.\].*?)Explanation:[ ]?(.*?)\n/gs // a regular expression that gathers questions and explanations
const ANSWER_EXTRACTOR_REGEX = /- \[(.)][ ]?(.*)/gm // checking if there is a filled in answer, as well as the answer text

// extracts the answers into a standard format
function extractAnswers(fullAnswerText) {
    const answersArray = arrayOfRegexGroupStrings(fullAnswerText, ANSWER_EXTRACTOR_REGEX, [1, 2])
    return answersArray.map(([filledInCharacter, text]) => {
        return {
            isRealAnswer: filledInCharacter !== ' ',
            text
        }
    })
}

// converts an array of text to a standard question.
function questionTextArrayToFormedQuestion(textArray) {
    return {
        question: textArray[0].trim(),
        answers: extractAnswers(textArray[1]),
        explanation: textArray[2].trim()
    }
}

// gets the questions from the files, and standardizes them
function fileToQuestions(filePath) {
    const fileBuffer = fs.readFileSync(filePath)
    const fileText = fileBuffer.toString()
    const questionsFound = arrayOfRegexGroupStrings(fileText, MAIN_REGEX, [1, 2, 3])
    return questionsFound.map(question => {
        return questionTextArrayToFormedQuestion(question)
    })
}

async function generateQuestions() {
    const files = await promiseGlob('../amazon-certification-courses-notes/**/questions-with-answers.md')
    let questions = []
    files.forEach((fileString) => {
        questions = [...questions, ...fileToQuestions(fileString)]
    })
    const stringified = JSON.stringify(questions)
    fs.writeFileSync('./all-questions.json', stringified)
    fs.writeFileSync('./react-front-end/src/all-questions.json', stringified)
}

generateQuestions()
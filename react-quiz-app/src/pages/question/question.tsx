import React from 'react'
import type { RootState } from '../../store'
import { decode } from 'html-entities'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router'
import { updateScore } from '../../slices/question.slices'
import { DIFFICULTY_TIME } from '../../config'
import type { IQuestion } from '../../types'
import { formatTimer } from '../../utils/formatTimer'

const Question = () => {
	const [questions, setQuestions] = React.useState<IQuestion[]>([])
	const [questionIndex, setQuestionIndex] = React.useState(0)
	const [options, setOptions] = React.useState<string[]>([])

	const formQuestions = useSelector((state: RootState) => state.question.form)
	const { category, difficulty, type, amount } = formQuestions
	const [countTime, setCountTime] = React.useState(DIFFICULTY_TIME[difficulty || 'easy'])

	const score = useSelector((state: RootState) => state.question.score)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	React.useEffect(() => {
		if (!category || !difficulty || !type || !amount) {
			return
		}

		const fetchQuestion = async () => {
			try {
				const res = await fetch(
					`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`,
				)
				const data = await res.json()
				const result = data.results || []
				const questionItem = result[questionIndex]
				const dataOptions = [...questionItem.incorrect_answers]
				dataOptions.splice(Math.floor(Math.random() * 4), 0, questionItem.correct_answer)
				setOptions(dataOptions)
				setQuestions(result)
			} catch (err) {
				console.error(err)
			}
		}

		fetchQuestion()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formQuestions])

	// handle answer of next question
	React.useEffect(() => {
		if (questionIndex === 0) return
		const questionItem = questions[questionIndex]
		const dataOptions = [...questionItem.incorrect_answers]
		dataOptions.splice(Math.floor(Math.random() * 4), 0, questionItem.correct_answer)
		setOptions(dataOptions)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [questionIndex])

	React.useEffect(() => {
		const timer = setInterval(() => {
			setCountTime(prev => {
				if (prev > 0) {
					return prev - 1
				}

				// random answer option when time out
				const randomContent = options[Math.floor(Math.random() * 4)]
				handleAnswer(randomContent)()
				return DIFFICULTY_TIME[difficulty || 'easy']
			})
		}, 1000)

		return () => {
			clearInterval(timer)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [options])

	// handle next question and update score
	const handleAnswer = (option: string) => () => {
		const correctAnswer = questions[questionIndex].correct_answer
		if (option === correctAnswer) {
			dispatch(updateScore())
		}

		if (questions.length - 1 === questionIndex) {
			navigate('/final-score')
			return
		}

		setQuestionIndex(prev => prev + 1)
	}

	const handleGoToDashboard = () => {
		navigate('/')
	}
	return (
		<>
			<Box>
				<Typography variant="h4" align="center">
					{`Question ${questionIndex + 1}`}
				</Typography>
				<>
					{questions.length === 0 ? (
						<Box sx={{ mt: 5, textAlign: 'center' }}>
							Please go to dashboard to config question. <br />
							<br />
							<Button variant="contained" sx={{ mb: 2 }} onClick={handleGoToDashboard}>
								Go to dashboard
							</Button>
						</Box>
					) : (
						<>
							<Box sx={{ mt: 3 }}>
								<Typography variant="body1">{decode(questions[questionIndex].question || '')}</Typography>
							</Box>
							<Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
								{options.map(option => (
									<Button key={option} variant="contained" fullWidth onClick={handleAnswer(option)}>
										{decode(option)}
									</Button>
								))}
							</Box>
							<Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
								<Typography variant="body1">Score: {score} </Typography>
								<Typography variant="body1" sx={{ color: countTime < 10 ? 'red' : '' }}>
									Timer: {formatTimer(countTime)}
								</Typography>
							</Box>
						</>
					)}
				</>
			</Box>
		</>
	)
}

export default Question

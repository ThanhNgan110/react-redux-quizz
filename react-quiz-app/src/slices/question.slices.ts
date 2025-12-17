import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface FormState {
	category: number
	difficulty: string
	type: string
	amount: number
}

interface QuestionState {
	form: FormState
	score: number
}

const initialState: QuestionState = {
	form: {
		category: 0,
		difficulty: '',
		type: '',
		amount: 0,
	},
	score: 0,
}

export const questionSlice = createSlice({
	name: 'question',
	initialState,
	reducers: {
		setCategory: (state, action: PayloadAction<number>) => {
			state.form.category = action.payload
		},

		setDifficulty: (state, action: PayloadAction<string>) => {
			state.form.difficulty = action.payload
		},

		setType: (state, action: PayloadAction<string>) => {
			state.form.type = action.payload
		},

		setAmount: (state, action: PayloadAction<number>) => {
			state.form.amount = action.payload
		},

		updateScore: state => {
			state.score = state.score + 1
		},
	},
})

export const { setCategory, setDifficulty, setType, setAmount, updateScore } = questionSlice.actions
export default questionSlice.reducer

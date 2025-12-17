import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface IMember {
	firstName: string
	lastName: string
	email: string
	score: number
}

interface LeaderboardState {
	members: IMember[]
}

const initialState: LeaderboardState = {
	members: [],
}

export const leaderboardSlice = createSlice({
	name: 'leaderboard',
	initialState,
	reducers: {
		setMembers: (state, action: PayloadAction<IMember>) => {
			state.members.push(action.payload)
		},
	},
})

export const { setMembers } = leaderboardSlice.actions
export default leaderboardSlice.reducer

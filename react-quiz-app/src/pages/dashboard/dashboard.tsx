import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Controller, useForm, type SubmitHandler } from 'react-hook-form'
import { setAmount, setCategory, setDifficulty, setType } from '../../slices/question.slices'
import type { ICategory } from '../../types'

interface IFormInput {
	category: number
	difficulty: string
	type: string
	amount: number
}

const Dashboard = () => {
	const [categories, setCategories] = React.useState<ICategory[]>([])
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>({
		defaultValues: {},
	})

	React.useEffect(() => {
		const fetchCategory = async () => {
			const res = await fetch('https://opentdb.com/api_category.php')
			const data = await res.json()
			setCategories(data.trivia_categories || [])
		}
		fetchCategory()
	}, [])

	const onSubmit: SubmitHandler<IFormInput> = () => {
		navigate('/question')
	}

	return (
		<Box>
			<Typography variant="h2" align="center" sx={{ mb: 3 }}>
				Quiz App
			</Typography>

			<form onSubmit={handleSubmit(onSubmit)}>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
					<FormControl fullWidth error={!!errors.category}>
						<InputLabel>Category</InputLabel>
						<Controller
							name="category"
							control={control}
							rules={{ required: 'Category is required' }}
							render={({ field }) => (
								<Select
									{...field}
									label="Category"
									onChange={e => {
										field.onChange(e)
										dispatch(setCategory(Number(e.target.value)))
									}}
								>
									{categories.map(item => (
										<MenuItem key={item.id} value={item.id}>
											{item.name}
										</MenuItem>
									))}
								</Select>
							)}
						/>
						{errors.category && (
							<Typography variant="caption" color="error">
								{errors.category.message}
							</Typography>
						)}
					</FormControl>

					<FormControl fullWidth error={!!errors.difficulty}>
						<InputLabel>Difficulty</InputLabel>
						<Controller
							name="difficulty"
							control={control}
							rules={{ required: 'Difficulty is required' }}
							render={({ field }) => (
								<Select
									{...field}
									label="Difficulty"
									onChange={e => {
										field.onChange(e)
										dispatch(setDifficulty(e.target.value))
									}}
								>
									<MenuItem value="easy">Easy</MenuItem>
									<MenuItem value="medium">Medium</MenuItem>
									<MenuItem value="hard">Hard</MenuItem>
								</Select>
							)}
						/>
						{errors.difficulty && (
							<Typography variant="caption" color="error">
								{errors.difficulty.message}
							</Typography>
						)}
					</FormControl>

					<FormControl fullWidth error={!!errors.type}>
						<InputLabel>Type</InputLabel>
						<Controller
							name="type"
							control={control}
							rules={{ required: 'Type is required' }}
							render={({ field }) => (
								<Select
									{...field}
									label="Type"
									onChange={e => {
										field.onChange(e)
										dispatch(setType(e.target.value))
									}}
								>
									<MenuItem value="multiple">Multiple Choice</MenuItem>
									<MenuItem value="boolean">True / False</MenuItem>
								</Select>
							)}
						/>
						{errors.type && (
							<Typography variant="caption" color="error">
								{errors.type.message}
							</Typography>
						)}
					</FormControl>

					<TextField
						{...register('amount', {
							required: 'Amount is required',
						})}
						error={!!errors.amount}
						label="Amount of questions"
						type="text"
						fullWidth
						onChange={e => dispatch(setAmount(Number(e.target.value)))}
					/>
				</Box>

				<Box sx={{ textAlign: 'center', mt: 3 }}>
					<Button variant="contained" type="submit">
						GET STARTED
					</Button>
				</Box>
			</form>
		</Box>
	)
}

export default Dashboard

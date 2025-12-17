import { useNavigate } from 'react-router'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../store'
import { setMembers } from '../../slices/leaderboard.slices'
import type { IMember } from '../../types'

const FinalScore = () => {
	const navigate = useNavigate()
	const score = useSelector((state: RootState) => state.question.score)
	const dispatch = useDispatch()

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<IMember>()

	const onSubmit = (data: Omit<IMember, 'score'>) => {
		const dataMember: IMember = {
			...data,
			score,
		}

		dispatch(setMembers(dataMember))
		navigate('/leader-board')
	}
	
	return (
		<>
			<Box>
				<Typography variant="h4" align="center">
					Final Score: {score}
				</Typography>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 5 }}>
						<TextField
							{...register('firstName', { required: 'First name is required' })}
							id="standard-basic"
							label="First Name"
							variant="standard"
							error={!!errors.firstName}
							helperText={errors.firstName?.message}
						/>
						<TextField
							{...register('lastName', { required: 'Last name is required' })}
							id="standard-basic"
							label="Last Name"
							variant="standard"
							error={!!errors.lastName}
							helperText={errors.lastName?.message}
						/>
						<TextField
							{...register('email', { required: 'Email is required' })}
							id="standard-basic"
							label="Email Address"
							variant="standard"
							error={!!errors.email}
							helperText={errors.email?.message}
						/>
					</Box>
					<Box sx={{ display: 'flex', justifyContent: 'right' }}>
						<Button type="submit" variant="contained" size="small">
							Submit
						</Button>
					</Box>
				</form>
			</Box>
		</>
	)
}

export default FinalScore

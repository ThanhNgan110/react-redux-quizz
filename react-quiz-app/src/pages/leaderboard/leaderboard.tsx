import {
	Box,
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material'

import { CSVLink } from 'react-csv'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store'

const LeaderBoard = () => {
	const members = useSelector((state: RootState) => state.leaderboard.members)

	return (
		<>
			<Box>
				<Typography variant="h4" align="center">
					Leader Board
				</Typography>
			</Box>
			<Box sx={{ display: 'flex', justifyContent: 'end', mb: 4 }}>
				<CSVLink data={members}>
					<Button variant="contained">EXPORT CSV</Button>
				</CSVLink>
			</Box>
			<Box>
				<TableContainer component={Paper}>
					<Table sx={{ width: '100%' }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>First Name</TableCell>
								<TableCell>Last Name</TableCell>
								<TableCell>Email</TableCell>
								<TableCell>Score</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
								<TableCell component="th" scope="row">
									Thai
								</TableCell>
								<TableCell>Thanh</TableCell>
								<TableCell>Ngan</TableCell>
								<TableCell>10</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</>
	)
}

export default LeaderBoard

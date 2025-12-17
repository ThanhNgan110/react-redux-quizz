import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'

const Header = () => {
	return (
		<Box>
			<AppBar position="static">
				<Toolbar>
					<Typography component="div" variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }}>
						Quiz App
					</Typography>
					<Button color="inherit">Leader Board</Button>
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default Header

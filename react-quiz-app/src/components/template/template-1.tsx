import Header from '../header/header'
import { Outlet } from 'react-router'
import Container from '@mui/material/Container'

const Template = () => {
	return (
		<>
			<Header />
			<Container maxWidth='md' sx={{marginTop: 7}}>
				<Outlet />
			</Container>
		</>
	)
}

export default Template

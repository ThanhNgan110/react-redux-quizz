import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
//pages
import Dashboard from './pages/dashboard'
import Question from './pages/question'
import LeaderBoard from './pages/leaderboard'

// templates
import Template from './components/template/template-1'
import FinalScore from './pages/final-score'

function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			Component: Template,
			children: [
				{ index: true, element: <Navigate to={'/dashboard'}/>},
				{
					path: '/dashboard',
					Component: Dashboard,
				},
				{
					path: '/question',
					Component: Question,
				},
					{
					path: '/leader-board',
					Component: LeaderBoard,
				},
				{
					path: '/final-score',
					Component: FinalScore,
				},
			],
		},
	])

	return (
		<>
			<RouterProvider router={router} />
		</>
	)
}

export default App

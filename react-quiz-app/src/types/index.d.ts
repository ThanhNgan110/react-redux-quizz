interface ICategory {
	id: number
	name: string
}

interface IQuestion {
	type: string
	difficulty: string
	category: string
	question: string
	correct_answer: string
	incorrect_answers: string[]
}

interface IDifficultyTime {
	[key: string]: number
}

interface IMember {
	firstName: string
	lastName: string
	email: string
	score: number
}

export {ICategory, IQuestion, IDifficultyTime, IMember}
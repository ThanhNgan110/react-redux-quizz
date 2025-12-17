/*
input: 30
output: 0:30

*/

const formatTimer = (time: number) => {
	if (!time) return `0:00`

	const minutes = Math.floor(time / 60)
	const second = time % 60
	const prefix = second < 10 ? '0': ''
	return `${minutes} : ${prefix}${second}`
}

export { formatTimer }

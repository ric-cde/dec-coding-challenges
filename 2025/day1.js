import { readFile } from "node:fs/promises"
const rotations = await readFile("./Day1/input.txt", "utf-8")

function convertRotation(rotation) {
	const isIncrease = rotation[0] === "R" ? true : false
	const dist = Number(rotation.slice(1))
	return isIncrease ? dist : -dist
}

const distances = rotations
	.split("\n")
	.flatMap((r) => (r[0] === "R" || r[0] === "L" ? convertRotation(r) : []))

const startPosition = 50
let position = startPosition
let zeroCount = 0

distances.forEach((dist) => {
	for (let i = 0; i < Math.abs(dist); i++) {
		const amount = dist > 0 ? 1 : -1
		position = (position + amount + 100) % 100
		if (position === 0) zeroCount++
	}
})

console.log("zeroes:", zeroCount)

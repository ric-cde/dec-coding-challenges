import { readFileSync } from "node:fs"
const input = readFileSync("./Day3/sample.txt", "utf-8")

function processLines(lines, fn) {
	return lines
		.split("\n")
		.reduce((acc, line) => acc + fn(line.trim().split("")), 0)
}

function findMaxTwoDigit(bank) {
	let highest = 0
	const length = bank.length

	for (let i = 0; i < length - 1; i++) {
		for (let j = i + 1; j < length; j++) {
			const num = +(bank[i] + bank[j])
			if (num > highest) highest = num
		}
	}
	return highest
}

function findMax(bank) {
	const length = bank.length

	return bank
		.trim()
		.split("")
		.reduce((acc, val) => (+val > acc ? +val : acc), 0)
}

function findMaxCustom(bank, digits) {
	if (digits === 1) return [bank[0]]

	const length = bank.length

	// find biggest digit in current sequence
	const max = bank
		.trim()
		.split("")
		.reduce((acc, val) => (+val > +acc ? val : acc), 0)
	
	findMax(bank)
	findMaxCustom(bank, digits - 1)
}

function findMaxTwelveDigit(bank) {
	// console.log(`Bank: ${bank}`)
	let highest = 0
	const trimmedBank = bank.trim()
	const length = trimmedBank.length

	for (let i = length - 1; i > 1; i--) {
		for (let j = i - 1; j > 0; j--) {
			for (let k = j - 1; k > -1; k--) {
				let combination = trimmedBank.split("")
				combination.splice(i, 1)
				combination.splice(j, 1)
				combination.splice(k, 1)

				const num = +combination.join("")
				// console.log(num)
				if (num > highest) highest = num
			}
		}
	}
	// console.log(`Highest: ${highest} \n`)
	return highest
}

console.log(processLines(input, findMaxTwoDigit))

// console.log(processBanks(input, findMaxTwelveDigit))

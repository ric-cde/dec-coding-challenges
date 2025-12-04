import { readFileSync } from "node:fs"
const input = readFileSync("./Day2/input.txt", "utf-8")

function processRange(range, checkId) {
	const [start, finish] = range.split("-")
	let rangeNums = []

	for (let n = +start; n <= +finish; n++) {
		rangeNums.push(n)
	}
	return rangeNums.filter((n) => checkId(n))
}

function checkMalformed(n) {
	const nStr = n.toString()
	const length = nStr.length
	if (length % 2 !== 0) return false

	const firstHalf = nStr.slice(0, length / 2)
	const secondHalf = nStr.slice(length / 2, length)

	if (firstHalf === secondHalf) return true

	return false
}

function checkMalformedAny(n) {
	const nStr = n.toString()
	const length = nStr.length

	// test patterns of length 1 character up to half the length of the string, where i is character count
	for (let i = 1; i <= Math.floor(length / 2); i++) {
		if (length % i !== 0) continue

		for (let j = 0; j < length - i; j += i) {
			const middle = j + i
			const end = middle + i
			const firstStr = nStr.slice(j, middle)
			const secondStr = nStr.slice(middle, end)

			if (firstStr !== secondStr) break

			// if we make it to the end without breaking, we have a matching pattern
			if (end === length) {
				return true
			}
		}
	}
	return false
}

function sumBadIds(ranges) {
	const listOfRanges = ranges.split(",")
	let palindromeIds = []
	let patternIds = []

	for (const range of listOfRanges) {
		palindromeIds = [
			...palindromeIds,
			...processRange(range, checkMalformed),
		]
		patternIds = [...patternIds, ...processRange(range, checkMalformedAny)]
	}

	const sumOfPalindromeIds = palindromeIds.reduce((acc, val) => acc + val, 0)
	console.log("sum of bad IDs for part 1:", sumOfPalindromeIds)
	const sumOfPatternIds = patternIds.reduce((acc, val) => acc + val, 0)
	console.log("sum of bad IDs for part 2:", sumOfPatternIds)
}

sumBadIds(input)

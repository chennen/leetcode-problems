

// generate more solutions by
// * add another ( to existing solution
// * close one or more () and add another (
// can finalize solutions by adding )s to close all unclosed (s


// Helpers!

// return a function that takes ...args
// calls all functions in fns array passing same ...args
// runs conv fn using the fns return values as arguments
const converge = (conv, fns) => (...args) => conv(...fns.map(f => f(...args)))

const countCharsInString = searchChar => searchString => [...searchString].filter(x => x == searchChar).length

// ex: countUnclosed("(((") => 3
const countUnclosed = converge(
    (leftParenCount, rightParenCount) => leftParenCount - rightParenCount,
    [
        countCharsInString('('),
        countCharsInString(')'),
    ])

// just count the '('s and ')'s and subtract
// assume s contains only ( and ) chars
const closeAllUnclosed = s => {
    const count = countUnclosed(s)
    return count == 0 ? s : s.padEnd(s.length + count, ')')
}

const notAllClosed = s => countUnclosed(s) > 0

const closeUnclosedNewSolutions = solutions => {
 const oneMoreClosed = solutions.filter(notAllClosed).map(s => s + ')') 
 return oneMoreClosed.length > 0 ? [...oneMoreClosed, ...closeUnclosedNewSolutions(oneMoreClosed)] : []
}

// Solution!

// start with a single '(' if no solutions yet
// tack on a single '(' to all new solutions
const generateNewSolutions = solutions =>
    solutions.length == 0 ? ['(']
        : [...solutions, ...closeUnclosedNewSolutions(solutions)].map(s => s + '(')

const generateParenthesesR = solutions => n =>
    n == 0 ?  solutions.map(closeAllUnclosed)
        : generateParenthesesR(generateNewSolutions(solutions))(n-1)

const generateParentheses = generateParenthesesR([])

console.log(generateParentheses(5))
console.log(generateParentheses(3))
console.log(generateParentheses(1))
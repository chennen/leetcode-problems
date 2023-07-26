// All available tables - probably the result of some db query or API call?
// Make sure these are sorted in descending order
const allTables = [6, 6, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2]

const testCases = [7, 1, 0, 2, 10, 50, 13, 21, -2]

// library fn
const uniq = arr => arr.filter((x, i) => arr.indexOf(x) === i)

const tableSizes = uniq(allTables)
const smallestTable = tableSizes.slice(-1)

const getTables = n => {

    const result = 
        allTables.reduce(({usedTables, peopleRemaining}, currTable, i) => {
            const morePeopleThanThisTable = peopleRemaining >= currTable
            const lastPeopleCanFitOnThisTable = peopleRemaining > 0 && peopleRemaining < currTable
            
            const nextSmallestTable = currTable === smallestTable ?
                currTable : tableSizes[tableSizes.indexOf(currTable) + 1]
            
            const isLastTableAvailable = i === allTables.length - 1
            
            const lastPeopleCanFitOnSmallerTable = peopleRemaining <= nextSmallestTable
            const smallerTableIsBetter = peopleRemaining < currTable && lastPeopleCanFitOnSmallerTable && !isLastTableAvailable
            
            const canUseThisTable = morePeopleThanThisTable ||
                (lastPeopleCanFitOnThisTable && !smallerTableIsBetter)

            //console.log("people remaining: ", peopleRemaining)
            //console.log("lastPeopleCanFit", lastPeopleCanFitOnThisTable)
            //console.log("smallerTableIsBetter", smallerTableIsBetter)
            //console.log("canUseTable: ", canUseThisTable)

            const newUsedTables = canUseThisTable ? [...usedTables, currTable] : usedTables
            const newPeopleRemaining = canUseThisTable ? peopleRemaining - currTable : peopleRemaining

            return {
                'usedTables': newUsedTables,
                'peopleRemaining': newPeopleRemaining,
            }
        }
            , {
                'usedTables': [],
                'peopleRemaining': n,
            })

    // everybody seated?
    return result.peopleRemaining < 1 ? result.usedTables : []
}


// test cases:
testCases.forEach(n => console.log(n, ' ', getTables(n)))
// getTables(2)) => [2]
// getTables(10)) => [6, 4]
// getTables(50)) => []
// getTables(13)) => [6, 6, 4]
// getTables(21)) => [6, 6, 4, 4, 4]

// getTables(-2)) => []

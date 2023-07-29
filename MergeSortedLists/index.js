// there is no "linked list" type in JS, let's build one
const listNode = (value, next) => ({
    value: value || 0,
    next,
})
const hasNext = node => node.next != null


// update the last node's "next" value by mutating the last node
// i really don't like this datastructure. :P
const addNodeUnsafe = (list, addNode) => {
    if (hasNext(list) && !hasNext(list.next)) {
        list.next = listNode(list.next.value, addNode)
    }  else {
        addNodeUnsafe(list.next, addNode)
    }
}

// library fn for arrays
const partition = predicate => arr => arr.reduce(([truthy, falsey], x) => 
    predicate(x) ? [[...truthy, x], falsey] : [truthy, [...falsey, x]],
    [[],[]])

const mergeListsR = result => lists => {
    // probably should be a property on LL
    const nonEmptyLists = lists.filter(l => l.hasOwnProperty('value'))

    if (nonEmptyLists.length === 0) return result

    const smallestValue = nonEmptyLists.reduce((min, l) => l.value < min ? l.value : min, Number.POSITIVE_INFINITY)

    const [listsWithSmallest, listsWithBigger] = partition(node => node.value === smallestValue)(nonEmptyLists)

    const moveAlongSmallestValues = listsWithSmallest.filter(hasNext).map(x => x.next)

    const newLists = [...moveAlongSmallestValues, ...listsWithBigger]

    const listToAppend = listsWithSmallest.reduce((linked, l) => listNode(l.value, linked), null)

    // This should probabyl be part of the `addNodeUnsafe` fn
    if (result.hasOwnProperty('value')) {
        addNodeUnsafe(result, listToAppend)
    } else {
        result = listToAppend
    }

    return mergeListsR(result)(newLists)

}

// here's the solution:
const mergeLists = mergeListsR({})


const linkedListToArrayR = arr => list =>
    list.hasOwnProperty('value') ?
        hasNext(list) ? linkedListToArrayR([...arr, list.value])(list.next) : [...arr, list.value]
    : arr

const linkedListToArray = linkedListToArrayR([])


const testCases = [
    [
        listNode(1, listNode(4, listNode(5, null))),  // [1, 4, 5]
        listNode(1, listNode(3, listNode(4, null))),  // [1, 3, 4]
        listNode(2, listNode(6, null)),  // [2, 6]
    ], // => [1, 1, 2, 3, 4, 4, 5, 6]
]


// run the tests
testCases
    .map(lists => [lists, mergeLists(lists)])
    .forEach(([lists, merged]) => console.log("Test Case:", lists.map(linkedListToArray), "\nSolution:", linkedListToArray(merged)))
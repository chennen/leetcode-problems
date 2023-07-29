# Merge k Sorted Lists

You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

 

### Example 1:

Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6

### Example 2:

Input: lists = []
Output: []

### Example 3:

Input: lists = [[]]
Output: []
 

Constraints:

k == lists.length
0 <= k <= 104
0 <= lists[i].length <= 500
-104 <= lists[i][j] <= 104
lists[i] is sorted in ascending order.
The sum of lists[i].length will not exceed 104.



## Solution Notes
- Linked List is a terrible structure - can't really append values without mutation
- Prepending to a list is easier than appending
- 80% of the time to solve this was figuring out why the `addNodeUnsafe` function wasn't working - passing references and mutating the parameters is a pretty confusing practice
- This problem doesn't really work on leetcode because the test code passes an array into the function (which is a much more sane data structure but w/e). I guess we could turn the arrays into LLs ourselves before solving the problem?
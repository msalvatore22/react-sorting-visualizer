export const mergeSort = array => {
  if (array.length === 1) return array
  // find the middle index of the array to split array into 2
  const middleIdx = Math.floor(array.length / 2)
  // slice the array and pass each half back into function recursively to be sorted
  const firstHalf = mergeSort(array.slice(0, middleIdx))
  const secondHalf = mergeSort(array.slice(middleIdx))
  // initialize array to store sorted values
  const sortedArray = []
  // initialize index variables
  let i = 0
  let j = 0

  // loop through each half to push lesser values
  while (i < firstHalf.length && j < secondHalf.length){
    if(firstHalf[i] < secondHalf[j]){
      sortedArray.push(firstHalf[i++])
    } else {
      sortedArray.push(secondHalf[j++])
    }
  }
  while(i < firstHalf.length) sortedArray.push(firstHalf[i++])
  while(j < secondHalf.length) sortedArray.push(secondHalf[j++])
  return sortedArray
}

// [4,9,2,7,6,10]
// [4,9,2]  [7,6,10]


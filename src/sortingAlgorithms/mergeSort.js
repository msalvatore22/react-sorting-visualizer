// export const mergeSort = array => {
//   if (array.length === 1) return array
//   // find the middle index of the array to split array into 2
//   const middleIdx = Math.floor(array.length / 2)
//   // slice the array and pass each half back into function recursively to be sorted
//   const firstHalf = mergeSort(array.slice(0, middleIdx))
//   const secondHalf = mergeSort(array.slice(middleIdx))
//   // initialize array to store sorted values
//   const sortedArray = []
//   // initialize index variables
//   let i = 0
//   let j = 0

//   // loop through each half to push lesser values
//   while (i < firstHalf.length && j < secondHalf.length){
//     if(firstHalf[i] < secondHalf[j]){
//       sortedArray.push(firstHalf[i++])
//     } else {
//       sortedArray.push(secondHalf[j++])
//     }
//   }
//   while(i < firstHalf.length) sortedArray.push(firstHalf[i++])
//   while(j < secondHalf.length) sortedArray.push(secondHalf[j++])
//   return sortedArray
// }

export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const copy = array.slice();
  const auxiliaryArray = array.slice();
  mergeSortHelper(copy, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push({
      "barOneIdx": i,
      "barOneVal": auxiliaryArray[i],
      "barTwoIdx": j,
      "barTwoVal": auxiliaryArray[j],
      "swap": false
    })

    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push({
        "barOneIdx": k,
        "barOneVal": auxiliaryArray[i],
        "barTwoIdx": k,
        "barTwoVal": auxiliaryArray[i],
        "swap": true
      })

      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push({
        "barOneIdx": k,
        "barOneVal": auxiliaryArray[j],
        "barTwoIdx": k,
        "barTwoVal": auxiliaryArray[j],
        "swap": true
      })

      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {

    animations.push({
      "barOneIdx": i,
      "barOneVal": auxiliaryArray[i],
      "barTwoIdx": i,
      "barTwoVal": auxiliaryArray[i],
      "swap": false
    })
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push({
      "barOneIdx": k,
      "barOneVal": auxiliaryArray[i],
      "barTwoIdx": k,
      "barTwoVal": auxiliaryArray[i],
      "swap": true
    })
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push({
      "barOneIdx": j,
      "barOneVal": auxiliaryArray[j],
      "barTwoIdx": j,
      "barTwoVal": auxiliaryArray[j],
      "swap": false
    })
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push({
      "barOneIdx": k,
      "barOneVal": auxiliaryArray[j],
      "barTwoIdx": k,
      "barTwoVal": auxiliaryArray[j],
      "swap": true
    })
    mainArray[k++] = auxiliaryArray[j++];
  }
}


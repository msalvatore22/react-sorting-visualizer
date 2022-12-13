export const getBubbleSortAnimations = (arr) => {
  const copy = [...arr]
  const len = copy.length
  const animations = []
  bubbeSort(copy, len, animations)
  return animations
}

export const bubbeSort = (arr, len, animations) => {
  
  for(var i = 0; i < len; i++){
     
    // Last i elements are already in place 
    for(var j = 0; j < ( len - i - 1 ); j++){
      // Checking if the item at present iteration
      // is greater than the next iteration

      animations.push([[[j, arr[j]], [j+1, arr[j+1]]], false])
      if(arr[j] > arr[j+1]){
        
        // If the condition is true then swap them
        animations.push([[[j, arr[j+1]], [j+1, arr[j]]], true])
        var temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j+1] = temp
      }
    }
  }
  // Print the sorted array
  // console.log(arr)
 }
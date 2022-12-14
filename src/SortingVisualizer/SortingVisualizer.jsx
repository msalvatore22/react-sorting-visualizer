import React from 'react';
import './SortingVisualizer.css'
import { getMergeSortAnimations } from '../sortingAlgorithms/mergeSort';
import { getBubbleSortAnimations } from '../sortingAlgorithms/bubbleSort';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 10;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 100;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'aqua';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

const SWAP_COLOR = 'green';

export default class SortingVisualizer extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      array: []
    }
  }

  componentDidMount(){
    this.resetArray()
  }

  resetArray(){
    const array = []

    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++){
      array.push(randomIntFromInterval(5, 680))
    }
    this.setState({array})
  }

  bubbleSort(){
    const animations = getBubbleSortAnimations(this.state.array)
    this.runAnimations(animations)
  }

  mergeSort(){
    const animations = getMergeSortAnimations(this.state.array);
    console.log(animations)
    this.runAnimations(animations)
    // // console.log(animations)
    // for (let i = 0; i < animations.length; i++) {
    //   const arrayBars = document.getElementsByClassName('array-bar');
    //   const isColorChange = i % 3 !== 2;
    //   if (isColorChange) {
    //     const [barOneIdx, barTwoIdx] = animations[i];
    //     const barOneStyle = arrayBars[barOneIdx].style;
    //     const barTwoStyle = arrayBars[barTwoIdx].style;
    //     const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
    //     setTimeout(() => {
    //       barOneStyle.backgroundColor = color;
    //       barTwoStyle.backgroundColor = color;
    //     }, i * ANIMATION_SPEED_MS);
    //   } else {
    //     setTimeout(() => {
    //       const [barOneIdx, newHeight] = animations[i];
    //       const barOneStyle = arrayBars[barOneIdx].style;
    //       barOneStyle.height = `${newHeight}px`;
    //     }, i * ANIMATION_SPEED_MS);
    //   }
    // }
  }

  runAnimations(animations){
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const { barOneIdx, barOneVal, barTwoIdx, barTwoVal, swap } = animations[i]
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      if(swap){
        setTimeout(() => {
          barOneStyle.backgroundColor = SWAP_COLOR;
          barTwoStyle.backgroundColor = SWAP_COLOR;
          barOneStyle.height = `${barOneVal}px`;
          barTwoStyle.height = `${barTwoVal}px`;
          setTimeout(() => {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
            barTwoStyle.backgroundColor = PRIMARY_COLOR;
          }, ANIMATION_SPEED_MS + 10);
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
          setTimeout(() => {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
            barTwoStyle.backgroundColor = PRIMARY_COLOR;
          }, ANIMATION_SPEED_MS + 10);
        }, i * ANIMATION_SPEED_MS);
        
      }
    }
  }

  quickSort(){}

  heapSort(){}

  testSortingAlgorithms(){
    // for(let i = 0; i < 100; i++){
    //   const array = []
    //   const length = randomIntFromInterval(1, 1000)
    //   for( let i = 0; i < length; i++){
    //     array.push(randomIntFromInterval(-1000, 1000))
    //   }
    //   const javaScriptSortedArray = array
    //   .slice()
    //   .sort((a, b) => a - b);

    //   const mergeSortedArray = mergeSort(array.slice())
    //   console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray))
    // }
  }

  render(){
    const {array} = this.state

    return(
      <div className='sort-visualizer'>
        <div className='btn-group'>
          <button className='btn' onClick={()=>this.resetArray()}>Generate New Array</button>
          <button className='btn' onClick={()=>this.mergeSort()}>Merge Sort</button>
          <button className='btn' onClick={()=>this.quickSort()}>Quick Sort</button>
          <button className='btn' onClick={()=>this.heapSort()}>Heap Sort</button>
          <button className='btn' onClick={()=>this.bubbleSort()}>Bubble Sort</button>
          <button className='btn' onClick={()=>this.testSortingAlgorithms()}>Test Sorting Algorithms</button>
        </div>
        
        <div className='array-container'>
          {array.map((value, idx) => (
            <div 
              className='array-bar' 
              key={idx}
              style={{height: `${value}px`}}
            >
            </div>
          ))}
        </div>
      </div>
    )
  }
}

function randomIntFromInterval(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// function arraysAreEqual(arrayOne, arrayTwo){
//   if (arrayOne.length !== arrayTwo.length) return false
//   for (let i = 0; i < arrayOne.length; i++){
//     if (arrayOne[i] !== arrayTwo[i]) return false
//   }
//   return true
// }
import React from 'react';
import './SortingVisualizer.css'
import { mergeSort } from '../sortingAlgorithms/mergeSort';

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

    for (let i = 0; i < 300; i++){
      array.push(randomIntFromInterval(5, 1000))
    }
    this.setState({array})
  }

  mergeSort(){

  }

  quickSort(){}

  heapSort(){}

  bubbleSort(){}

  testSortingAlgorithms(){
    for(let i = 0; i < 100; i++){
      const array = []
      const length = randomIntFromInterval(1, 1000)
      for( let i = 0; i < length; i++){
        array.push(randomIntFromInterval(-1000, 1000))
      }
      const javaScriptSortedArray = array
      .slice()
      .sort((a, b) => a - b);

      const mergeSortedArray = mergeSort(array.slice())
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray))
    }
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

function arraysAreEqual(arrayOne, arrayTwo){
  if (arrayOne.length !== arrayTwo.length) return false
  for (let i = 0; i < arrayOne.length; i++){
    if (arrayOne[i] !== arrayTwo[i]) return false
  }
  return true
}
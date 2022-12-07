import React from 'react';
import './SortingVisualizer.css'

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

    for (let i = 0; i < 310; i++){
      array.push(randomIntFromInterval(5, 1000))
    }
    this.setState({array})
  }

  mergeSort(){

  }

  quickSort(){}

  heapSort(){}

  bubbleSort(){}

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
import React, { useState, useEffect } from 'react';
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
const SORTED_COLOR = 'purple'
const SWAP_COLOR = 'green';

export default function SortingVisualizer() {
  const [arr, setArr] = useState([])
  const [isSorting, setIsSorting] = useState(false)

  useEffect(() => {
    resetArray()
  }, [])

  const resetArray = () => {
    if(isSorting) return
    const array = []
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++){
      array.push(randomIntFromInterval(5, 480))
    }
    setArr(array)
    resetArrayColor()
  }

  const resetArrayColor = () => {
    const bars = document.getElementsByClassName('array-bar');
    for(let i=0; i<bars.length; i++){
      bars[i].style.backgroundColor = PRIMARY_COLOR
    }
  }

  const bubbleSort = () => {
    const animations = getBubbleSortAnimations(arr)
    runAnimations(animations)
  }

  const mergeSort = () => {
    const animations = getMergeSortAnimations(arr);
    runAnimations(animations)
  }

  const runAnimations = (animations) => {
    if(isSorting) return
    setIsSorting(true)

    const arrayBars = document.getElementsByClassName('array-bar');
    
    for (let i = 0; i < animations.length; i++) {
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
    setTimeout(() => {
      animateSortedArray();
    }, animations.length * ANIMATION_SPEED_MS);

    setIsSorting(false)
  }

  const animateSortedArray = () => {
    const arrayBars = document.getElementsByClassName('array-bar')
    for (let i = 0; i <= arrayBars.length; i++) {
      const arrayBarStyle = arrayBars[i].style;
      setTimeout(
        () => (arrayBarStyle.backgroundColor = SORTED_COLOR),
        i * ANIMATION_SPEED_MS + 10,
      );
    }
    setIsSorting(false)
  }

  // const quickSort = () => {}

  // const heapSort = () => {}


  return(
      <div className='sort-visualizer'>
        <div className='btn-group'>
          <button className='btn' onClick={resetArray}>Generate New Array</button>
          <button className='btn' onClick={mergeSort}>Merge Sort</button>

          <button className='btn' onClick={bubbleSort}>Bubble Sort</button>
        </div>
        
        <div className='array-container'>
          {arr.map((value, idx) => (
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

function randomIntFromInterval(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min)
}

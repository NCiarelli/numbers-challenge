import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-numbers',
  templateUrl: './numbers.component.html',
  styleUrls: ['./numbers.component.css']
})
export class NumbersComponent implements OnInit {

  numbers: number[] = [];
  min: number;
  max: number;
  sum: number;
  mean: number;
  median: number;
  mode: number[];

  // Sample Input: 3 54 7 856 23 67 088 1 45
  // Even Sample Input: 4 7 2 54 78 234 54 93

  constructor() { }

  ngOnInit() {
  }

  onSubmit(numsString) {
    // console.log(numsString);
    this.numbers = numsString.split(" ").map(Number);
    this.calculate();
  }

  calculate(): void {
    // Calculate min
    this.min = this.findMin(this.numbers);
    // Calculate max
    this.max = this.findMax(this.numbers);
    // Calculate sum
    this.sum = this.findSum(this.numbers);
    // Calculate mean
    this.mean = this.findMean(this.numbers);
    // Calculate median
    this.median = this.findMedian(this.numbers);
    // Calculate mode
    this.mode = this.findModes(this.numbers);

  }

  findMin(numberArray: number[]): number {
    let min = Infinity;
    for (let num of numberArray) {
      if (min > num) {
        min = num;
      }
    }
    return (min !== Infinity) ? min : NaN;
  }

  findMax(numberArray: number[]): number {
    let max = -Infinity;
    for (let num of numberArray) {
      if (max < num) {
        max = num;
      }
    }
    return (max !== -Infinity) ? max : NaN;
  }

  findSum(numberArray: number[]): number {
    let sum = 0;
    for (let num of numberArray) {
      sum += num;
    }
    return sum;
  }

  findMean(numberArray: number[]): number {
    let mean = this.findSum(numberArray) / numberArray.length;
    return mean;
  }

  sortNums(numberArray: number[]): number[] {
    // Sort an array of numbers without mutating (effecting) the origianl array
    return [...numberArray].sort(function (a, b) {
      return a - b;
    });
  }

  findMedian(numberArray: number[]): number {
    let median;
    // Sort the input array without effecting the original array
    let tempArray = this.sortNums(numberArray);
    // Find a middle index
    const middleIndex = Math.floor(tempArray.length / 2);
    // console.log("Middle Index: ", middleIndex, "Array: ", tempArray);
    // Check if there odd or even number of values
    if (tempArray.length % 2 === 1) {
      // If odd, just store the middle value
      median = tempArray[middleIndex];
    } else {
      // If even, add the middle two values together
      let temp = tempArray[middleIndex - 1] + tempArray[middleIndex];
      // And divide by 2. Store the result
      median = temp / 2;
    }
    return median;
  }

  findModes(numberArray: number[]): number[] {
    let sortedNums = this.sortNums(numberArray);
    let maxCount = 1;
    let currentCount = 1;
    // Start the mode collection array with an empty array
    let mode: number[] = [];
    // Go through each value in the array
    for (let i = 0; i < sortedNums.length; i++) {
      if (sortedNums[i] !== sortedNums[i + 1]) {
        // If the current and next values are different...
        if (currentCount > maxCount) {
          // If the current value count is greater than the max count...
          // Set the current value as the only mode
          mode = [sortedNums[i]];
          // Set the current count as the max count
          maxCount = currentCount;
        } else if (currentCount === maxCount) {
          // If the current value count is equal to the max count...
          // Add the current value to the modes
          mode.push(sortedNums[i]);
        }
        // No matter the count, reset the current count
        currentCount = 1;
      } else {
        // If the current and next values are the same...
        // Increment the current count
        currentCount++;
      }
    }
    return mode;
  }


}

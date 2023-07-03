export class CustomDataStructure {
    constructor(xValues) {
      this.xValues = xValues;
      this.yValues = [];
      this.capacity = 20; // maximum size for yValues
    }
  
    push(yValue) {
      // Check if yValues is at capacity
      if (this.yValues.length === this.capacity) {
        // If yes, remove the oldest element (first in the array)
        this.yValues.shift();
      }
      // Add new element to the end
      this.yValues.push(yValue);
    }
  
    getAll() {
      // Returns the xValues and all yValues
      return [this.xValues, ...this.yValues];
    }
  }
  
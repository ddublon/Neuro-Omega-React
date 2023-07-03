// const fs = require("fs");

// fs.readFile("output1.json", "utf8", (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   let jsonArray = JSON.parse(data);
//   let originalArray = jsonArray[0];
//   let adjustedArray;

//   if (originalArray.length > 2880) {
//     // if the array is too long, truncate it
//     adjustedArray = originalArray.slice(0, 2880);
//   } else {
//     // if the array is too short, pad it with zeroes
//     adjustedArray = originalArray;
//     while (adjustedArray.length < 2880) {
//       adjustedArray.push(0);
//     }
//   }

//   // overwrite the original array in the JSON object
//   jsonArray[0] = adjustedArray;

//   // Save the modified jsonArray back to the file
//   fs.writeFile("output1.json", JSON.stringify(jsonArray), (err) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log("Array length adjusted and file saved successfully.");
//     }
//   });
// });





// const fs = require("fs");

// fs.readFile("output1.json", "utf8", (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   const jsonArray = JSON.parse(data);
//   console.log(jsonArray[0].length);
// });


const fs = require('fs');

fs.readFile('output1.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    
    let jsonArray = JSON.parse(data);
    let adjustedArray = jsonArray[0];

    // Here we split the adjusted array into smaller arrays each of length 96.
    let i, j;
    for (i = 0, j = adjustedArray.length; i < j; i += 96) {
        let temparray = adjustedArray.slice(i, i + 96);

        // Write each small array to a new file
        let fileName = `output${i/96 + 1}.json`; // This will name the files output1.json, output2.json, ..., output20.json
        fs.writeFile(fileName, JSON.stringify(temparray), err => {
            if (err) {
                console.error(err);
            } else {
                console.log(`Data successfully written to file ${fileName}`);
            }
        });
    }
});


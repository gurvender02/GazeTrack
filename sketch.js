// let heatmapData = [];
// let data;

// function preload() {
//   data = loadTable('User_0_fixations.csv', 'csv', 'header'); // Load gaze data from CSV file
// }

// function setup() {
//   // Create a full-screen canvas
//   let canvas = createCanvas(windowWidth, windowHeight);
//   canvas.position(0, 0); // Align canvas to top-left corner
//   canvas.style('pointer-events', 'none'); // Allow text interaction below the canvas
//   // background(240); // Set a light background
//   noStroke();

//   // Parse and map gaze data to heatmapData array
//   for (let i = 0; i < data.getRowCount(); i++) {
//     let row = data.getRow(i);
//     let x = map(row.getNum('FPOGX'), 0, 1, 0, windowWidth); // Map X (normalized to window width)
//     let y = map(row.getNum('FPOGY'), 0, 1, 0, windowHeight); // Map Y (normalized to window height)
//     heatmapData.push({ x, y, size: 10 }); // Add to heatmap data (adjust size if needed)
//   }
// }

// function draw() {
//   // Create a semi-transparent background for the heatmap
//   // background(240, 240, 255, 20);   // Light background with alpha transparency

//   // Draw gaze points as transparent heatmap circles
//   for (let point of heatmapData) {
//     fill(255,0,0, 50); // Semi-transparent red for circles
//     ellipse(point.x, point.y, point.size); // Render circle at gaze point
//   }
// }

// // Ensure canvas resizes with the window
// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

// // Text hover interaction logic (unchanged from previous code)
// document.querySelectorAll('p').forEach(paragraph => {
//   paragraph.addEventListener('mousemove', event => {
//     const speed = Math.abs(event.movementX) + Math.abs(event.movementY);
//     const colorIntensity = Math.min(255, speed * 10);
//     paragraph.style.color = `rgb(${colorIntensity}, ${255 - colorIntensity}, ${255 - colorIntensity})`;
//   });

//   paragraph.addEventListener('mouseleave', () => {
//     paragraph.style.color = '';
//   });
// });

// // Highlight selected word logic (unchanged from previous code)
// document.addEventListener('mouseup', () => {
//   const selection = window.getSelection();
//   const selectedText = selection.toString().trim();

//   if (selectedText) {
//     const range = selection.getRangeAt(0);
//     const span = document.createElement('span');
//     span.textContent = selectedText;
//     span.style.backgroundColor = 'yellow'; // Highlight color
//     span.style.color = 'black'; // Adjust text color for better visibility

//     // Replace the selected text with the highlighted span
//     range.deleteContents();
//     range.insertNode(span);

//     // Clear the selection
//     selection.removeAllRanges();
//   }
// });





// let heatmapData = [];
// let data;

// function preload() {
//   // Load gaze data from CSV file (ensure file is in the correct directory)
//   data = loadTable('User_0_all_gaze.csv', 'csv', 'header');
// }

// function setup() {
//   // Create a full-screen canvas overlay
//   let canvas = createCanvas(windowWidth, windowHeight);
//   canvas.position(0, 0);
//   canvas.style('pointer-events', 'none'); // Allow interaction with webpage elements under the canvas

//   noStroke();

//   // Parse gaze data and map it to the heatmapData array
//   for (let i = 0; i < data.getRowCount(); i++) {
//     let row = data.getRow(i);

//     // Check if gaze data is valid (FPOGV = 1)
//     if (row.getNum('FPOGV') === 1) {
//       let x = map(row.getNum('FPOGX'), 0, 1, 0, windowWidth); // Map X to screen width
//       let y = map(row.getNum('FPOGY'), 0, 1, 0, windowHeight); // Map Y to screen height
//       let duration = row.getNum('FPOGD'); // Duration of fixation

//       // Add scaled circle size based on fixation duration
//       heatmapData.push({ x, y, size: map(duration, 0, 5, 5, 50) }); // Scale size (5-50 px)
//     }
//   }
// }

// function draw() {
//   // Clear the canvas with transparency to keep content readable
//   clear();

//   // Get the current scroll position
//   const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//   const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

//   // Draw heatmap circles
//   // for (let point of heatmapData) {
//     fill(255, 0, 0, 50); // Semi-transparent red (adjust alpha for visibility)
//     ellipse(point.x - scrollLeft, point.y - scrollTop, point.size); // Adjust for scrolling
//   }


// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight); // Ensure the canvas resizes with the window
// }

// // Optional: Interaction logic for paragraphs (unchanged from the previous version)
// document.querySelectorAll('p').forEach(paragraph => {
//   paragraph.addEventListener('mousemove', event => {
//     const speed = Math.abs(event.movementX) + Math.abs(event.movementY);
//     const colorIntensity = Math.min(255, speed * 10);
//     paragraph.style.color = `rgb(${colorIntensity}, ${255 - colorIntensity}, ${255 - colorIntensity})`;
//   });

//   paragraph.addEventListener('mouseleave', () => {
//     paragraph.style.color = '';
//   });
// });

// document.addEventListener('mouseup', () => {
//   const selection = window.getSelection();
//   const selectedText = selection.toString().trim();

//   if (selectedText) {
//     const range = selection.getRangeAt(0);
//     const span = document.createElement('span');
//     span.textContent = selectedText;
//     span.style.backgroundColor = 'yellow';
//     span.style.color = 'black';

//     range.deleteContents();
//     range.insertNode(span);
//     selection.removeAllRanges();
//   }
// });







// let heatmapData = [];
// let data;

// function preload() {
//   data = loadTable('guru_all.csv', 'csv', 'header');
// }

// function setup() {
//   let canvas = createCanvas(windowWidth, windowHeight);
//   canvas.position(0, 0);
//   canvas.style('pointer-events', 'none'); //what is it ? 
//   noStroke();

//   for (let i = 0; i < data.getRowCount(); i++) {
//     let row = data.getRow(i);
//     if (row.getNum('FPOGV') === 1) { // FPOGV Valid flag for fixation data (filter invalid rows).
//       let x = map(row.getNum('FPOGX'), 0, 1, 0, windowWidth); //X-coordinate of fixation (percentage of width).
//       let y = map(row.getNum('FPOGY'), 0, 1, 0, windowHeight); //Y-coordinate of fixation (percentage of height).
//       let duration = row.getNum('FPOGD'); //Duration of fixation (scales intensity/size).
//       heatmapData.push({ x, y, size: map(duration, 0, 5, 5, 50) });
//     }
//   }
// }

// function draw() {
//   clear();
//   const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//   const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

//   for (let point of heatmapData) {
//     fill(255, 0, 0, 50);  
//     ellipse(point.x - scrollLeft, point.y - scrollTop, point.size);
//   }
// }

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

// document.querySelectorAll('p').forEach(paragraph => {
//   paragraph.addEventListener('mousemove', event => {
//     const speed = Math.abs(event.movementX) + Math.abs(event.movementY);
//     const colorIntensity = Math.min(255, speed * 10);
//     paragraph.style.color = `rgb(${colorIntensity}, ${255 - colorIntensity}, ${255 - colorIntensity})`;
//   });

//   paragraph.addEventListener('mouseleave', () => {
//     paragraph.style.color = '';
//   });
// });

// document.addEventListener('mouseup', () => {
//   const selection = window.getSelection();
//   const selectedText = selection.toString().trim();

//   if (selectedText) {
//     const range = selection.getRangeAt(0);
//     const span = document.createElement('span');
//     span.textContent = selectedText;
//     span.style.backgroundColor = 'yellow';
//     span.style.color = 'black';

//     range.deleteContents();
//     range.insertNode(span);
//     selection.removeAllRanges();
//   }
// });




//this code is working well for drawing the  circle around it of the gaze point. 

// let heatmapData = [];
// let data;

// function preload() {
//   data = loadTable('guru_all.csv', 'csv', 'header');
// }

// function setup() {
//   let canvas = createCanvas(document.documentElement.scrollWidth, document.documentElement.scrollHeight);
//   canvas.position(0, 0);
//   canvas.style('pointer-events', 'none');
//   noStroke();

//   for (let i = 0; i < data.getRowCount(); i++) {
//     let row = data.getRow(i);
//     if (row.getNum('FPOGV') === 1) {
//       let x = map(row.getNum('FPOGX'), 0, 1, 0, document.documentElement.scrollWidth);
//       let y = map(row.getNum('FPOGY'), 0, 1, 0, document.documentElement.scrollHeight);
//       let duration = row.getNum('FPOGD');

//       heatmapData.push({ x, y, size: map(duration, 0, 5, 5, 50) });
//     }
//   }
// }

// function draw() {
//   clear();

//   for (let point of heatmapData) {
//     fill(255, 0, 0, 50);
//     ellipse(point.x, point.y, 2*point.size);
//   }
// }

// function windowResized() {
//   resizeCanvas(document.documentElement.scrollWidth, document.documentElement.scrollHeight);
// }


let heatmapData = [];
let detectedWords = []; // Array to store detected words
let data;

function preload() {
  data = loadTable('guru_all.csv', 'csv', 'header');
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('pointer-events', 'none'); 
  noStroke();

  for (let i = 0; i < data.getRowCount(); i++) {
    let row = data.getRow(i);
    if (row.getNum('FPOGV') === 1) { 
      let x = map(row.getNum('FPOGX'), 0, 1, 0, document.documentElement.scrollWidth); 
      let y = map(row.getNum('FPOGY'), 0, 1, 0, document.documentElement.scrollHeight); 
      let duration = row.getNum('FPOGD'); 
      heatmapData.push({ x, y, size: map(duration, 0, 5, 5, 50) });
    }
  }
}

function draw() {
  clear();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  detectedWords = []; // Clear detected words in each frame

  for (let point of heatmapData) {
    let gazeX = point.x - scrollLeft;
    let gazeY = point.y - scrollTop;

    fill(255, 0, 0, 50);  
    ellipse(gazeX, gazeY, point.size);

    detectWordsAtPoint(gazeX, gazeY);
  }

  if (detectedWords.length > 0) {
    console.log("Detected words:", detectedWords);
  }
}

function detectWordsAtPoint(x, y) {
  let elements = document.elementsFromPoint(x, y); // Get elements at gaze point
  for (let element of elements) {
    if (element.tagName === "P" || element.tagName === "SPAN") { // Only check text elements
      let text = element.innerText.trim();
      if (text) {
        let words = text.split(/\s+/);
        let closestWord = findClosestWord(element, words, x, y);
        if (closestWord && !detectedWords.includes(closestWord)) {
          detectedWords.push(closestWord);
        }
      }
    }
  }
}

function findClosestWord(element, words, x, y) {
  let range = document.createRange();
  let selection = window.getSelection();

  for (let word of words) {
    let index = element.innerText.indexOf(word);
    if (index !== -1) {
      range.setStart(element.firstChild, index);
      range.setEnd(element.firstChild, index + word.length);

      let rect = range.getBoundingClientRect();
      let wordX = rect.left + rect.width / 2;
      let wordY = rect.top + rect.height / 2;

      let distance = dist(x, y, wordX, wordY);
      if (distance < 30) { // Adjust this threshold for better accuracy
        return word;
      }
    }
  }
  return null;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

document.querySelectorAll('p').forEach(paragraph => {
  paragraph.addEventListener('mousemove', event => {
    const speed = Math.abs(event.movementX) + Math.abs(event.movementY);
    const colorIntensity = Math.min(255, speed * 10);
    paragraph.style.color = `rgb(${colorIntensity}, ${255 - colorIntensity}, ${255 - colorIntensity})`;
  });

  paragraph.addEventListener('mouseleave', () => {
    paragraph.style.color = '';
  });
});

document.addEventListener('mouseup', () => {
  const selection = window.getSelection();
  const selectedText = selection.toString().trim();

  if (selectedText) {
    const range = selection.getRangeAt(0);
    const span = document.createElement('span');
    span.textContent = selectedText;
    span.style.backgroundColor = 'yellow';
    span.style.color = 'black';

    range.deleteContents();
    range.insertNode(span);
    selection.removeAllRanges();
  }
});

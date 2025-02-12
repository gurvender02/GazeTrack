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




// //this code is working well for drawing the  circle around it of the gaze point. 

// let detectedWords = []; 
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



// this is working to show words in a small window

/*
let detectedWords = [];
let heatmapData = [];
let data;

function preload() {
  data = loadTable('guru_all.csv', 'csv', 'header');
}

function setup() {
  let canvas = createCanvas(document.documentElement.scrollWidth, document.documentElement.scrollHeight);
  canvas.position(0, 0);
  canvas.style('pointer-events', 'none');
  noStroke();

  for (let i = 0; i < data.getRowCount(); i++) {
    let row = data.getRow(i);
    if (row.getNum('FPOGV') === 1) {
      let x = map(row.getNum('FPOGX'), 0, 1, 0, document.documentElement.scrollWidth);
      let y = map(row.getNum('FPOGY'), 0, 1, 0, document.documentElement.scrollHeight);
      let duration = row.getNum('FPOGD');
      let size = map(duration, 0, 5, 5, 50);

      heatmapData.push({ x, y, size });
      detectWordsAt(x, y, size);
    }
  }
}

function draw() {
  clear();

  for (let point of heatmapData) {
    fill(255, 0, 0, 50);
    ellipse(point.x, point.y, 2 * point.size);
  }

  displayDetectedWords();
}

function detectWordsAt(x, y, radius) {
  let elements = document.elementsFromPoint(x, y);
  elements.forEach(el => {
    if (el.nodeType === Node.ELEMENT_NODE && el.innerText.trim().length > 0) {
      let words = el.innerText.split(/\s+/);
      words.forEach(word => {
        if (!detectedWords.includes(word)) {
          detectedWords.push(word);
        }
      });
    }
  });
}

function displayDetectedWords() {
  let wordsContainer = document.getElementById('detected-words');
  if (!wordsContainer) {
    wordsContainer = document.createElement('div');
    wordsContainer.id = 'detected-words';
    wordsContainer.style.position = 'fixed';
    wordsContainer.style.bottom = '10px';
    wordsContainer.style.left = '10px';
    wordsContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    wordsContainer.style.color = 'white';
    wordsContainer.style.padding = '10px';
    wordsContainer.style.borderRadius = '5px';
    wordsContainer.style.maxWidth = '300px';
    wordsContainer.style.overflowY = 'auto';
    wordsContainer.style.maxHeight = '150px';
    document.body.appendChild(wordsContainer);
  }
  wordsContainer.innerHTML = detectedWords.join(', ');
}

function windowResized() {
  resizeCanvas(document.documentElement.scrollWidth, document.documentElement.scrollHeight);
}
*/

// let detectedWords = {};
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
//       let size = map(duration, 0, 5, 5, 50);

//       heatmapData.push({ x, y, size, duration });
//       detectWordsAt(x, y, size, duration);
//     }
//   }
//   createButtonUI();
// }

// function draw() {
//   clear();

//   for (let point of heatmapData) {
//     fill(255, 0, 0, 50);
//     ellipse(point.x, point.y, 2 * point.size);
//   }
// }

// function detectWordsAt(x, y, radius, duration) {
//   let elements = document.elementsFromPoint(x, y);
//   elements.forEach(el => {
//     if (el.nodeType === Node.ELEMENT_NODE && el.innerText.trim().length > 0) {
//       let words = el.innerText.split(/\s+/);
//       words.forEach(word => {
//         if (!detectedWords[word]) {
//           detectedWords[word] = { count: 0, duration: 0, size: 1 };
//         }
//         detectedWords[word].count++;
//         detectedWords[word].duration += duration;
//         detectedWords[word].size = 1 + detectedWords[word].duration;
//       });
//     }
//   });
// }

// function createButtonUI() {
//   let button = document.createElement('button');
//   button.innerText = 'Get Gaze Words';
//   button.style.position = 'fixed';
//   button.style.bottom = '20px';
//   button.style.right = '20px';
//   button.onclick = showGazeWords;
//   document.body.appendChild(button);
// }

// function showGazeWords() {
//   let wordsContainer = document.getElementById('gaze-words-window');
//   if (!wordsContainer) {
//     wordsContainer = document.createElement('div');
//     wordsContainer.id = 'gaze-words-window';
//     wordsContainer.style.position = 'fixed';
//     wordsContainer.style.bottom = '50px';
//     wordsContainer.style.right = '20px';
//     wordsContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
//     wordsContainer.style.color = 'white';
//     wordsContainer.style.padding = '10px';
//     wordsContainer.style.borderRadius = '5px';
//     wordsContainer.style.maxWidth = '300px';
//     wordsContainer.style.maxHeight = '200px';
//     wordsContainer.style.overflowY = 'auto';
//     document.body.appendChild(wordsContainer);
//   }
//   wordsContainer.innerHTML = '';
//   for (let word in detectedWords) {
//     let span = document.createElement('span');
//     span.innerText = word + ' ';
//     span.style.fontSize = detectedWords[word].size + 'px';
//     span.style.display = 'inline-block';
//     wordsContainer.appendChild(span);
//   }
// }

// function windowResized() {
//   resizeCanvas(document.documentElement.scrollWidth, document.documentElement.scrollHeight);
// }


let detectedWords = {};
let heatmapData = [];
let data;
let wordsVisible = false;
let wordsContainer;
let toggleButton;

function preload() {
  data = loadTable('guru_all.csv', 'csv', 'header');
}

function setup() {
  let canvas = createCanvas(document.documentElement.scrollWidth, document.documentElement.scrollHeight);
  // let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('pointer-events', 'none');
  noStroke();

  for (let i = 0; i < data.getRowCount(); i++) {
    let row = data.getRow(i);
    if (row.getNum('FPOGV') === 1) {
      let x = map(row.getNum('FPOGX'), 0, 1, 0, document.documentElement.scrollWidth);
      let y = map(row.getNum('FPOGY'), 0, 1, 0, document.documentElement.scrollHeight);
      let duration = row.getNum('FPOGD');
      let size = map(duration, 0, 5, 5, 50);
      
      heatmapData.push({ x, y, size, duration });
      detectWordsAt(x, y, size, duration);
    }
  }
  createButtonUI();
}

function draw() {
  clear();
  for (let point of heatmapData) {
    let alpha = map(point.duration, 0, 5, 50, 255);
    fill(255, 0, 0, alpha);
    ellipse(point.x, point.y, 2 * point.size);
  }
}



function detectWordsAt(x, y, radius, duration) {
  let range;
  if (document.caretPositionFromPoint) {
    range = document.caretPositionFromPoint(x, y);
  } else if (document.caretRangeFromPoint) {
    range = document.caretRangeFromPoint(x, y);
  }

  if (range && range.offsetNode && range.offsetNode.nodeType === Node.TEXT_NODE) {
    let textNode = range.offsetNode;
    let offset = range.offset;

    // Get the full text content of the node
    let text = textNode.textContent;

    // Extract the word at the offset position
    let word = getWordAt(text, offset);

    if (word && word.trim().length > 0) {
      if (!detectedWords[word]) {
        detectedWords[word] = { count: 0, duration: 0, size: 10, color: '' };
      }
      detectedWords[word].count++;
      detectedWords[word].duration += duration;
      detectedWords[word].size = constrain(map(detectedWords[word].duration, 0, 5, 10, 46), 10, 46);
      detectedWords[word].color = `rgb(${map(detectedWords[word].duration, 0, 5, 0, 255)}, 50, 150)`;
    }
  }
}

// Helper function to extract a word at a specific character offset
function getWordAt(text, offset) {
  let left = offset, right = offset;

  // Expand leftwards until we hit a space or the start of the text
  while (left > 0 && /\S/.test(text[left - 1])) {
    left--;
  }

  // Expand rightwards until we hit a space or the end of the text
  while (right < text.length && /\S/.test(text[right])) {
    right++;
  }

  return text.slice(left, right);
}


function createButtonUI() {
  toggleButton = document.createElement('button');
  toggleButton.innerText = 'Get Gaze Words';
  toggleButton.style.position = 'fixed';
  toggleButton.style.bottom = '20px';
  toggleButton.style.right = '20px';
  toggleButton.onclick = toggleGazeWords;
  document.body.appendChild(toggleButton);
}

function toggleGazeWords() {
  if (wordsVisible) {
    if (wordsContainer) {
      document.body.removeChild(wordsContainer);
      wordsContainer = null;
    }
    toggleButton.innerText = 'Get Gaze Words';
  } else {
    wordsContainer = document.createElement('div');
    wordsContainer.id = 'gaze-words-window';
    wordsContainer.style.position = 'fixed';
    wordsContainer.style.bottom = '50px';
    wordsContainer.style.right = '20px';
    wordsContainer.style.backgroundColor = 'rgba(255, 255, 255, 1)';
    wordsContainer.style.color = 'white';
    wordsContainer.style.padding = '10px';
    wordsContainer.style.borderRadius = '5px';
    wordsContainer.style.width = '300px';
    wordsContainer.style.height = '200px';
    wordsContainer.style.overflowY = 'auto';
    wordsContainer.style.resize = 'both';
    wordsContainer.style.minWidth = '150px';
    wordsContainer.style.minHeight = '100px';
    wordsContainer.style.maxWidth = '90vw';
    wordsContainer.style.maxHeight = '90vh';
    wordsContainer.style.overflow = 'auto';
    
    let sortedWords = Object.entries(detectedWords).sort((a, b) => b[1].duration - a[1].duration);
    sortedWords.forEach(([word, info]) => {
      let span = document.createElement('span');
      span.innerText = word + ' ';
      span.style.fontSize = info.size + 'px';
      span.style.color = info.color;
      span.style.marginRight = '5px';
      span.style.display = 'inline-block';
      wordsContainer.appendChild(span);
    });

    document.body.appendChild(wordsContainer);
    toggleButton.innerText = 'Close Gaze Words';
  }
  wordsVisible = !wordsVisible;
}

function windowResized() {
  resizeCanvas(document.documentElement.scrollWidth, document.documentElement.scrollHeight);
}




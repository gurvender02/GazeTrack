
let detectedWords = {};
let heatmapData = [];
let data;
let wordsVisible = false;
let wordsContainer;
let toggleButton;

let ScrollingData;

function preload() {
  data = loadTable('d1.csv', 'csv', 'header');
  ScrollingData = loadTable('sd1.csv', 'csv', 'header');
}

// function setup() {
//   let container = document.getElementsByClassName("container")[0]; 
//   let wd, ht;
  
//   if (container) {
//     wd = container.offsetWidth;
//     ht = container.offsetHeight;
//   } else {
//     wd = document.documentElement.scrollWidth;
//     ht = document.documentElement.scrollHeight;
//   }

//   let canvas = createCanvas(wd, ht);
//   canvas.position(0, 0);
//   canvas.style('pointer-events', 'none');
//   noStroke();

//   let countRow = Math.max(
//     Number(ScrollingData && ScrollingData.getRowCount() || 0), 
//     Number(data && data.getRowCount() || 0)
//   );

//   let rowD1, rowSD1;
//   let currRowD1Num = 200;
//   let currRowSD1Num = 0; // Initialized properly

//   for (let i = 0; i < countRow; i++) {
//     currRowSD1Num ++;

//         // Fixed condition
//       rowD1 = data.getRow(currRowD1Num);
//       rowSD1 = ScrollingData.getRow(currRowSD1Num); // Fixed variable name

//       if (rowD1.getNum('FPOGV') === 1) {
//         let x = map(rowD1.getNum('FPOGX'), 0, 1, 0, document.documentElement.scrollWidth);
//         let y = map(rowD1.getNum('FPOGY'), 0, 1, 0, window.innerHeight);
//         y += rowSD1.getNum('ScrollY');
//         let duration1 = rowD1.getNum('FPOGD');
//         let size1 = map(duration1, 0, 5, 5, 50);

//         heatmapData.push({ x, y, size1, duration1 });
//         detectWordsAt(x, y, size1, duration1);
//       }
    
//   }
//   createButtonUI();
// }


function setup() {
  let container = document.getElementsByClassName("container")[0]
  let canvas = createCanvas(document.documentElement.scrollWidth, container.offsetHeight);
  canvas.position(0, 0);
  canvas.style('pointer-events', 'none');
  noStroke();

  for (let i = 0; i < data.getRowCount(); i++) {
    let row = data.getRow(i);
    let rowSD1 = ScrollingData.getRow(i*3);
    if(rowSD1 == undefined || rowSD1 == null) {
      rowSD1 = 1;
    }

    if (row.getNum('FPOGV') === 1) {
      let x = map(row.getNum('FPOGX'), 0, 1, 0, document.documentElement.scrollWidth);
      let y = map(row.getNum('FPOGY'), 0, 1, 0, window.innerHeight);
      y += rowSD1.getNum('ScrollY') - 80;
      let duration = row.getNum('FPOGD');
      let size = map(duration, 0, 5, 5, 50);

      heatmapData.push({x, y, size, duration });
      detectWordsAt(x, y, size, duration);
    }
  }
  createButtonUI();
}

function draw() {
  clear();
  for (let point of heatmapData) {
    let alpha = map(point.duration, 0, 5, 10, 20);
    fill(255, 255, 0, alpha);
    ellipse(point.x, point.y, 2 * point.size);
  }
}


let recording = false;
let scrollData = [['Timestamp', 'ScrollY', 'Direction', 'Speed (px/s)', 'Page Height']];
let lastScrollY = window.scrollY;
let lastTimestamp = performance.now();
let scrollInterval;

window.onload = () => {
  let button = document.getElementById("scrollTrackingButton");
  button.addEventListener("click", toggleRecording);
};

function toggleRecording() {
  recording = !recording;
  let button = document.getElementById("scrollTrackingButton");
  button.innerText = recording ? "Stop Scroll Tracking" : "Start Scroll Tracking";

  if (recording) {
    startRecording();
  } else {
    stopRecording();
  }
}

function startRecording() {
  scrollInterval = setInterval(() => {
    let timestamp = performance.now();
    let scrollY = window.scrollY;
    let direction = scrollY > lastScrollY ? "Down" : scrollY < lastScrollY ? "Up" : "None";
    let timeDiff = (timestamp - lastTimestamp) / 1000;
    let speed = Math.abs(scrollY - lastScrollY) / timeDiff;
    let pageHeight = document.documentElement.scrollHeight;

    scrollData.push([new Date().toISOString(), scrollY, direction, speed.toFixed(2), pageHeight]);

    lastScrollY = scrollY;
    lastTimestamp = timestamp;
  }, 0.150);
}

function stopRecording() {
  clearInterval(scrollInterval);
  downloadCSV();
}

function downloadCSV() {
  let csvContent = scrollData.map(e => e.join(",")).join("\n");
  let blob = new Blob([csvContent], { type: "text/csv" });
  let url = URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = url;
  a.download = "scroll_tracking.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}




function detectWordsAt(x, y, radius, duration1) {
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
        detectedWords[word] = { count: 0, duration1: 0, size: 10, color: '' };
      }
      detectedWords[word].count++;
      detectedWords[word].duration1 += duration1;
      detectedWords[word].size1 = constrain(map(detectedWords[word].duration1, 0, 5, 10, 46), 10, 46);
      detectedWords[word].color = `rgb(${map(detectedWords[word].duration1, 0, 5, 0, 255)}, 50, 150)`;
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

    let sortedWords = Object.entries(detectedWords).sort((a, b) => b[1].duration1 - a[1].duration1);
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




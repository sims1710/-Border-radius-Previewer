// Get references to the input elements
const topLeftInput = document.getElementById('topLeft');
const topLeftValue = document.getElementById('topLeftValue');

const topRightInput = document.getElementById('topRight');
const topRightValue = document.getElementById('topRightValue');

const bottomLeftInput = document.getElementById('bottomLeft');
const bottomLeftValue = document.getElementById('bottomLeftValue');

const bottomRightInput = document.getElementById('bottomRight');
const bottomRightValue = document.getElementById('bottomRightValue');

const box = document.getElementById('previewBox');
const boxColorInput = document.getElementById('boxColor');

// Add input event listeners to update preview on range input change
topLeftInput.addEventListener('input', updatePreview);
topRightInput.addEventListener('input', updatePreview);
bottomLeftInput.addEventListener('input', updatePreview);
bottomRightInput.addEventListener('input', updatePreview);
box.addEventListener('click', changeColor);
boxColorInput.addEventListener('input', updateBoxColor);

function updatePreview() {
    // Get the input values
    const topLeft = topLeftInput.value + 'px';
    const topRight = topRightInput.value + 'px';
    const bottomLeft = bottomLeftInput.value + 'px';
    const bottomRight = bottomRightInput.value + 'px';

    // Update the border-radius property of the preview box
    const previewBox = document.getElementById('previewBox');
    previewBox.style.borderRadius = `${topLeft} ${topRight} ${bottomLeft} ${bottomRight}`;

    // Update the display values
    topLeftValue.textContent = topLeft;
    topRightValue.textContent = topRight;
    bottomLeftValue.textContent = bottomLeft;
    bottomRightValue.textContent = bottomRight;
}

function copyToClipboard() {
    // Get the CSS code from the preview box
    const cssCode = document.getElementById('previewBox').style.cssText;

    // Copy the CSS code to the clipboard
    navigator.clipboard.writeText(cssCode)
        .then(() => alert('CSS code copied to clipboard!'))
        .catch(err => console.error('Unable to copy to clipboard', err));
}

// Change the background color of the box
function changeColor() {
    const randomColor = getRandomColor();
    box.style.backgroundColor = randomColor;
    boxColorInput.value = randomColor;
}

// Generate a random hex color
function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

// Get the color value from the color picker and update the box color
function updateBoxColor() {   
    const boxColor = boxColorInput.value;
    box.style.backgroundColor = boxColor;
}



// Add event listeners for drag and drop
box.addEventListener('dragstart', handleDragStart);
box.addEventListener('dragend', handleDragEnd);

let initialX, initialY;

function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', ''); // required for Firefox
    initialX = e.clientX - box.getBoundingClientRect().left;
    initialY = e.clientY - box.getBoundingClientRect().top;
}

function handleDragEnd() {
    // Return the box to its original position
    box.style.transition = 'transform 0.3s ease';
    box.style.transform = 'translate(0, 0)';
    setTimeout(() => {
        box.style.transition = ''; // reset transition after animation
    }, 300);
}

// Add event listeners for drag and drop
document.addEventListener('dragover', handleDragOver);
document.addEventListener('drop', handleDrop);

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();

    const dropX = e.clientX - initialX;
    const dropY = e.clientY - initialY;

    box.style.transform = `translate(${dropX}px, ${dropY}px)`;
}

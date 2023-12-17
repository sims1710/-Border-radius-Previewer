// Get references to the input elements
const topLeftInput = document.getElementById('topLeft');
const topRightInput = document.getElementById('topRight');
const bottomLeftInput = document.getElementById('bottomLeft');
const bottomRightInput = document.getElementById('bottomRight');

// Add input event listeners to update preview on range input change
topLeftInput.addEventListener('input', updatePreview);
topRightInput.addEventListener('input', updatePreview);
bottomLeftInput.addEventListener('input', updatePreview);
bottomRightInput.addEventListener('input', updatePreview);

function updatePreview() {
    // Get the input values
    const topLeft = topLeftInput.value + 'px';
    const topRight = topRightInput.value + 'px';
    const bottomLeft = bottomLeftInput.value + 'px';
    const bottomRight = bottomRightInput.value + 'px';

    // Update the border-radius property of the preview box
    const previewBox = document.getElementById('previewBox');
    previewBox.style.borderRadius = `${topLeft} ${topRight} ${bottomLeft} ${bottomRight}`;
}

function copyToClipboard() {
    // Get the CSS code from the preview box
    const cssCode = document.getElementById('previewBox').style.cssText;

    // Copy the CSS code to the clipboard
    navigator.clipboard.writeText(cssCode)
        .then(() => alert('CSS code copied to clipboard!'))
        .catch(err => console.error('Unable to copy to clipboard', err));
}

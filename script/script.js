function displayPhoto(fileName, imgSrc, palette) {
    console.log('Displaying photo:', fileName);
    console.log('Color palette:', palette);

    const container = document.createElement('div');
    container.className = 'photo-container';

    const img = document.createElement('img');
    img.src = imgSrc;
    container.appendChild(img);

    const paletteDiv = document.createElement('div');
    paletteDiv.className = 'color-palette';
    
    palette.forEach(color => {
        console.log('Processing color:', color);
        const colorBox = document.createElement('div');
        colorBox.className = 'color-box';
        const rgbColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
        colorBox.style.backgroundColor = rgbColor;
        
        // Create color info container
        const colorInfo = document.createElement('div');
        colorInfo.className = 'color-info';
        
        // Get color name and hex code
        const hexColor = rgbToHex(color[0], color[1], color[2]);
        const colorName = getColorName(hexColor);
        console.log('Color name:', colorName, 'Hex:', hexColor);
        
        // Add color name and code
        const colorNameSpan = document.createElement('span');
        colorNameSpan.className = 'color-name';
        colorNameSpan.textContent = colorName || 'Unknown Color'; // Fallback if no name
        
        const colorCodeSpan = document.createElement('span');
        colorCodeSpan.className = 'color-code';
        colorCodeSpan.textContent = hexColor;
        
        // Debug: Log the created elements
        console.log('Created elements:', {
            colorNameSpan: colorNameSpan.outerHTML,
            colorCodeSpan: colorCodeSpan.outerHTML
        });
        
        colorInfo.appendChild(colorNameSpan);
        colorInfo.appendChild(colorCodeSpan);
        
        // Combine color box and info
        const colorContainer = document.createElement('div');
        colorContainer.className = 'color-container';
        colorContainer.appendChild(colorBox);
        colorContainer.appendChild(colorInfo);
        
        paletteDiv.appendChild(colorContainer);
    });
    container.appendChild(paletteDiv);

    const name = document.createElement('p');
    name.textContent = fileName;
    container.appendChild(name);

    resultsDiv.appendChild(container);
    
    // Debug: Log the final container HTML
    console.log('Final container HTML:', container.outerHTML);
}

// Helper function to convert RGB to Hex
function rgbToHex(r, g, b) {
    const hex = '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
    console.log('RGB to Hex:', {r, g, b, hex});
    return hex;
}

// Helper function to get color name (simplified version)
function getColorName(hexColor) {
    console.log('Getting color name for:', hexColor);
    // This is a simplified version. For a complete solution, you might want to use a color name library
    const colorMap = {
        '#FF0000': 'Red',
        '#00FF00': 'Green',
        '#0000FF': 'Blue',
        '#FFFFFF': 'White',
        '#000000': 'Black',
        '#FFFF00': 'Yellow',
        '#FF00FF': 'Magenta',
        '#00FFFF': 'Cyan',
        '#808080': 'Gray',
        '#FFA500': 'Orange',
        '#800080': 'Purple',
        '#008000': 'Dark Green',
        '#800000': 'Maroon',
        '#000080': 'Navy',
        '#FFC0CB': 'Pink',
        '#A52A2A': 'Brown'
    };
    
    // Find the closest named color
    let closestColor = '';
    let minDiff = Infinity;
    
    for (const [namedHex, name] of Object.entries(colorMap)) {
        const diff = colorDifference(hexColor, namedHex);
        if (diff < minDiff) {
            minDiff = diff;
            closestColor = name;
        }
    }
    
    console.log('Closest color name:', closestColor);
    return closestColor;
}

// Helper function to calculate color difference
function colorDifference(hex1, hex2) {
    const r1 = parseInt(hex1.slice(1, 3), 16);
    const g1 = parseInt(hex1.slice(3, 5), 16);
    const b1 = parseInt(hex1.slice(5, 7), 16);
    
    const r2 = parseInt(hex2.slice(1, 3), 16);
    const g2 = parseInt(hex2.slice(3, 5), 16);
    const b2 = parseInt(hex2.slice(5, 7), 16);
    
    const diff = Math.sqrt(
        Math.pow(r2 - r1, 2) +
        Math.pow(g2 - g1, 2) +
        Math.pow(b2 - b1, 2)
    );
    
    console.log('Color difference:', {hex1, hex2, diff});
    return diff;
} 
const folderInput = document.getElementById('folderInput');
const resultsDiv = document.getElementById('results');
const colorThief = new ColorThief();

folderInput.addEventListener('change', (event) => {
    resultsDiv.innerHTML = '';
    const files = event.target.files;
    console.log('Files selected:', files); // Log 1

    for (const file of files) {
        if (file.type.startsWith('image/')) {
            console.log('Processing file:', file.name); // Log 2
            const reader = new FileReader();
            reader.onload = (e) => {
                console.log('FileReader loaded:', file.name); // Log 3
                const img = new Image();
                img.src = e.target.result;
                img.onload = () => {
                    console.log('Image loaded:', file.name); // Log 4
                    try {
                        const palette = colorThief.getPalette(img, 3);
                        console.log('Palette for', file.name, ':', palette); // Log 5
                        displayPhoto(file.name, img.src, palette);
                    } catch (error) {
                        console.error(`Error processing ${file.name}:`, error);
                    }
                };
            };
            reader.readAsDataURL(file);
        }
    }
});

function displayPhoto(fileName, imgSrc, palette) {
    const container = document.createElement('div');
    container.className = 'photo-container';

    const paletteDiv = document.createElement('div');
    paletteDiv.className = 'color-palette';

    // Create a message about the primary colors
    const messageDiv = document.createElement('div');
    messageDiv.className = 'color-message';
    const colorNames = palette.map(color => {
        const hexColor = rgbToHex(color[0], color[1], color[2]);
        return getColorName(hexColor);
    });
    messageDiv.textContent = `Primary colors found: ${colorNames.join(', ')}`;
    container.appendChild(messageDiv);

    palette.forEach(color => {
        // Color box
        const colorBox = document.createElement('div');
        colorBox.className = 'color-box';
        colorBox.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

        // Color info
        const colorInfo = document.createElement('div');
        colorInfo.className = 'color-info';

        const hexColor = rgbToHex(color[0], color[1], color[2]);
        const colorName = getColorName(hexColor);

        const colorNameSpan = document.createElement('span');
        colorNameSpan.className = 'color-name';
        colorNameSpan.textContent = colorName;

        const colorCodeSpan = document.createElement('span');
        colorCodeSpan.className = 'color-code';
        colorCodeSpan.textContent = hexColor;

        colorInfo.appendChild(colorNameSpan);
        colorInfo.appendChild(colorCodeSpan);

        // Color container
        const colorContainer = document.createElement('div');
        colorContainer.className = 'color-container';
        colorContainer.appendChild(colorBox);
        colorContainer.appendChild(colorInfo);

        paletteDiv.appendChild(colorContainer);
    });

    container.appendChild(paletteDiv);
    resultsDiv.appendChild(container);
}

function rgbToHex(r, g, b) {
    return (
        '#' +
        [r, g, b]
            .map(x => {
                const hex = x.toString(16);
                return hex.length === 1 ? '0' + hex : hex;
            })
            .join('')
    );
}

function getColorName(hexColor) {
    // A larger set of named colors (add more as needed)
    const colorMap = {
        '#000000': 'Black',
        '#808080': 'Gray',
        '#c0c0c0': 'Silver',
        '#ffffff': 'White',
        '#800000': 'Maroon',
        '#ff0000': 'Red',
        '#800080': 'Purple',
        '#ff00ff': 'Fuchsia',
        '#008000': 'Green',
        '#00ff00': 'Lime',
        '#808000': 'Olive',
        '#ffff00': 'Yellow',
        '#000080': 'Navy',
        '#0000ff': 'Blue',
        '#00ffff': 'Aqua',
        '#008080': 'Teal',
        '#a52a2a': 'Brown',
        '#d2b48c': 'Tan',
        '#f5f5dc': 'Beige',
        '#deb887': 'Burlywood',
        '#bc8f8f': 'Rosy Brown',
        '#bdb76b': 'Dark Khaki',
        '#556b2f': 'Dark Olive Green',
        '#6b8e23': 'Olive Drab',
        '#4682b4': 'Steel Blue',
        '#d2691e': 'Chocolate',
        '#cd853f': 'Peru',
        '#f4a460': 'Sandy Brown',
        '#daa520': 'Goldenrod',
        '#b8860b': 'Dark Goldenrod',
        '#a0522d': 'Sienna',
        '#8b4513': 'Saddle Brown',
        '#2e8b57': 'Sea Green',
        '#228b22': 'Forest Green',
        '#6a5acd': 'Slate Blue',
        '#7b68ee': 'Medium Slate Blue',
        '#b22222': 'Fire Brick',
        '#ff4500': 'Orange Red',
        '#ffa500': 'Orange',
        '#ffd700': 'Gold',
        '#adff2f': 'Green Yellow',
        '#7fff00': 'Chartreuse',
        '#00fa9a': 'Medium Spring Green',
        '#00ced1': 'Dark Turquoise',
        '#1e90ff': 'Dodger Blue',
        '#6495ed': 'Cornflower Blue',
        '#dc143c': 'Crimson',
        '#ff69b4': 'Hot Pink',
        '#c71585': 'Medium Violet Red',
        '#db7093': 'Pale Violet Red'
        // ... add more as needed
    };

    // Convert hex to RGB
    function hexToRgb(hex) {
        hex = hex.replace('#', '');
        if (hex.length === 3) {
            hex = hex.split('').map(x => x + x).join('');
        }
        const num = parseInt(hex, 16);
        return [num >> 16, (num >> 8) & 0xff, num & 0xff];
    }

    // Find the closest color
    let minDist = Infinity;
    let closestName = 'Unknown';
    const rgb = hexToRgb(hexColor);

    for (const [namedHex, name] of Object.entries(colorMap)) {
        const nRgb = hexToRgb(namedHex);
        const dist = Math.sqrt(
            Math.pow(rgb[0] - nRgb[0], 2) +
            Math.pow(rgb[1] - nRgb[1], 2) +
            Math.pow(rgb[2] - nRgb[2], 2)
        );
        if (dist < minDist) {
            minDist = dist;
            closestName = name;
        }
    }
    return closestName;
}

// Add Clear Results button functionality
const clearBtn = document.getElementById('clearResultsBtn');
if (clearBtn) {
    clearBtn.addEventListener('click', function() {
        resultsDiv.innerHTML = '';
    });
}

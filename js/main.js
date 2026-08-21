const generateBtn = document.getElementById('generate-btn');
const paletteSizeSelect = document.getElementById('palette-size-selector');
const palettesContainer = document.getElementById('palette-container');
const toastMessage = document.getElementById('toast-message');
const hexFormatBtn = document.getElementById('hex-format-btn');
const hslFormatBtn = document.getElementById('hsl-format-btn');
const savePaletteBtn = document.getElementById('save-palette-btn');
const savedPalettesContainer = document.getElementById('saved-palette-container');
const savedPalettesSection = document.getElementById('saved-palettes-section');
const viewSavedPaletteBtn = document.getElementById('view-saved-palettes-btn');
const navItems = document.getElementById('nav-items');
const hideSavedPalettesBtn = document.getElementById('hide-saved-palettes-btn')

// helper: RGB a HEX
const rgbToHex = (rgb) => {
    const [r, g, b] = rgb.match(/\d+/g).map(Number);
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase();
};

// helper: RGB a HSL
const rgbToHsl = (rgb) => {
    let [r, g, b] = rgb.match(/\d+/g).map(Number);
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
};

// helper: calculador de contraste para código de color
const getContrastColor = (rgbString) => {
    const [r, g, b] = rgbString.match(/\d+/g).map(Number);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#000000' : '#FFFFFF';
};

// generadora de colores aleatorios
const generateRandomHexColor = () => {
    const hexCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    let hexColor = '#';

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * hexCharacters.length);
        hexColor += hexCharacters[randomIndex];
    }

    return hexColor;
}

// creador de paletas dentro del contenedor HTML
let currentPalleteSize = 6;
const generatePalette = () => {
    palettesContainer.innerHTML = '';
    for (let i = 0; i < currentPalleteSize; i++) {
        const randomColor = generateRandomHexColor();

        const card = document.createElement('div');
        card.classList.add('color-card');

        card.style.backgroundColor = randomColor;
        card.textContent = randomColor;
        card.style.color = getContrastColor(card.style.backgroundColor);

        card.addEventListener('click', () => {
            navigator.clipboard.writeText(randomColor);
            showToast(randomColor);
        });

        palettesContainer.appendChild(card);
    }
};

// modificadora de variable currentPalleteSize, que toma el valor del tamaño de paleta seleccionada y genera una nueva
const sizeButtons = document.querySelectorAll('#palette-size-selector button');
sizeButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
        // Sacamos clase active a todos los botones de tamaño
        sizeButtons.forEach(btn => btn.classList.remove('active'));
        // Se la ponemos solo al clickeado
        event.target.classList.add('active');

        currentPalleteSize = parseInt(event.target.textContent);
        generatePalette();
    });
});

// toast message pop up
const showToast = () => {
    toastMessage.classList.remove('hidden');

    setTimeout(() => {
        toastMessage.classList.add('hidden');
    }, 2000)
};

// cambio de formato HEX/HSL
let currentFormat = 'HEX';
const changeFormat = (newFormat) => {
    if (currentFormat !== newFormat) {
        currentFormat = newFormat;

        // Seleccionamos TODAS las color-cards (tanto las del generador como las guardadas)
        let colorCards = document.querySelectorAll('.color-card');

        colorCards.forEach((card) => {
            const currentRgbColor = card.style.backgroundColor;

            if (currentFormat === 'HEX') {
                card.textContent = rgbToHex(currentRgbColor);
            } else {
                card.textContent = rgbToHsl(currentRgbColor);
            }
        });

        if (currentFormat === 'HEX') {
            document.getElementById('hex-format-btn').classList.add('active');
            document.getElementById('hsl-format-btn').classList.remove('active');
        } else {
            document.getElementById('hsl-format-btn').classList.add('active');
            document.getElementById('hex-format-btn').classList.remove('active');
        }
    };
};

// guardar paletas
savePaletteBtn.addEventListener('click', () => {
    const colorCards = document.querySelectorAll('#palette-container .color-card');
    const colorsToSave = [];

    colorCards.forEach((card) => {
        colorsToSave.push(card.style.backgroundColor);
    });

    const savedData = localStorage.getItem('savedPalettesList');
    let savedPalettes = savedData ? JSON.parse(savedData) : [];
    savedPalettes.unshift(colorsToSave);

    if (savedPalettes.length > 10) {
        savedPalettes.pop();
    };

    localStorage.setItem('savedPalettesList', JSON.stringify(savedPalettes));

    renderSavedPalette();
});

// renderizar paletas
const renderSavedPalette = () => {
    const savedData = localStorage.getItem('savedPalettesList');

    if (savedData) {
        const savedPalettes = JSON.parse(savedData);

        if (!document.getElementById('hide-saved-palettes-btn-li')) {
            const listItem = document.createElement('li');
            const hidePaletteBtn = document.createElement('button');
            const btnImg = document.createElement('img');

            hidePaletteBtn.setAttribute('id', 'hide-saved-palettes-btn');
            hidePaletteBtn.innerHTML = 'Ocultar paletas guardadas';

            btnImg.src = './assets/img/icons/visibility_off_24dp_FFFFFF.svg';
            btnImg.alt = 'hide-saved-palette-img';

            hidePaletteBtn.append(btnImg);
            hidePaletteBtn.addEventListener('click', removeSavedPalettes);

            listItem.setAttribute('id', 'hide-saved-palettes-btn-li');
            listItem.appendChild(hidePaletteBtn);

            navItems.append(listItem);
        }

        if (savedPalettes.length > 0) {
            savedPalettesSection.style.display = 'flex';
            savedPalettesContainer.innerHTML = '';

            savedPalettes.forEach((palette) => {
                const paletteRow = document.createElement('div');
                paletteRow.classList.add('palette');

                palette.forEach((color) => {
                    const card = document.createElement('div');
                    card.classList.add('color-card');
                    card.style.backgroundColor = color;

                    if (currentFormat === 'HEX') {
                        card.textContent = rgbToHex(color);
                    } else {
                        card.textContent = rgbToHsl(color);
                    }

                    card.style.color = getContrastColor(card.style.backgroundColor);

                    paletteRow.appendChild(card);
                });

                savedPalettesContainer.appendChild(paletteRow);
            });
        } else {
            savedPalettesSection.style.display = 'none';
        }
    } else {
        savedPalettesSection.style.display = 'none';
    }
};

// ocultar paletas
const removeSavedPalettes = () => {
    if (document.getElementById('hide-saved-palettes-btn-li')) {
        const hideSavedPalettesBtnContainer = document.getElementById('hide-saved-palettes-btn-li');
        hideSavedPalettesBtnContainer.remove();
        savedPalettesContainer.innerHTML = '';
        savedPalettesSection.style.display = 'none';
    } else {
        return;
    };
};

hexFormatBtn.addEventListener('click', () => changeFormat('HEX'));
hslFormatBtn.addEventListener('click', () => changeFormat('HSL'));
generateBtn.addEventListener('click', generatePalette);
viewSavedPaletteBtn.addEventListener('click', renderSavedPalette);

generatePalette();
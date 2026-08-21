import { rgbToHex, rgbToHsl, getContrastColor, generateRandomHexColor } from './helper.js';

const palettesContainer = document.getElementById('palette-container');
const toastMessage = document.getElementById('toast-message');
const savedPalettesContainer = document.getElementById('saved-palette-container');
const savedPalettesSection = document.getElementById('saved-palettes-section');
const navItems = document.getElementById('nav-items');

// render de paletas
let currentPalleteSize = 6;
export const generatePalette = () => {
    palettesContainer.innerHTML = '';
    
    for (let i = 0; i < currentPalleteSize; i++) {
        const randomColor = generateRandomHexColor();
        const card = document.createElement('div');
        
        card.classList.add('color-card');
        card.style.backgroundColor = randomColor;

        if (currentFormat === 'HEX') {
            card.textContent = randomColor;
            card.style.fontSize = '';
        } else {
            card.textContent = rgbToHsl(card.style.backgroundColor);
            card.style.fontSize = 'medium';
        }

        card.style.color = getContrastColor(card.style.backgroundColor);

        card.addEventListener('click', () => {
            const colorToCopy = card.textContent;
            navigator.clipboard.writeText(colorToCopy);
            showToast(colorToCopy);
        });

        palettesContainer.appendChild(card);
    }
};

// modificadora de variable currentPalleteSize, que toma el valor del tamaño de paleta seleccionada y genera una nueva
export const sizeButtons = document.querySelectorAll('#palette-size-selector button');
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
export const showToast = () => {
    toastMessage.classList.remove('hidden');

    setTimeout(() => {
        toastMessage.classList.add('hidden');
    }, 2000)
};

// cambio de formato HEX/HSL
let currentFormat = 'HEX';
export const changeFormat = (newFormat) => {
    if (currentFormat !== newFormat) {
        currentFormat = newFormat;

        let colorCards = document.querySelectorAll('.color-card');
        
        colorCards.forEach((card) => {
            const currentRgbColor = card.style.backgroundColor;

            if (currentFormat === 'HEX') {
                card.textContent = rgbToHex(currentRgbColor);
                card.style.fontSize = '';
            } else {
                card.textContent = rgbToHsl(currentRgbColor);
                card.style.fontSize = 'medium';
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

// renderizar paletas guardadas
export const renderSavedPalette = () => {
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
                        card.style.fontSize = '';
                    } else {
                        card.textContent = rgbToHsl(color);
                        card.style.fontSize = 'medium';
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
export const removeSavedPalettes = () => {
    if (document.getElementById('hide-saved-palettes-btn-li')) {
        const hideSavedPalettesBtnContainer = document.getElementById('hide-saved-palettes-btn-li');
        hideSavedPalettesBtnContainer.remove();
        savedPalettesContainer.innerHTML = '';
        savedPalettesSection.style.display = 'none';
    } else {
        return;
    };
};

// guardar paletas
export const savePalette = () => {
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
};
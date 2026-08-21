import { generatePalette, changeFormat, renderSavedPalette, savePalette } from './functions.js'

const generateBtn = document.getElementById('generate-btn');
const hexFormatBtn = document.getElementById('hex-format-btn');
const hslFormatBtn = document.getElementById('hsl-format-btn');
const savePaletteBtn = document.getElementById('save-palette-btn');
const viewSavedPaletteBtn = document.getElementById('view-saved-palettes-btn');

savePaletteBtn.addEventListener('click', savePalette);
hexFormatBtn.addEventListener('click', () => changeFormat('HEX'));
hslFormatBtn.addEventListener('click', () => changeFormat('HSL'));
generateBtn.addEventListener('click', generatePalette);
viewSavedPaletteBtn.addEventListener('click', renderSavedPalette);

generatePalette();
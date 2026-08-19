const generateBtn = document.getElementById('generate-btn');
const paletteSizeSelect = document.getElementById('palette-size-selector');
const palettesContainer = document.getElementById('palette-container');

console.log("Generate Button:", generateBtn);
console.log("Size Selector:", paletteSizeSelect);
console.log("Palettes Container:", palettesContainer);

const generateRandomHex = () =>{
    const hexCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    let hexColor = '#';

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * hexCharacters.length);
        hexColor += hexCharacters[randomIndex];
    }

    return hexColor;
}

console.log("RC1 ", generateRandomHex());
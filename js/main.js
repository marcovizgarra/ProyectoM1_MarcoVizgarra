const generateBtn = document.getElementById('generate-btn');
const paletteSizeSelect = document.getElementById('palette-size-selector');
const palettesContainer = document.getElementById('palette-container');

console.log("Generate Button:", generateBtn);
console.log("Size Selector:", paletteSizeSelect);
console.log("Palettes Container:", palettesContainer);

const generateRandomHexColor = () =>{
    const hexCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    let hexColor = '#';

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * hexCharacters.length);
        hexColor += hexCharacters[randomIndex];
    }

    return hexColor;
}

let currentPalleteSize = 6;

const generatePalette = () => {
    palettesContainer.innerHTML = '';
    for (let i = 0; i < currentPalleteSize; i++) {
        const randomColor = generateRandomHexColor();

        const card = document.createElement('div');
        card.classList.add('color-card');

        card.style.backgroundColor = randomColor;
        card.textContent = randomColor;

        palettesContainer.appendChild(card);
    }
};

const sizeButtons = document.querySelectorAll('#palette-size-selector button');

sizeButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            currentPalleteSize = parseInt(event.target.textContent);
            generatePalette();
    });
});

generateBtn.addEventListener('click', generatePalette);
generatePalette();


// const generatePalette = () => {
//     const colorCards = document.querySelectorAll('.color-card');

//     colorCards.forEach(
//         (card) => {
//             const randomColor = generateRandomHexColor();
//             card.style.backgroundColor = randomColor;
//             card.textContent = randomColor;
//         }
//     )
// };

// generatePalette();
// generateBtn.addEventListener('click', generatePalette);
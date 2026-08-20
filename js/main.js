const generateBtn = document.getElementById('generate-btn');
const paletteSizeSelect = document.getElementById('palette-size-selector');
const palettesContainer = document.getElementById('palette-container');
const toastMessage = document.getElementById('toast-message');

// función generadora de colores aleatorios
const generateRandomHexColor = () =>{
    const hexCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    let hexColor = '#';

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * hexCharacters.length);
        hexColor += hexCharacters[randomIndex];
    }

    return hexColor;
}

// función creadora de paletas dentro del contenedor HTML
let currentPalleteSize = 6;
const generatePalette = () => {
    palettesContainer.innerHTML = '';
    for (let i = 0; i < currentPalleteSize; i++) {
        const randomColor = generateRandomHexColor();

        const card = document.createElement('div');
        card.classList.add('color-card');

        card.style.backgroundColor = randomColor;
        card.textContent = randomColor;

        card.addEventListener('click', () => {
            navigator.clipboard.writeText(randomColor);
            showToast(randomColor);
        });

        palettesContainer.appendChild(card);
    }
};

// función modificadora de variable currentPalleteSize, que toma el valor del tamaño de paleta seleccionada y genera una nueva
const sizeButtons = document.querySelectorAll('#palette-size-selector button');
sizeButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
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

generateBtn.addEventListener('click', generatePalette);
generatePalette();
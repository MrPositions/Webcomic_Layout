document.addEventListener('DOMContentLoaded', () => {
        const numberDisplay = document.getElementById('number-display');
        const generateButton = document.getElementById('generate-button');
        let availableNumbers = [];

        function fetchAvailableNumbers() {
            fetch("https://dummyjson.com/products") // Dummy API endpoint for demonstration
                .then(response => response.json())
                .then(data => {
                    // Assuming the API returns an array of products with 'id' fields
                    availableNumbers = data.products.map(product => product.id);
                    generateButton.disabled = false; // Enable the button
                    generateButton.classList.add('enabled'); // Update button style
                })
                .catch(error => console.error('Error fetching the available numbers:', error));
        }

        function getRandomNumber() {
            if (availableNumbers.length > 0) {
                const randomIndex = Math.floor(Math.random() * availableNumbers.length);
                return availableNumbers[randomIndex];
            }
            return null;
        }

        generateButton.addEventListener('click', () => {
            const randomNumber = getRandomNumber();
            if (randomNumber !== null) {
                numberDisplay.innerText = randomNumber;
            }
        });

        // Fetch available numbers on initial load
        fetchAvailableNumbers();
    });
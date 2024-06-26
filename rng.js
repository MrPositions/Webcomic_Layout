document.addEventListener('DOMContentLoaded', () => {
    const numberDisplay = document.getElementById('number-display');
    const generateButton = document.getElementById('generate-button');

    let randomNumber = null; // Initialize randomNumber variable

    function fetchRandomNumber() {
        fetch("https://katspotatoes.com/") // Replace with your API endpoint
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text(); // Read response as text
            })
            .then(data => {
                console.log('Raw data from API:', data); // Log raw data for verification

                // Assuming the response is in the format "your random data 55056"
                const numberPattern = /\d+/; // Regular expression to match digits

                // Extract the number from the response using regex
                randomNumber = data.match(numberPattern)[0];

                if (randomNumber) {
                    updateNumberDisplay(); // Update number display initially
                    enableButton(); // Enable the button for subsequent updates
                } else {
                    throw new Error('Number not found in API response');
                }
            })
            .catch(error => {
                console.error('Error fetching random number:', error);
                disableButton(); // Disable the button on error
            });
    }

    function updateNumberDisplay() {
        if (randomNumber !== null) {
            numberDisplay.innerText = randomNumber;
        }
    }

    function enableButton() {
        generateButton.disabled = false; // Enable the button
        generateButton.classList.add('enabled'); // Add enabled style
        generateButton.addEventListener('click', fetchRandomNumber); // Reattach event listener
    }

    function disableButton() {
        generateButton.disabled = true; // Disable the button on error
        generateButton.classList.remove('enabled'); // Remove enabled style
        generateButton.removeEventListener('click', fetchRandomNumber); // Remove event listener
    }

    // Initial fetch of random number
    fetchRandomNumber();
});

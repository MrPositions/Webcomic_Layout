document.addEventListener('DOMContentLoaded', () => {
            const userContainer = document.getElementById('user-container');

            fetch('http://dummyjson.com/users')
                .then(response => response.json())
                .then(data => {
                    console.log(data); // Log the data to see its structure
                    data.users.forEach(user => {
                        console.log(user); // Log each user to see its structure
                        const userCard = document.createElement('div');
                        userCard.classList.add('card');
                        userCard.innerText = `${user.firstName} ${user.lastName}`; // Adjusted to use firstName and lastName
                        userContainer.appendChild(userCard);
                    });
                })
                .catch(error => console.error('Error fetching the users:', error));
        });
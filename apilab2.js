document.addEventListener('DOMContentLoaded', () => {
    const userContainer = document.getElementById('user-container');

    fetch('https://dummyjson.com/users')
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log the data to see its structure
            data.users.forEach(user => {
                console.log(user); // Log each user to see its structure
                const userCard = document.createElement('div');
                userCard.classList.add('card');
                userCard.innerHTML = `
                    <h4>${user.firstName} ${user.lastName}</h4>
                    <p>Email: ${user.email}</p>
                    <p>Username: ${user.username}</p>
                `;
                userContainer.appendChild(userCard);
            });
        })
        .catch(error => console.error('Error fetching the users:', error));
});
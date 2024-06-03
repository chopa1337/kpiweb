document.addEventListener('DOMContentLoaded', () => {
    const dogsContainer = document.getElementById('dogs-container');
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    const closeButton = document.getElementById('close-button');

    closeButton.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    fetch('https://usersdogs.dmytrominochkin.cloud/dogs')
        .then(response => response.json())
        .then(data => {
            data.forEach(dog => {
                const dogCard = document.createElement('div');
                dogCard.classList.add('dog-card');
                dogCard.innerHTML = `
                    <img src="https://usersdogs.dmytrominochkin.cloud${dog.dogImage}" alt="${dog.title}" width="60" height="60">
                    <div>
                        <strong>${dog.title}</strong>
                        <span>${dog.sex.toLowerCase()}</span>
                    </div>
                `;
                dogCard.onclick = () => showDogDetails(dog);
                dogsContainer.appendChild(dogCard);
            });
        })
        .catch(error => console.error('Error fetching dogs:', error));

    function showDogDetails(dog) {
        modalContent.innerHTML = `
            <span class="close-button" id="close-button">&times;</span>
            <img src="https://usersdogs.dmytrominochkin.cloud${dog.dogImage}" alt="${dog.title}" width="100%">
            <h2>${dog.title}</h2>
            <p><strong>Sex:</strong> ${dog.sex}</p>
            <p><strong>Age:</strong> ${dog.age}</p>
            <p>${dog.description}</p>
            <button class="adopt-button" onclick="adoptDog(${dog.id})">Adopt Me</button>
        `;
        modal.style.display = "block";

        document.getElementById('close-button').onclick = function() {
            modal.style.display = "none";
        }
    }
});

function adoptDog(dogId) {
    alert('Thank you for adopting dog ID: ' + dogId);
}

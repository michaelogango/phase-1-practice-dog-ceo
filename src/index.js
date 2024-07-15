document.addEventListener('DOMContentLoaded', async function() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";

    try {
        const res = await fetch(imgUrl);
        const resbreed = await fetch(breedUrl);

        if (!res.ok || !resbreed.ok) {
            throw new Error('Error fetching data');
        }

        const dataImages = await res.json();
        const dataBreeds = await resbreed.json();

        const images = dataImages.message;
        const breedsObject = dataBreeds.message;

        const allBreeds = Object.keys(breedsObject);

        const breedContainer = document.getElementById("dog-breeds");
        const imageContainer = document.getElementById('dog-image-container');
        const filterContainer = document.getElementById('breed-dropdown');

        imageContainer.innerHTML = '';
        breedContainer.innerHTML = '';
        filterContainer.innerHTML = '';

        // Function to render breeds based on the selected letter
        function renderBreeds(letter) {
            breedContainer.innerHTML = '';

            const filteredBreeds = allBreeds.filter(breed => breed.startsWith(letter));

            filteredBreeds.forEach(breed => {
                const breedItem = document.createElement('li');
                breedItem.textContent = breed;

                // If there are sub-breeds, add them as nested <ul>
                if (breedsObject[breed].length > 0) {
                    const subBreedsList = document.createElement('ul');
                    breedsObject[breed].forEach(subBreed => {
                        const subBreedItem = document.createElement('li');
                        subBreedItem.textContent = subBreed;
                        subBreedsList.appendChild(subBreedItem);
                    });
                    breedItem.appendChild(subBreedsList);
                }

                breedItem.addEventListener('click', function() {
                    breedItem.style.color = 'yellow';
                });

                breedContainer.appendChild(breedItem);
            });
        }

        // Initial render of all breeds
        renderBreeds('');

        // Event listener for dropdown change
        filterContainer.addEventListener('change', function() {
            const selectedLetter = filterContainer.value.toLowerCase();
            renderBreeds(selectedLetter);
        });

        // Render images
        images.forEach(imgUrl => {
            const img = document.createElement('img');
            img.src = imgUrl;
            img.alt = 'Dog Image'; // Optional: Add alt text for accessibility
            imageContainer.appendChild(img);
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

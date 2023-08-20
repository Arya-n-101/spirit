const searchInput = document.getElementById('search-input');
const universityList = document.getElementById('university-list');
const submitButton = document.getElementById('submit-button');

const apiEndpoint = 'http://universities.hipolabs.com/search?country=india';

let lastTimeout; // For delaying search input processing

// Function to fetch and populate the universities
async function fetchUniversities(searchTerm) {
    try {
        const response = await fetch(`${apiEndpoint}&name=${searchTerm}`);
        const data = await response.json();
        
        universityList.innerHTML = '';
        
        if (data.length > 0) {
            data.forEach(university => {
                const listItem = document.createElement('li');
                listItem.textContent = university.name;
                listItem.addEventListener('click', () => {
                    searchInput.value = university.name;
                    universityList.style.display = 'none'; // Close the recommendation box
                });
                universityList.appendChild(listItem);
            });

            universityList.style.display = 'block'; // Show the recommendation box
        } else {
            universityList.style.display = 'none'; // Hide the recommendation box
        }
    } catch (error) {
        console.error('Error fetching universities:', error);
    }
}

searchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value.trim();
    
    // Clear any previous timeouts to avoid unnecessary API calls
    clearTimeout(lastTimeout);

    // Delay processing to improve performance and avoid excessive API calls
    lastTimeout = setTimeout(() => {
        if (searchTerm === '') {
            universityList.style.display = 'none'; // Close the recommendation box
        } else {
            fetchUniversities(searchTerm);
        }
    }, 300); // Delay for 300ms
});

submitButton.addEventListener('click', () => {
    const selectedUniversity = searchInput.value.trim();
    if (selectedUniversity !== '') {
        // You can perform further actions with the selectedUniversity value here
        console.log('Selected University:', selectedUniversity);
        
        // Clear the search input
        searchInput.value = '';
    }
});

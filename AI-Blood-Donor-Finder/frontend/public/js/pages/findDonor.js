// ===== FIND DONOR PAGE SCRIPT =====
// BloodFinder AI - Find Donor Page Logic

document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('donor-search-form');
    const searchResults = document.getElementById('search-results');
    const resultsGrid = document.getElementById('results-grid');
    const resultsCount = document.getElementById('results-count');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const voiceSearchBtn = document.getElementById('voice-search-btn');

    // Sample donor data
    const sampleDonors = [
        { id: 1, name: 'Priya Sharma', bloodGroup: 'O+', location: 'Mumbai', distance: 2.5, lastDonation: '2024-06-15', status: 'available', phone: '+91 9876543210', rating: 4.8 },
        { id: 2, name: 'Rajesh Kumar', bloodGroup: 'O+', location: 'Mumbai', distance: 3.2, lastDonation: '2024-05-20', status: 'available', phone: '+91 9876543211', rating: 4.9 },
        { id: 3, name: 'Anjali Patel', bloodGroup: 'O+', location: 'Thane', distance: 5.8, lastDonation: '2024-06-10', status: 'pending', phone: '+91 9876543212', rating: 4.7 },
        { id: 4, name: 'Amit Desai', bloodGroup: 'O+', location: 'Navi Mumbai', distance: 8.5, lastDonation: '2024-04-15', status: 'available', phone: '+91 9876543213', rating: 4.6 },
        { id: 5, name: 'Sneha Gupta', bloodGroup: 'O+', location: 'Mumbai', distance: 1.2, lastDonation: '2024-06-25', status: 'available', phone: '+91 9876543214', rating: 4.9 },
        { id: 6, name: 'Vikram Singh', bloodGroup: 'O+', location: 'Mumbai', distance: 4.3, lastDonation: '2024-03-10', status: 'available', phone: '+91 9876543215', rating: 4.5 }
    ];

    // Handle search form submission
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            performSearch();
        });
    }

    // Handle voice search
    if (voiceSearchBtn) {
        voiceSearchBtn.addEventListener('click', function() {
            voiceService.startListening();
        });
    }

    // Handle filter buttons
    if (filterBtns) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                applyFilter(this.dataset.filter);
            });
        });
    }

    // Perform search
    function performSearch() {
        const bloodGroup = document.getElementById('search-blood-group').value;
        const location = document.getElementById('search-location').value;
        const radius = document.getElementById('search-radius').value;

        if (!bloodGroup || !location) {
            alert('Please select a blood group and enter a location.');
            return;
        }

        // Filter donors based on criteria
        const filteredDonors = sampleDonors.filter(donor => {
            return donor.bloodGroup === bloodGroup &&
                   donor.distance <= parseInt(radius);
        });

        // Sort by distance
        filteredDonors.sort((a, b) => a.distance - b.distance);

        // Display results
        displayResults(filteredDonors);
    }

    // Display search results
    function displayResults(donors) {
        if (!searchResults || !resultsGrid) return;

        searchResults.style.display = 'block';
        resultsCount.textContent = `Found ${donors.length} donors matching your criteria`;

        resultsGrid.innerHTML = '';

        if (donors.length === 0) {
            resultsGrid.innerHTML = '<p style="text-align: center; color: var(--gray); padding: 2rem;">No donors found matching your criteria. Try expanding your search radius.</p>';
            return;
        }

        donors.forEach(donor => {
            const donorCard = createDonorCard(donor);
            resultsGrid.appendChild(donorCard);
        });
    }

    // Create donor card element
    function createDonorCard(donor) {
        const card = document.createElement('div');
        card.className = 'donor-card';
        card.innerHTML = `
            <div class="donor-card-header">
                <img src="https://via.placeholder.com/60" alt="${donor.name}" class="donor-avatar">
                <div class="donor-info">
                    <h3>${donor.name}</h3>
                    <span class="donor-blood-group">${donor.bloodGroup}</span>
                </div>
            </div>
            <div class="donor-details">
                <div class="donor-detail-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${donor.location} (${donor.distance} km)</span>
                </div>
                <div class="donor-detail-item">
                    <i class="fas fa-tint"></i>
                    <span>Last donation: ${formatDate(donor.lastDonation)}</span>
                </div>
                <div class="donor-detail-item">
                    <i class="fas fa-phone"></i>
                    <span>${donor.phone}</span>
                </div>
                <div class="donor-detail-item">
                    <i class="fas fa-star"></i>
                    <span>${donor.rating} rating</span>
                </div>
            </div>
            <div class="donor-actions">
                <button class="btn btn-sm btn-primary" onclick="contactDonor(${donor.id})">
                    <i class="fas fa-phone"></i> Contact
                </button>
                <button class="btn btn-sm btn-outline" onclick="sendRequest(${donor.id})">
                    <i class="fas fa-paper-plane"></i> Request
                </button>
            </div>
        `;
        return card;
    }

    // Apply filter
    function applyFilter(filter) {
        const cards = document.querySelectorAll('.donor-card');
        cards.forEach(card => {
            if (filter === 'all') {
                card.style.display = '';
            } else if (filter === 'available') {
                const status = card.querySelector('.donor-detail-item span:last-child').textContent;
                card.style.display = status.includes('available') ? '' : 'none';
            } else if (filter === 'recent') {
                card.style.display = '';
            }
        });
    }

    // Format date
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    // Contact donor
    window.contactDonor = function(id) {
        const donor = sampleDonors.find(d => d.id === id);
        if (donor) {
            alert(`Calling ${donor.name} at ${donor.phone}`);
        }
    };

    // Send request to donor
    window.sendRequest = function(id) {
        const donor = sampleDonors.find(d => d.id === id);
        if (donor) {
            alert(`Request sent to ${donor.name}. They will contact you soon.`);
        }
    };

    // Check for URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const bloodGroupParam = urlParams.get('blood');
    const locationParam = urlParams.get('location');

    if (bloodGroupParam && locationParam) {
        document.getElementById('search-blood-group').value = bloodGroupParam;
        document.getElementById('search-location').value = locationParam;
        performSearch();
    }
});

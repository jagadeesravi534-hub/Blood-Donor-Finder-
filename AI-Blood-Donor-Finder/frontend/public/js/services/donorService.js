// ===== DONOR SERVICE =====
// BloodFinder AI - Donor Service

class DonorService {
    // Search for donors
    async searchDonors(criteria) {
        try {
            const response = await fetchAPI('/donors/search', {
                method: 'POST',
                body: JSON.stringify(criteria)
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Get donor by ID
    async getDonorById(id) {
        try {
            const response = await fetchAPI(`/donors/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Get nearby donors
    async getNearbyDonors(location, bloodGroup, radius = 10) {
        try {
            const response = await fetchAPI('/donors/nearby', {
                method: 'POST',
                body: JSON.stringify({ location, bloodGroup, radius })
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Send emergency alert
    async sendEmergencyAlert(alertData) {
        try {
            const response = await fetchAPI('/donors/emergency-alert', {
                method: 'POST',
                body: JSON.stringify(alertData)
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Get donor donation history
    async getDonationHistory(donorId) {
        try {
            const response = await fetchAPI(`/donors/${donorId}/donations`);
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Update donor availability
    async updateAvailability(isAvailable) {
        try {
            const response = await fetchAPI('/donors/availability', {
                method: 'PUT',
                body: JSON.stringify({ isAvailable })
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Get donor statistics
    async getDonorStats(donorId) {
        try {
            const response = await fetchAPI(`/donors/${donorId}/stats`);
            return response;
        } catch (error) {
            throw error;
        }
    }

    // AI-powered donor matching
    async aiMatchDonors(requestData) {
        try {
            const response = await fetchAPI('/ai/donor-matching', {
                method: 'POST',
                body: JSON.stringify(requestData)
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Predict donor response
    async predictResponse(donorId, requestData) {
        try {
            const response = await fetchAPI('/ai/response-prediction', {
                method: 'POST',
                body: JSON.stringify({ donorId, ...requestData })
            });
            return response;
        } catch (error) {
            throw error;
        }
    }
}

const donorService = new DonorService();

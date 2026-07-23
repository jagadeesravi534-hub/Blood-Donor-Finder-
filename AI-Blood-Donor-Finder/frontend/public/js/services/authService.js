 // ===== AUTHENTICATION SERVICE =====
// BloodFinder AI - Authentication Service

class AuthService {
    constructor() {
        this.token = localStorage.getItem('token');
        this.user = JSON.parse(localStorage.getItem('user'));
    }

    // Login user
    async login(email, password) {
        try {
            const response = await fetchAPI('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });

            if (response.token) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));
                this.token = response.token;
                this.user = response.user;
            }

            return response;
        } catch (error) {
            throw error;
        }
    }

    // Register user
    async register(userData) {
        try {
            const response = await fetchAPI('/auth/register', {
                method: 'POST',
                body: JSON.stringify(userData)
            });

            if (response.token) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));
                this.token = response.token;
                this.user = response.user;
            }

            return response;
        } catch (error) {
            throw error;
        }
    }

    // Logout user
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.token = null;
        this.user = null;
        window.location.href = '/login.html';
    }

    // Check if user is authenticated
    isAuthenticated() {
        return !!this.token;
    }

    // Get current user
    getCurrentUser() {
        return this.user;
    }

    // Get user role
    getUserRole() {
        return this.user?.role || 'donor';
    }

    // Update user profile
    async updateProfile(profileData) {
        try {
            const response = await fetchAPI('/auth/profile', {
                method: 'PUT',
                body: JSON.stringify(profileData)
            });

            if (response.user) {
                localStorage.setItem('user', JSON.stringify(response.user));
                this.user = response.user;
            }

            return response;
        } catch (error) {
            throw error;
        }
    }

    // Change password
    async changePassword(currentPassword, newPassword) {
        try {
            const response = await fetchAPI('/auth/change-password', {
                method: 'POST',
                body: JSON.stringify({ currentPassword, newPassword })
            });

            return response;
        } catch (error) {
            throw error;
        }
    }

    // Request password reset
    async requestPasswordReset(email) {
        try {
            const response = await fetchAPI('/auth/forgot-password', {
                method: 'POST',
                body: JSON.stringify({ email })
            });

            return response;
        } catch (error) {
            throw error;
        }
    }

    // Reset password
    async resetPassword(token, newPassword) {
        try {
            const response = await fetchAPI('/auth/reset-password', {
                method: 'POST',
                body: JSON.stringify({ token, newPassword })
            });

            return response;
        } catch (error) {
            throw error;
        }
    }
}

// Create singleton instance
const authService = new AuthService();

// Feature flags configuration
const FEATURES = {
    SHOW_IMAGES: false // Set to true to show images, false for color-only view
};

// Export the configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FEATURES };
} 
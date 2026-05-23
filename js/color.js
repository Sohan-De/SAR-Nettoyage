/**
 * COLOR THEME MANAGER (js/color.js)
 * Easily configure or change the entire website color scheme.
 * Modify the 'activeTheme' variable below, or call themeManager.setTheme('themeName') in console.
 */

const themeManager = {
    // 1. CHOOSE YOUR ACTIVE THEME HERE:
    // Available presets: 'blue', 'emerald', 'purple', 'orange', 'gold', 'cyan', 'rose'
    activeTheme: 'blue',

    // 2. THEME DEFINITIONS
    presets: {
        blue: {
            '--primary': '#2563eb',
            '--primary-hover': '#1d4ed8',
            '--primary-light': '#eff6ff',
            '--dark': '#0f172a',
            '--dark-muted': '#475569',
            '--light-bg': '#f8fafc'
        },
        emerald: {
            '--primary': '#10b981',
            '--primary-hover': '#047857',
            '--primary-light': '#ecfdf5',
            '--dark': '#064e3b',
            '--dark-muted': '#374151',
            '--light-bg': '#f9fafb'
        },
        purple: {
            '--primary': '#7c3aed',
            '--primary-hover': '#6d28d9',
            '--primary-light': '#f5f3ff',
            '--dark': '#1e1b4b',
            '--dark-muted': '#4b5563',
            '--light-bg': '#faf5ff'
        },
        orange: {
            '--primary': '#ea580c',
            '--primary-hover': '#c2410c',
            '--primary-light': '#fff7ed',
            '--dark': '#1c1917',
            '--dark-muted': '#44403c',
            '--light-bg': '#fafaf9'
        },
        gold: {
            '--primary': '#b45309',
            '--primary-hover': '#92400e',
            '--primary-light': '#fdf6e2',
            '--dark': '#1c1917',
            '--dark-muted': '#4b5563',
            '--light-bg': '#fcfaf2'
        },
        cyan: {
            '--primary': '#0891b2',
            '--primary-hover': '#0e7490',
            '--primary-light': '#ecfeff',
            '--dark': '#09333f',
            '--dark-muted': '#475569',
            '--light-bg': '#f8fafc'
        },
        rose: {
            '--primary': '#e11d48',
            '--primary-hover': '#be123c',
            '--primary-light': '#fff1f2',
            '--dark': '#1e1b4b',
            '--dark-muted': '#4b5563',
            '--light-bg': '#fffafb'
        }
    },

    // 3. CORE MANAGEMENT FUNCTIONS
    init() {
        // Load saved theme preference if it exists, otherwise use default activeTheme
        const savedTheme = localStorage.getItem('theme-selection') || this.activeTheme;
        this.setTheme(savedTheme, false);
    },

    /**
     * Set site theme preset
     * @param {string} themeName - Name of preset theme ('blue', 'emerald', etc.)
     * @param {boolean} persist - Save to localStorage (default true)
     */
    setTheme(themeName, persist = true) {
        const theme = this.presets[themeName];
        if (!theme) {
            console.warn(`Theme "${themeName}" not found. Available:`, Object.keys(this.presets));
            return;
        }

        // Apply all theme colors dynamically to document root variables
        Object.keys(theme).forEach(variable => {
            document.documentElement.style.setProperty(variable, theme[variable]);
        });

        if (persist) {
            localStorage.setItem('theme-selection', themeName);
        }
        
        console.log(`%c Theme changed to: ${themeName.toUpperCase()} `, 'background: var(--primary); color: #fff; padding: 4px; border-radius: 4px;');
    },

    /**
     * Apply custom colors dynamically
     * @param {object} customColors - Object mapping CSS variables to color hex/rgba values
     */
    setCustomColors(customColors) {
        Object.keys(customColors).forEach(variable => {
            document.documentElement.style.setProperty(variable, customColors[variable]);
        });
        localStorage.removeItem('theme-selection'); // Clear preset flag
        console.log('Custom theme colors applied.');
    }
};

// Initialize theme immediately to prevent layout flashes
themeManager.init();

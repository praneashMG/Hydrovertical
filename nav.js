(function() {
    // Theme Toggle (Desktop + Mobile)
    const desktopThemeBtn = document.getElementById('themeToggle');
    const mobileThemeBtn = document.getElementById('mobileThemeToggle');
    
    function toggleTheme() {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        
        // Toggle icon for desktop theme button
        if (desktopThemeBtn) {
            const icon = desktopThemeBtn.querySelector('i');
            if (icon) {
                if (isDark) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                } else {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
            }
        }
        
        // Update mobile button text
        if (mobileThemeBtn) {
            mobileThemeBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i> <span>Light</span>' : '<i class="fas fa-moon"></i> <span>Dark</span>';
        }
        
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
    
    if (desktopThemeBtn) desktopThemeBtn.addEventListener('click', toggleTheme);
    if (mobileThemeBtn) mobileThemeBtn.addEventListener('click', toggleTheme);
    
    // Load saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.body.classList.add('dark');
        if (desktopThemeBtn) {
            const icon = desktopThemeBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        }
        if (mobileThemeBtn) {
            mobileThemeBtn.innerHTML = '<i class="fas fa-sun"></i> <span>Light</span>';
        }
    }

    // Listen for system theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                if (e.matches) {
                    document.body.classList.add('dark');
                    if (mobileThemeBtn) mobileThemeBtn.innerHTML = '<i class="fas fa-sun"></i> <span>Light</span>';
                } else {
                    document.body.classList.remove('dark');
                    if (mobileThemeBtn) mobileThemeBtn.innerHTML = '<i class="fas fa-moon"></i> <span>Dark</span>';
                }
            }
        });
    }
    
    // RTL Toggle (Desktop + Mobile)
    const desktopRtlBtn = document.getElementById('rtlToggle');
    const mobileRtlBtn = document.getElementById('mobileRtlToggle');
    
    function toggleRTL() {
        const currentDir = document.body.getAttribute('dir');
        if (currentDir === 'rtl') {
            document.body.removeAttribute('dir');
            localStorage.setItem('dir', 'ltr');
            if (mobileRtlBtn) mobileRtlBtn.innerHTML = '<i class="fas fa-exchange-alt"></i> <span>RTL</span>';
        } else {
            document.body.setAttribute('dir', 'rtl');
            localStorage.setItem('dir', 'rtl');
            if (mobileRtlBtn) mobileRtlBtn.innerHTML = '<i class="fas fa-exchange-alt"></i> <span>LTR</span>';
        }
    }
    
    if (desktopRtlBtn) desktopRtlBtn.addEventListener('click', toggleRTL);
    if (mobileRtlBtn) mobileRtlBtn.addEventListener('click', toggleRTL);
    
    if (localStorage.getItem('dir') === 'rtl') {
        document.body.setAttribute('dir', 'rtl');
        if (mobileRtlBtn) mobileRtlBtn.innerHTML = '<i class="fas fa-exchange-alt"></i> <span>LTR</span>';
    } else {
        if (mobileRtlBtn) mobileRtlBtn.innerHTML = '<i class="fas fa-exchange-alt"></i> <span>RTL</span>';
    }
    
    // Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    
    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileNav.classList.toggle('open');
        });
        
        const allMobileLinks = mobileNav.querySelectorAll('a, .mobile-action-btn');
        allMobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                setTimeout(() => {
                    mobileNav.classList.remove('open');
                }, 100);
            });
        });
    }
    
    // Back to Top Button
    const btt = document.getElementById('btt');
    if (btt) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 400) {
                btt.classList.add('show');
            } else {
                btt.classList.remove('show');
            }
        });
        
        btt.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#' && targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    if (mobileNav && mobileNav.classList.contains('open')) {
                        mobileNav.classList.remove('open');
                    }
                }
            }
        });
    });
    
    // Active Link Detection
    function setActiveLink() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav .nav-link, .dropdown-menu a, .mobile-dropdown a');
        
        allNavLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;
            
            const linkPath = href.split('/').pop();
            
            // Remove active class first
            link.classList.remove('active');
            
            // If paths match, add active class
            if (currentPath === linkPath) {
                link.classList.add('active');
                
                // If it's a dropdown item, also highlight the parent link
                const parentNavBtn = link.closest('.nav-item')?.querySelector('.nav-link');
                if (parentNavBtn) {
                    parentNavBtn.classList.add('active');
                }
            }
        });
    }

    // Run on load
    window.addEventListener('load', setActiveLink);
})();
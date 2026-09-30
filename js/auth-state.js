/**
 * 6valley Authentication & Session State Management
 * Handles Sign In, Sign Up, Dashboard / User Profile state, and Navbar toggle.
 */

(function () {
    "use strict";

    const STORAGE_KEY = "6valley_user";

    // Default demo user information matching 6valley live demo
    const DEMO_USER = {
        name: "TOmas",
        firstName: "TOmas",
        lastName: "Smith",
        email: "tomas@demo.com",
        phone: "+880 1700-000000",
        gender: "Male",
        dob: "1995-06-15",
        joinedDate: "October 2024",
        walletBalance: "500.00",
        loyaltyPoints: "120"
    };

    function getAuthUser() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error("Error reading auth state:", e);
            return null;
        }
    }

    function setAuthUser(user) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
            renderAuthUI();
        } catch (e) {
            console.error("Error saving auth state:", e);
        }
    }

    function logoutUser() {
        localStorage.removeItem(STORAGE_KEY);
        if (typeof toastr !== "undefined") {
            toastr.info("You have been logged out successfully.", "Logged Out");
        }
        
        // If on user account page, redirect to index
        if (window.location.pathname.includes("user-account") || window.location.pathname.includes("profile")) {
            setTimeout(function () {
                window.location.href = "index.html";
            }, 600);
        } else {
            renderAuthUI();
            setTimeout(function () {
                window.location.reload();
            }, 500);
        }
    }

    function renderAuthUI() {
        const user = getAuthUser();
        const desktopContainers = document.querySelectorAll(".navbar-auth-container, #navbar-auth-dropdown");
        const mobileContainers = document.querySelectorAll(".mobile-auth-container, #mobile-auth-section");

        desktopContainers.forEach(function (container) {
            if (user) {
                // Logged in UI matching Image 2 exactly
                container.innerHTML = `
                    <a class="navbar-tool ml-md-3 d-flex align-items-center auth-dropdown-trigger" type="button" data-toggle="dropdown" aria-haspopup="true" href="javascript:void(0)" aria-expanded="false" style="text-decoration:none;cursor:pointer;">
                        <div class="navbar-tool-icon-box bg-secondary rounded-circle d-flex align-items-center justify-content-center" style="width:40px;height:40px;background-color:#eef2f8!important;border:1px solid #e1e7ec;flex-shrink:0;">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="#a0aec0" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                            </svg>
                        </div>
                        <div class="navbar-tool-text ms-2 d-none d-md-block pl-2 text-start" style="line-height:1.2;text-align:left;">
                            <small style="color:#718096;font-size:12px;display:block;">Hello, <span class="auth-user-name">${escapeHtml(user.name || user.firstName || 'TOmas')}</span></small>
                            <div class="font-bold fs-14 text-dark d-flex align-items-center" style="font-weight:600;color:#1455ac;">
                                Dashboard <i class="fa fa-caret-down ml-1" style="font-size:12px;margin-left:4px;color:#1455ac;"></i>
                            </div>
                        </div>
                    </a>
                    <div class="text-align-direction dropdown-menu __auth-dropdown dropdown-menu-right shadow-sm border-0 py-2" style="border-radius:10px;min-width:180px;margin-top:8px;">
                        <a class="dropdown-item py-2 px-3" href="user-account.html?tab=orders" style="font-size:14px;color:#1455ac;font-weight:500;">
                            <i class="fa fa-shopping-bag mr-2" style="width:16px;"></i> My Order
                        </a>
                        <a class="dropdown-item py-2 px-3" href="user-account.html?tab=profile" style="font-size:14px;color:#373f50;font-weight:500;">
                            <i class="fa fa-user mr-2" style="width:16px;"></i> My Profile
                        </a>
                        <div class="dropdown-divider my-2"></div>
                        <a class="dropdown-item py-2 px-3 action-logout" href="javascript:void(0)" style="font-size:14px;color:#4b566b;font-weight:500;">
                            <i class="fa fa-sign-out mr-2" style="width:16px;"></i> Logout
                        </a>
                    </div>
                `;
            } else {
                // Guest UI matching Image 1 exactly
                container.innerHTML = `
                    <a class="navbar-tool ml-md-3 auth-dropdown-trigger" type="button" data-toggle="dropdown" aria-haspopup="true" href="javascript:void(0)" rel="nofollow" aria-expanded="false" style="cursor:pointer;">
                        <div class="navbar-tool-icon-box bg-secondary">
                            <div class="navbar-tool-icon-box bg-secondary">
                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.25 4.41675C4.25 6.48425 5.9325 8.16675 8 8.16675C10.0675 8.16675 11.75 6.48425 11.75 4.41675C11.75 2.34925 10.0675 0.666748 8 0.666748C5.9325 0.666748 4.25 2.34925 4.25 4.41675ZM14.6667 16.5001H15.5V15.6667C15.5 12.4509 12.8825 9.83341 9.66667 9.83341H6.33333C3.11667 9.83341 0.5 12.4509 0.5 15.6667V16.5001H14.6667Z" fill="#1455ac"></path>
                                </svg>
                            </div>
                        </div>
                    </a>
                    <div class="text-align-direction dropdown-menu __auth-dropdown dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="sign-in.html">
                            <i class="fa fa-sign-in mr-2" style="color:#1455ac;"></i> Sign in
                        </a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="sign-up.html">
                            <i class="fa fa-user-circle mr-2" style="color:#1455ac;"></i>Sign up
                        </a>
                    </div>
                `;
            }
        });

        mobileContainers.forEach(function (container) {
            if (user) {
                container.innerHTML = `
                    <li class="nav-item d-md-none">
                        <a class="dropdown-item pl-2 text-primary font-weight-bold" href="user-account.html?tab=orders">
                            <i class="fa fa-shopping-bag mr-2"></i> My Order
                        </a>
                    </li>
                    <li class="nav-item d-md-none">
                        <a class="dropdown-item pl-2" href="user-account.html?tab=profile">
                            <i class="fa fa-user mr-2"></i> My Profile (${escapeHtml(user.name || user.firstName || 'User')})
                        </a>
                        <div class="dropdown-divider"></div>
                    </li>
                    <li class="nav-item d-md-none">
                        <a class="dropdown-item pl-2 text-danger action-logout" href="javascript:void(0)">
                            <i class="fa fa-sign-out mr-2"></i> Logout
                        </a>
                    </li>
                `;
            } else {
                container.innerHTML = `
                    <li class="nav-item d-md-none">
                        <a class="dropdown-item pl-2" href="sign-in.html">
                            <i class="fa fa-sign-in mr-2" style="color:#1455ac;"></i> Sign in
                        </a>
                        <div class="dropdown-divider"></div>
                    </li>
                    <li class="nav-item d-md-none">
                        <a class="dropdown-item pl-2" href="sign-up.html">
                            <i class="fa fa-user-circle mr-2" style="color:#1455ac;"></i>Sign up
                        </a>
                    </li>
                `;
            }
        });
    }

    function escapeHtml(text) {
        if (!text) return "";
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Expose on global window object
    window.AuthManager = {
        getUser: getAuthUser,
        setUser: setAuthUser,
        logout: logoutUser,
        renderUI: renderAuthUI,
        demoUser: DEMO_USER
    };

    // Attach document event listeners
    document.addEventListener("DOMContentLoaded", function () {
        renderAuthUI();

        // Dropdown toggle fallback to guarantee smooth opening/closing
        document.addEventListener("click", function (e) {
            const trigger = e.target.closest(".auth-dropdown-trigger, .navbar-auth-container [data-toggle='dropdown']");
            if (trigger) {
                e.preventDefault();
                e.stopPropagation();
                const parent = trigger.closest(".dropdown");
                if (parent) {
                    const menu = parent.querySelector(".dropdown-menu");
                    if (menu) {
                        const isShown = menu.classList.contains("show");
                        document.querySelectorAll(".__auth-dropdown.show").forEach(m => m.classList.remove("show"));
                        if (!isShown) {
                            menu.classList.add("show");
                        }
                    }
                }
            } else if (!e.target.closest(".navbar-auth-container")) {
                document.querySelectorAll(".__auth-dropdown.show").forEach(m => m.classList.remove("show"));
            }
        });

        // Logout click handler delegation
        document.addEventListener("click", function (e) {
            const logoutTarget = e.target.closest(".action-logout");
            if (logoutTarget) {
                e.preventDefault();
                logoutUser();
            }
        });

        // Social login click handlers (Google / Facebook)
        document.addEventListener("click", function (e) {
            const socialBtn = e.target.closest(".social-media-login-btn");
            if (socialBtn) {
                e.preventDefault();
                const isGoogle = socialBtn.innerHTML.includes("google") || socialBtn.textContent.toLowerCase().includes("google");
                const provider = isGoogle ? "Google" : "Facebook";
                const user = Object.assign({}, DEMO_USER, {
                    name: "TOmas",
                    email: isGoogle ? "tomas.google@demo.com" : "tomas.fb@demo.com"
                });
                setAuthUser(user);
                if (typeof toastr !== "undefined") {
                    toastr.success("Signed in via " + provider + " as TOmas!", "Login Successful");
                }
                setTimeout(function () {
                    window.location.href = "user-account.html";
                }, 800);
            }
        });

        // Sign In form handler
        const loginForm = document.getElementById("customer-login-form");
        if (loginForm) {
            loginForm.addEventListener("submit", function (e) {
                e.preventDefault();
                const $form = $(loginForm);

                // Verify Captcha if present
                if (typeof window.validateCaptcha === "function") {
                    const captchaCheck = window.validateCaptcha($form);
                    if (!captchaCheck.valid) {
                        if (typeof toastr !== "undefined") {
                            toastr.error(captchaCheck.message || "Please enter the correct captcha value.");
                        } else {
                            alert(captchaCheck.message || "Please enter the correct captcha value.");
                        }
                        if (captchaCheck.element) captchaCheck.element.focus();
                        return;
                    }
                }

                const identity = document.getElementById("si-email") ? document.getElementById("si-email").value.trim() : "";
                const password = document.getElementById("si-password") ? document.getElementById("si-password").value : "";

                if (!identity || !password) {
                    if (typeof toastr !== "undefined") {
                        toastr.error("Please enter email/phone and password.");
                    } else {
                        alert("Please enter email/phone and password.");
                    }
                    return;
                }

                // Create user state
                let displayName = "TOmas";
                if (identity.includes("@")) {
                    displayName = identity.split("@")[0];
                    displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
                } else if (identity.length > 2) {
                    displayName = identity;
                }

                const loggedUser = {
                    name: displayName,
                    firstName: displayName,
                    lastName: "User",
                    email: identity.includes("@") ? identity : "tomas@demo.com",
                    phone: !identity.includes("@") ? identity : "+880 1700-000000",
                    joinedDate: "October 2024",
                    walletBalance: "500.00",
                    loyaltyPoints: "120"
                };

                setAuthUser(loggedUser);

                if (typeof toastr !== "undefined") {
                    toastr.success("Welcome back, " + loggedUser.name + "! Login successful.", "Success");
                }

                setTimeout(function () {
                    window.location.href = "user-account.html";
                }, 800);
            });

            // Quick Demo Login Button handler
            const demoBtn = document.getElementById("quick-demo-login-btn");
            if (demoBtn) {
                demoBtn.addEventListener("click", function (e) {
                    e.preventDefault();
                    if (document.getElementById("si-email")) document.getElementById("si-email").value = DEMO_USER.email;
                    if (document.getElementById("si-password")) document.getElementById("si-password").value = "12345678";
                    
                    // Auto-fill valid captcha
                    if (typeof window.autoFillCaptcha === "function") {
                        window.autoFillCaptcha($(loginForm));
                    }

                    setAuthUser(DEMO_USER);
                    if (typeof toastr !== "undefined") {
                        toastr.success("Signed in as Demo User (TOmas)!", "Success");
                    }
                    setTimeout(function () {
                        window.location.href = "user-account.html";
                    }, 800);
                });
            }
        }

        // Register form handler
        const registerForm = document.getElementById("customer-register-form");
        if (registerForm) {
            const termsCheckbox = document.getElementById("inputChecked");
            const submitBtn = document.getElementById("sign-up");
            if (termsCheckbox && submitBtn) {
                termsCheckbox.addEventListener("change", function () {
                    submitBtn.disabled = !this.checked;
                });
            }

            registerForm.addEventListener("submit", function (e) {
                e.preventDefault();
                const $form = $(registerForm);

                // Verify Captcha if present
                if (typeof window.validateCaptcha === "function") {
                    const captchaCheck = window.validateCaptcha($form);
                    if (!captchaCheck.valid) {
                        if (typeof toastr !== "undefined") {
                            toastr.error(captchaCheck.message || "Please enter the correct captcha value.");
                        } else {
                            alert(captchaCheck.message || "Please enter the correct captcha value.");
                        }
                        if (captchaCheck.element) captchaCheck.element.focus();
                        return;
                    }
                }

                const fName = registerForm.querySelector('input[name="f_name"]') ? registerForm.querySelector('input[name="f_name"]').value.trim() : "TOmas";
                const lName = registerForm.querySelector('input[name="l_name"]') ? registerForm.querySelector('input[name="l_name"]').value.trim() : "";
                const email = registerForm.querySelector('input[name="email"]') ? registerForm.querySelector('input[name="email"]').value.trim() : "tomas@demo.com";
                const phone = registerForm.querySelector('input[name="phone"]') ? registerForm.querySelector('input[name="phone"]').value.trim() : "+880 1700-000000";
                const pass = registerForm.querySelector('input[name="password"]') ? registerForm.querySelector('input[name="password"]').value : "";
                const conPass = registerForm.querySelector('input[name="con_password"]') ? registerForm.querySelector('input[name="con_password"]').value : "";

                if (pass && conPass && pass !== conPass) {
                    if (typeof toastr !== "undefined") {
                        toastr.error("Passwords do not match!");
                    } else {
                        alert("Passwords do not match!");
                    }
                    return;
                }

                const newUser = {
                    name: fName,
                    firstName: fName,
                    lastName: lName,
                    email: email,
                    phone: phone,
                    joinedDate: "October 2024",
                    walletBalance: "0.00",
                    loyaltyPoints: "0"
                };

                setAuthUser(newUser);

                if (typeof toastr !== "undefined") {
                    toastr.success("Account created successfully! Welcome to 6valley, " + fName + ".", "Registration Complete");
                }

                setTimeout(function () {
                    window.location.href = "user-account.html";
                }, 800);
            });
        }
    });
})();

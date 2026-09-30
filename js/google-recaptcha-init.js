"use strict";

/**
 * 6valley reCAPTCHA & Default Visual Captcha Generator & Validator
 * Supports dynamic SVG rendering, noise lines, rotation, click-to-refresh,
 * and seamless form validation.
 */

// Generate random legible alphanumeric captcha code (avoiding ambiguous letters)
function generateRandomCaptchaCode(length) {
    length = length || 4;
    const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
    let code = "";
    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// Generate authentic SVG data URI for captcha graphic
function generateCaptchaSvgDataUri(code) {
    const width = 110;
    const height = 40;
    const chars = code.split("");
    let charSvgs = "";
    const colors = ["#1455ac", "#0c3266", "#1d4ed8", "#1e3a8a", "#2b3445"];

    chars.forEach(function (char, i) {
        const x = 15 + i * 21;
        const y = 26 + (Math.random() * 4 - 2);
        const rot = (Math.random() * 22 - 11);
        const color = colors[i % colors.length];
        charSvgs += `<text x="${x}" y="${y}" font-family="'Courier New', Courier, monospace" font-weight="900" font-size="21" fill="${color}" transform="rotate(${rot.toFixed(1)} ${x} ${y})">${char}</text>`;
    });

    let lines = "";
    for (let j = 0; j < 3; j++) {
        const x1 = Math.floor(Math.random() * 25);
        const y1 = Math.floor(Math.random() * height);
        const x2 = width - Math.floor(Math.random() * 25);
        const y2 = Math.floor(Math.random() * height);
        lines += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(20,85,172,0.3)" stroke-width="1.5" stroke-dasharray="3,2" />`;
    }

    let dots = "";
    for (let k = 0; k < 15; k++) {
        const cx = Math.floor(Math.random() * width);
        const cy = Math.floor(Math.random() * height);
        dots += `<circle cx="${cx}" cy="${cy}" r="1.5" fill="rgba(20,85,172,0.22)" />`;
    }

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <defs>
            <linearGradient id="cbg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#ebe4f3"/>
                <stop offset="100%" stop-color="#d6cde7"/>
            </linearGradient>
        </defs>
        <rect width="${width}" height="${height}" fill="url(#cbg)"/>
        ${dots}
        ${lines}
        ${charSvgs}
    </svg>`;

    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

// Function to refresh captcha in a container
function refreshCaptchaInContainer($container) {
    if (!$container || !$container.length) return;
    const newCode = generateRandomCaptchaCode(4);
    $container.data("captcha-code", newCode);
    $container.attr("data-captcha-code", newCode);

    const $img = $container.find(".captcha-image-container img");
    if ($img.length) {
        $img.attr("src", generateCaptchaSvgDataUri(newCode));
    }

    const $icon = $container.find(".refresh-icon");
    if ($icon.length) {
        $icon.addClass("rotate-active");
        setTimeout(function () {
            $icon.removeClass("rotate-active");
        }, 300);
    }
}

// Global Captcha Validator
window.validateCaptcha = function ($form) {
    if (!$form || !$form.length) return { valid: true };
    const $captchaContainer = $form.find(".default-captcha-container");
    if (!$captchaContainer.length || $captchaContainer.hasClass("d-none")) {
        return { valid: true };
    }

    const expectedCode = ($captchaContainer.data("captcha-code") || $captchaContainer.attr("data-captcha-code") || "").trim().toUpperCase();
    const $input = $captchaContainer.find('input[name="default_captcha_value"]');
    const enteredValue = ($input.val() || "").trim().toUpperCase();

    if (!enteredValue) {
        return {
            valid: false,
            message: "Please enter the captcha value.",
            element: $input
        };
    }

    if (enteredValue !== expectedCode) {
        refreshCaptchaInContainer($captchaContainer);
        $input.val("").focus();
        return {
            valid: false,
            message: "Incorrect captcha value! Please try again with the new code.",
            element: $input
        };
    }

    return { valid: true, code: expectedCode };
};

// Global Captcha Auto-Fill (useful for quick demo testing)
window.autoFillCaptcha = function ($form) {
    if (!$form || !$form.length) return;
    const $captchaContainer = $form.find(".default-captcha-container");
    if (!$captchaContainer.length) return;
    const expectedCode = ($captchaContainer.data("captcha-code") || $captchaContainer.attr("data-captcha-code") || "").trim();
    const $input = $captchaContainer.find('input[name="default_captcha_value"]');
    if ($input.length && expectedCode) {
        $input.val(expectedCode);
    }
};

window.refreshCaptcha = function ($form) {
    if (!$form || !$form.length) return;
    const $captchaContainer = $form.find(".default-captcha-container");
    refreshCaptchaInContainer($captchaContainer);
};

function showDefaultCaptchaSection($element, defaultSectionElement) {
    let $form = $element.closest("form");

    if ($element.next('[name="set_default_captcha"]').length === 0) {
        $element.after('<input type="hidden" name="set_default_captcha" class="set_default_captcha_value" value="1">');
    } else {
        $form.find('[name="set_default_captcha"]')?.val(1);
    }

    $form.find(".dynamic-default-and-recaptcha-section")?.addClass("active");

    let defaultDynamicElement = $(defaultSectionElement);
    if (defaultDynamicElement?.length > 0) {
        defaultDynamicElement.removeClass("d-none");
    }

    $form.find('[type="submit"]').removeAttr("disabled");
}

function generateRecaptcha($element, $input, action, defaultSectionElement) {
    showDefaultCaptchaSection($element, defaultSectionElement);
}

$(document).ready(function () {
    // Initialize default captcha sections
    $(".render-grecaptcha-response").each(function () {
        let $element = $(this);
        let defaultSectionElement = $element.data("default-captcha");
        showDefaultCaptchaSection($element, defaultSectionElement);
    });

    // Build the visual captcha elements inside .default-captcha-container
    $(".default-captcha-container").each(function () {
        let defaultCaptchaContainer = $(this);
        let placeholderText = defaultCaptchaContainer?.data("placeholder") ?? "Enter captcha value";

        // Generate initial code
        let initialCode = generateRandomCaptchaCode(4);
        defaultCaptchaContainer.data("captcha-code", initialCode);
        defaultCaptchaContainer.attr("data-captcha-code", initialCode);

        let html = `<input type="text" name="default_captcha_value" value="" required placeholder="${placeholderText}" autocomplete="off" style="text-transform:uppercase;">`;

        let htmlIcon = `<svg width="20px" height="20px" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.05028 14.9497C4.65975 14.5592 4.65975 13.9261 5.05028 13.5355C5.4408 13.145 6.07397 13.145 6.46449 13.5355C7.39677 14.4678 8.655 15 10 15C12.7614 15 15 12.7614 15 10C15 9.44772 15.4477 9 16 9C16.5523 9 17 9.44772 17 10C17 13.866 13.866 17 10 17C8.11912 17 6.35391 16.2534 5.05028 14.9497Z" fill="#1455ac"/>
            <path d="M13.5585 12.832C13.099 13.1384 12.4781 13.0141 12.1718 12.5546C11.8655 12.0951 11.9897 11.4742 12.4492 11.1679L15.4496 9.16787C15.9091 8.86154 16.53 8.98575 16.8363 9.4453C17.1426 9.90484 17.0184 10.5257 16.5589 10.832L13.5585 12.832Z" fill="#1455ac"/>
            <path d="M18.8321 12.4452C19.1384 12.9048 19.0143 13.5256 18.5547 13.832C18.0952 14.1383 17.4743 14.0142 17.168 13.5546L15.168 10.5546C14.8616 10.0951 14.9858 9.47424 15.4453 9.16789C15.9049 8.86153 16.5257 8.98571 16.8321 9.44524L18.8321 12.4452Z" fill="#1455ac"/>
            <path d="M14.8571 4.85116C15.2477 5.24168 15.2477 5.87485 14.8571 6.26537C14.4666 6.65589 13.8334 6.65589 13.4429 6.26537C12.5106 5.33309 11.2524 4.8009 9.90738 4.8009C7.14596 4.8009 4.90738 7.03948 4.90738 9.8009C4.90738 10.3532 4.45967 10.8009 3.90738 10.8009C3.3551 10.8009 2.90738 10.3532 2.90738 9.8009C2.90738 5.93491 6.04139 2.8009 9.90738 2.8009C11.7883 2.8009 13.5535 3.54752 14.8571 4.85116Z" fill="#1455ac"/>
            <path d="M6.34889 6.96887C6.80844 6.66255 7.4293 6.78676 7.73563 7.2463C8.04195 7.70585 7.91775 8.32671 7.4582 8.63304L4.45782 10.633C3.99828 10.9394 3.37741 10.8152 3.07109 10.3556C2.76476 9.89606 2.88897 9.2752 3.34852 8.96887L6.34889 6.96887Z" fill="#1455ac"/>
            <path d="M1.07533 7.35567C0.768977 6.89614 0.893151 6.27527 1.35268 5.96892C1.81221 5.66256 2.43308 5.78674 2.73943 6.24627L4.73943 9.24627C5.04578 9.7058 4.92161 10.3267 4.46208 10.633C4.00255 10.9394 3.38168 10.8152 3.07533 10.3557L1.07533 7.35567Z" fill="#1455ac"/>
        </svg>`;

        let svgDataUri = generateCaptchaSvgDataUri(initialCode);

        html += `<div class="captcha-image-container" title="Click to refresh captcha">
                    <img alt="captcha" class="captcha-img" src="${svgDataUri}">
                    <span class="refresh-icon">${htmlIcon}</span>
                </div>`;

        defaultCaptchaContainer.html(html);

        // Click to refresh
        defaultCaptchaContainer.find(".captcha-image-container").on("click", function (e) {
            e.preventDefault();
            refreshCaptchaInContainer(defaultCaptchaContainer);
        });
    });
});

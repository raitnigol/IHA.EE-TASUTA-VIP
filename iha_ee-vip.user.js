// ==UserScript==
// @name         IHA.EE GIF'I EEMALDAJA (TASUTA VIP)
// @version      2.0
// @description  IHA.EE GIF'I EEMALDAJA (TASUTA VIP)
// @author       Nigol
// @run-at       document-idle
// @match        https://www.iha.ee/*
// @require      https://cdn.jsdelivr.net/npm/js-cookie@rc/dist/js.cookie.min.js

// @grant        none
// @namespace    https://greasyfork.org/users/578974
// ==/UserScript==

(function() {
    'use strict';
    // Get the language for the user
    function getUserLanguage() {
        var langCode = +Cookies.get('Lang'); // Convert to number with unary plus
        switch(langCode) {
            case 1:
            default:
                return "estonian";
            case 2: return "english";
            case 3: return "latvian";
            case 4: return "finnish";
            case 5: return "russian";
        }
    }
    console.log("Current language:", getUserLanguage());

    // Based on language, remove content from the website
    function deleteDivByLanguageText() {
        const language = getUserLanguage();
        let regexPatterns;

        // Adjust the switch statement to default to Estonian regex patterns
        switch (language) {
            case "english":
                regexPatterns = [/Today's birthdays\s+\(\d+ people\)/, /Currently online \(\d+ people\)/];
                break;
            case "latvian":
                regexPatterns = [/Šodienas dzimšanas dienas\s+\(\d+ personas\)/, /Pašlaik tiešsaitē atrodas \(\d+ personas\)/];
                break;
            case "finnish":
                regexPatterns = [/Tämän  päivän syntymäpäiväsankarit\s+\(\d+ henkilöä\)/, /Nykyhetkellä online-käyttäjiä\s+\(\d+ henkilöä\)/];
                break;
            case "russian":
                regexPatterns = [/* Russian regex patterns here */];
                // Note - sorry, but learn estonian or english, cause I will not modify this code for you. For certain reasons :)
                break;
            case "estonian":
            default: // Defaulting to Estonian
                regexPatterns = [/Tänased sünnipäevalapsed \(\d+ inimest\)/, /Hetkel Online kasutajad \(\d+ inimest\)/];
        }

        // Find and delete the divs that match the regex patterns
        const divs = document.querySelectorAll('.bubble_top');
        divs.forEach(div => {
            const textContent = div.textContent.trim();
            regexPatterns.forEach(pattern => {
                if (pattern.test(textContent)) {
                    div.parentNode.removeChild(div);
                }
            });
        });
    };

    // Example usage
    deleteDivByLanguageText();

    // Change the font of the page to League Spartan
    function changeFont() {
        // Importing League Spartan font from Google Fonts
        var link = document.createElement("link");
        link.href = "https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;700&display=swap";
        link.rel = "stylesheet";
        document.head.appendChild(link);

        // Creating a <style> element to set the font-family
        var style = document.createElement("style");
        style.type = "text/css";
        style.textContent = "* { font-family: 'League Spartan', sans-serif !important; }";
        document.head.appendChild(style);

        // Adjusting vertical-align and text-align for .gray1_bg elements
        document.querySelectorAll('td.gray1_bg').forEach(function(td) {
            td.style.verticalAlign = 'middle';
            td.style.textAlign = 'center';
        });
    };

    // Function for resizing text for various elements
    function resizeText(selector, newSize) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.style.fontSize = newSize;
        });
    };
    resizeText('a', '18px');
    // Change the wallpaper of the site
    function changeWallpaper() {
        document.body.style.backgroundImage = 'url(https://i.ibb.co/hR726CC/iha-background.jpg)';
        document.body.style.backgroundSize = 'cover';
    }

    // Replace the iha.ee logo and slogan
    function replaceLogoAndSlogan() {
        // Find and replace the logo
        const logo = document.querySelector("img[src*='https://www.iha.ee/images/resp_www_iha_ss_1.gif?170120']");
        if (logo) {
            logo.src = 'https://i.ibb.co/zmv72z3/iha-tasuta-vip-logo.png';
        }

        // Find and replace the slogan for any language
        // Select the first img inside a div with the class "slogan"
        const slogan = document.querySelector("div.slogan img");
        if (slogan) {
            slogan.src = 'https://i.ibb.co/J7GbvMJ/iha-slogan.png';
        }
    }

    // Remove the "Add Comment" section
    function removeComments() {
        const comments = document.querySelectorAll(".AddCommentForm");
        comments.forEach(comment => {
            comment.style.display = 'none';
        });
    }

    // Main function to adjust content and apply styles
    function adjustContent() {
        // Config - does the user want certain part of the page visible or hidden?
        // Edit here. Boolean - false to hide, true to show the content.
        const show_news = false; // -- default is false. Do you want to see the news feed on the page?
        const show_last_top_ten = false; // -- default is false. Do you want to see the last top users that recieved a score of 10 on their images?
        const show_users_birthdays = false; // -- default is false. Do you want to see the users with birthday today?
        const show_online_users = false; // -- default is false. Show the users currently online
        const show_right_side_statistics = false; // default is false. Show the statistics on the right of the page.
        const header_stick_to_top = false; // default is false. Makes the header stick to the top.
        const right_panel_color = "black"; // default is black. change at your own risk, should work with basic colors.
        const header_background_color = "black"; // default is black. change at your own risk, should work with basic colors.
        const center_panel_color = "black"; // default is black. change at your own risk, should work with basic colors.
        const change_page_text_color = true; // default is true. sets all text to white because the background is black.

        // Check if the user is logged in or not
        function isUserLoggedIn() {
            const logoutLink = document.querySelector('a[href$="/logout"]');
            return Boolean(logoutLink);
        }

        if (change_page_text_color) {
            // Select all <b> elements and set their text color to white
            var bElements = document.querySelectorAll('b');
            for (var belement = 0; belement < bElements.length; belement++) {
                bElements[belement].style.color = "white";
            };

            // Select all <a> elements and set their text color to white
            var aElements = document.querySelectorAll('a');
            for (var aelement = 0; aelement < aElements.length; aelement++) {
                aElements[aelement].style.color = "white";
            };

            var divElements = document.querySelectorAll('div');
            for (var divelement = 0; divelement < divElements.length; divelement++) {
                divElements[divelement].style.color = "white";
            };
        };
        // Remove left menu links that can not be accessed when not logged
        function removeMenuItemsIfNotLoggedIn() {
            if (!isUserLoggedIn()) {
                // Define menu items for each language
                const menuItemsByLanguage = {
                    english: [
                        "VIP account", // Assumed English translation
                        "Mailbox", // Assumed English translation
                        "My pictures",
                        "My videos",
                        "My contacts",
                        "My profile",
                        "Account settings",
                        "Viewed/rated", // Assumed English translation
                        "Sexy stories" // Assumed English translation
                    ],
                    estonian: [
                        "VIP konto",
                        "Postkast",
                        "Minu pildid",
                        "Minu videod",
                        "Minu kontaktid",
                        "Minu ankeet",
                        "Konto seaded",
                        "Vaadatud/hinnatud",
                        "Seksikad jutud"
                    ],
                    latvian: [
                        "VIP konts",
                        "Pastkaste",
                        "Mani attēli",
                        "Manas videofilmas",
                        "Mani kontakti",
                        "Mans profils",
                        "Konta iestatījumi",
                        "Skatīti/vērtēti",
                        "Seksīgi stāsti"
                    ],
                    finnish: [
                        "VIP-tili",
                        "Postilaatikko",
                        "Minun kuvat",
                        "Minun videot",
                        "Minun yhteystiedot",
                        "Profiilini",
                        "Tilin asetukset",
                        "Katsottu/arvioitu",
                        "Seksikkäät tarinat"
                    ]
                };

                // Use the getUserLanguage function to determine the current language
                const currentLanguage = getUserLanguage(); // Assume this function is defined elsewhere

                // Select the appropriate list of items to remove based on the current language
                // Default to English if the current language's items aren't defined
                const itemsToRemove = menuItemsByLanguage[currentLanguage] || menuItemsByLanguage.english;

                // Proceed with the removal process
                itemsToRemove.forEach(item => {
                    // Find the menu item by its text content and remove it
                    const menuItem = Array.from(document.querySelectorAll('#leftMenu a')).find(a => a.textContent.trim() === item);
                    if (menuItem) {
                        // If a separator is directly before the item, consider removing it as well
                        const previousSibling = menuItem.previousElementSibling;
                        if (previousSibling && previousSibling.classList.contains('left_menu_item_separator')) {
                            previousSibling.remove();
                        };
                        menuItem.remove();
                    };
                });
            };
        };

    removeMenuItemsIfNotLoggedIn();

        // Change the header icons
        function replaceIconsWithSVG() {
            const messageSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#feffff" d="M160 368c26.5 0 48 21.5 48 48v16l72.5-54.4c8.3-6.2 18.4-9.6 28.8-9.6H448c8.8 0 16-7.2 16-16V64c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16V352c0 8.8 7.2 16 16 16h96zm48 124l-.2 .2-5.1 3.8-17.1 12.8c-4.8 3.6-11.3 4.2-16.8 1.5s-8.8-8.2-8.8-14.3V474.7v-6.4V468v-4V416H112 64c-35.3 0-64-28.7-64-64V64C0 28.7 28.7 0 64 0H448c35.3 0 64 28.7 64 64V352c0 35.3-28.7 64-64 64H309.3L208 492z"/></svg>`;
            const searchSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#feffff" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>`
            const loginSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#feffff" d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>`

            // Select the envelope icon's image element
            const envelopeIconImg = document.querySelector('.envelopeicon img');
            const searchIconImg = document.querySelector('.searchicon img');
            const loginIconImg = document.querySelector('.loginicon img');

            // Check if the envelope icon exists
            if (envelopeIconImg) {
                // Create a div to wrap the SVG, this ensures the notification div remains positioned correctly
                const svgWrapper = document.createElement('div');
                svgWrapper.innerHTML = messageSVG;
                svgWrapper.style.width = '32px'; // Set the SVG width
                svgWrapper.style.height = '32px'; // Set the SVG height
                svgWrapper.style.position = 'relative'; // Needed to keep the notification positioned correctly

                // Replace the <img> tag with the new SVG wrapper
                envelopeIconImg.parentNode.insertBefore(svgWrapper, envelopeIconImg);
                envelopeIconImg.remove(); // Remove the original <img> tag
            };
            // Check if the search icon exists
            if (searchIconImg) {
                const svgWrapper = document.createElement('div');
                svgWrapper.innerHTML = searchSVG;
                svgWrapper.style.width = '32px'; // Set the SVG width
                svgWrapper.style.height = '32px'; // Set the SVG height
                svgWrapper.style.position = 'relative'; // Needed to keep the notification positioned correctly

                // Replace the <img> tag with the new SVG wrapper
                searchIconImg.parentNode.insertBefore(svgWrapper, searchIconImg);
                searchIconImg.remove(); // Remove the original <img> tag
            };

            // Check if the envelope icon exists
            if (loginIconImg) {
                // Create a div to wrap the SVG, this ensures the notification div remains positioned correctly
                const svgWrapper = document.createElement('div');
                svgWrapper.innerHTML = loginSVG;
                svgWrapper.style.width = '32px'; // Set the SVG width
                svgWrapper.style.height = '32px'; // Set the SVG height
                svgWrapper.style.position = 'relative'; // Needed to keep the notification positioned correctly

                // Replace the <img> tag with the new SVG wrapper
                loginIconImg.parentNode.insertBefore(svgWrapper, loginIconImg);
                loginIconImg.remove(); // Remove the original <img> tag
            };
        };

        replaceIconsWithSVG();

            // Make the header stick to the top
        if (!header_stick_to_top) {
            var header = document.getElementById('header');
            if (header) {
                // Remove the 'position: fixed;' style to make it stay at the top without moving on scroll
                header.style.position = 'static'; // Or 'relative' depending on how you want it to behave in the flow
                // Change header background color to black
                header.style.backgroundColor = header_background_color;
            };
            var toppadding = document.querySelector('.toppadding');
            if (toppadding) {
                toppadding.remove();
            };
        };

        // Remove the right side statistics.
        if (!show_right_side_statistics) {
        var right_side_statistics = document.querySelector('#rightstatistics');
            if (right_side_statistics) {
                right_side_statistics.remove();
            };
        };
        // Remove the news selection, because honestly - who the fuck cares? Set this to 'true' to still see the news.
        if (!show_news) {
            var main_news_div = document.querySelector('.main_news_div');
            if (main_news_div) {
                main_news_div.remove();
            };
        };

        // Remove the birthdays shit, because once again, no one gives a flying fuck. Set to 'true' if you want to see this shit.
        if (!show_users_birthdays) {
            var birthday_list = document.querySelector('.birthday_list');
            if (birthday_list) {
                birthday_list.remove();
            };
            var birthday_list_more = document.querySelector('.birthday_list_more');
            if (birthday_list_more) {
                birthday_list_more.remove();
            };
        };

        // Remove the online users div. Bullshit once again. Set to 'true' if you want to see it.
        if (!show_online_users) {
            var online_list = document.querySelector('.online_list');
            if (online_list) {
                online_list.remove();
            };
            var online_list_more = document.querySelector('.online_list_more');
            if (online_list_more) {
                online_list_more.remove();
            };
        };

        // Remove the view where it shows you the last people who got the rating 10. Set to 'true' if you want to see it.
        if (!show_last_top_ten) {
            var last_top_ten = document.querySelector('.news_ten_wrapper')
            if (last_top_ten) {
                last_top_ten.remove();
            };
        };
        // Get the page title and change it
        var page_title = document.title;

        // Split the title and change the part - "Iha.ee - Seksikate inimeste kohtumispaik" to "Iha.ee - Tasuta VIP"
        var page_current_location = page_title.split("|")[0];
        var page_title_description = page_title.split("|")[1];

        page_title = `${page_current_location} | Iha.ee - Tasuta VIP`
        document.title = page_title;

        // Remove the top advertisement
        var headbanner = document.querySelector('.headbanner');
        if (headbanner) {
            headbanner.remove();
        };
        // Remove the bottom footer_banner with the another sex advertisement
        var footer_banner = document.querySelector('.footer_banner');
        if (footer_banner) {
            footer_banner.remove();
        };

        // Remove the bottom footer wrapper.
        var footer_wrapper = document.querySelector('.footer_wrapper');
        if (footer_wrapper) {
            footer_wrapper.remove();
        };

        // Remove the ticker bullshit (banner that shows info about how to advertise yourself)
        var ticker = document.querySelector('#ticker');
        if (ticker) {
            ticker.remove();
        };

        // Adjust opacity for .gif images within specified divs
        const imgWrappers = document.querySelectorAll('div.imgwrapper[style*="background-image"], div.imgwrapper_big[style*="background-image"]');
        imgWrappers.forEach(wrapper => {
            const img = wrapper.querySelector('img');
            if (img && img.src.endsWith('.gif')) {
                img.style.opacity = '0';
            }
        });

        // Remove <a> tags with specific text
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            if (link.textContent === 'Selle pildi nägemiseks pead olema sisse logitud!') {
                // Assuming the parent div is to be removed, not just the <a> tag
                if (link.parentNode) {
                    link.parentNode.style.display = 'none'; // Hides the entire div containing the link
                }
            }
        });

        // Change the right panel background color to the color specified in the configuration
        var rightPanel = document.querySelector('.rightpanel');
        if (rightPanel) {
            rightPanel.style.backgroundColor = right_panel_color;
        }
        // Change the center panel background color to the color specified in the configuration
        var centerPanel = document.querySelector('.centerpanel');
        if (centerPanel) {
            centerPanel.style.backgroundColor = center_panel_color;
        };
        // New functionalities
        changeFont();
        changeWallpaper();
        replaceLogoAndSlogan();
        removeComments();

        // Print to console whether the user is logged in or not
        console.log("User logged in:", isUserLoggedIn())
    }

    // Initial run and observe for dynamic changes
    adjustContent();

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                adjustContent();
            }
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();

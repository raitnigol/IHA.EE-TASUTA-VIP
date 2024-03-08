// ==UserScript==
// @name         IHA.EE GIF'I EEMALDAJA (TASUTA VIP)
// @version      1.0
// @description  IHA.EE GIF'I EEMALDAJA (TASUTA VIP)
// @author       Nigol
// @run-at       document-idle
// @match        https://iha.ee/*
// @include      https://*.iha.ee/*
// @include      https://*.iha.ee/*
// @include      https://www.iha.ee/index.php?mode=main

// @require http://code.jquery.com/jquery-3.4.1.min.js
// @require https://cdn.jsdelivr.net/npm/js-cookie@rc/dist/js.cookie.min.js
// @grant        none
// @namespace https://greasyfork.org/users/578974
// ==/UserScript==

window.addEventListener("load", function(event) {


    // The script
    $(document).ready(function() {
        // Read data from the cookie to get the persons localization settings (language)
        var user_language;

        // Use a switch to identify the language. Cookies.get() returns a string, so we must change it to integer.
        switch(+(Cookies.get('Lang'))) {
            case 1:
                user_language = "estonian";
                break;
            case 2:
                user_language = "english";
                break;
            case 3:
                user_language = "latvian";
                break;
            case 4:
                user_language = "finnish";
                break;
            case 5:
                user_language = "russian";
        }
        console.log("Current language: ", user_language)


        // Change the ugly font on the site
        var s = document.createElement("style");
        s.type = "text/css";
        s.textContent = "* { font-family: 'Trebuchet MS', sans-serif !important; }";

        $('td.gray1_bg').each(function() {
            $(this).css({
                'vertical-align': 'middle',
                'text-align': 'center'
            })
        });
        document.head.appendChild(s);


        // Config - does the user want certain part of the page visible or hidden?
        // Edit here. Boolean - false to hide, true to show the content.
        const show_news = false; // -- default is false. Do you want to see the news feed on the page?
        const show_last_top_10 = false; // -- default is false. Do you want to see the last top users that recieved a score of 10 on their images?
        const show_users_birthday = false; // -- default is false. Do you want to see the users with birthday today?
        const show_online_users = false; // -- default is true. Show the users currently online


        // Get the page title and change it
        var page_title = document.title;

        // Split the title and change the part - "Iha.ee - Seksikate inimeste kohtumispaik" to "Iha.ee - Tasuta VIP"
        var page_current_location = page_title.split("|")[0];
        var page_title_description = page_title.split("|")[1];

        page_title = `${page_current_location} | Iha.ee - Tasuta VIP`
        document.title = page_title;


        // Change the wallpaper of the site
        $('body').css('background-image', 'url(https://i.ibb.co/hR726CC/iha-background.jpg)');
        $('body').css('background-size', 'cover');

        //document.body.style.backgroundImage = ('url(https://i.ibb.co/hR726CC/iha-background.jpg)'); - vanilla JS method for the same thing


        // First of all, check in which section of the page the current user is
        var user_absolute_path = window.location.href;
        // Split the string and get the first element of the array, which is the path of the website
        var user_current_path = user_absolute_path.split('?')[0];
        // Split the string and get the second element of the array, which is the current mode (section) of the webpage
        // Also remove all unwanted parts of the string (php variables (& and anything after that)
        var user_current_mode = user_absolute_path.split('?')[1].replace(/\&.*/,'');
        console.log("Current user mode:", user_current_mode);

        // Check the current language of the user to make it work in all languages, not only in Estonia
        // This is needed because some elements are found by text, like the text that says you have to log in to see the content
        // and it changes depending on the language selected
        // TODO: ADD CODE HERE THAT WORKS ON DIFFERENT LANGUAGES


        // Check the config of the file and delete content based on it
        function remove_config_content() {
            if (show_news == false) {
                if(show_last_top_10 == false) {
                    // Remove the content
                    $("td.bubble_top:contains('Uudised')").parents('tbody').eq(1).remove();
                }

            }

            if (show_users_birthday == false) {
                if (show_online_users == false) {
                    $("td.bubble_top:contains('Tänased sünnipäevalapsed')").remove();
                    $("td.bubble_top:contains('Hetkel Online')").remove();
                    $('table.FourBorder_b').remove();
                }
            }

        };
        remove_config_content();



        // I do not like to use selectors to remove something, but this is the way I have to do it right now. Maybe implement a better solution later?
        // It can also fuck up things bad if the selectors change in position, but fuck it.
        // Remove the random pink shit at the end of the page
        $("body > div:nth-child(7) > table > tbody > tr:nth-child(2) > td > table:nth-child(2) > tbody > tr:nth-child(2)").remove();

        // Remove the right side of the page showing VIP of today and statistics, because no one gives a fuck.
        $("body > div:nth-child(7) > table > tbody > tr:nth-child(2) > td > table:nth-child(2) > tbody > tr > td.right_side").remove();

        // Remove the voting thing from top of images
        $("body > div:nth-child(8) > table > tbody > tr:nth-child(2) > td > table:nth-child(2) > tbody > tr:nth-child(1) > td.center_td > table:nth-child(3) > tbody > tr:nth-child(2) > td > table:nth-child(1)").remove();
        // We can remove the iha.ee gif sitewide because it is a single gif. The reason I am not only removing the gif with one line of code is because
        // when the gif URL gets changed (current: https://www.iha.ee/images/edf83jd7s6djfkgie843u4.gif), I would manually have to edit the code to remove the new gif.
        // So I think this approach is the best.

        // Remove the iha.ee gif sitewide
        var iha_ee_gif = $("img[src$='https://www.iha.ee/images/edf83jd7s6djfkgie843u4.gif']");
        $(iha_ee_gif).fadeTo("fast", 0);


        // Remove the white banner thingy
        var iha_ee_ad_banner = $('#TICKER');
        $(iha_ee_ad_banner).remove();


        // Later implement a automatic solution that does not take gif source into input
        // Remove the small preview gifs when looking at photos
        var iha_ee_preview_gif = $("img[src$='https://www.iha.ee/images/edf83us7fkslaowie0937s.gif']");
        $(iha_ee_preview_gif).fadeTo("fast", 0);


        // Find the iha.ee logo and replace it with my own logo, iha.ee tasuta vip
        var iha_logo = $("img[src$='https://www.iha.ee/images/www_iha_1.gif?170120']");
        $(iha_logo).fadeOut("slow", function() {
            $(iha_logo.attr('src','https://i.ibb.co/Ky5VG0z/iha-tasuta-vip-logo.gif')).fadeIn();
        });


        // Find the iha slogan and replace it with my own
        var iha_slogan = $("img[src$='https://www.iha.ee/images/www_iha_slog_1.gif?140313']");
        $(iha_slogan).fadeOut("slow", function() {
            $(iha_slogan.attr('src', 'https://i.ibb.co/kGj6z5L/iha-slogan.jpg')).fadeIn();
        });


        // Remove the dumb fucking sex ads and replace them with my own content
        var top_ad = $("img[src$='https://www.iha.ee/stats/stats/203b198657.gif']");
        $(top_ad).fadeOut("slow", function() {
            $(top_ad.attr('src', 'https://i.ibb.co/dPwgWpy/iha-top-ad-gif.gif')).fadeIn();
            // Get the href of the image and replace it with my Github
            var top_ad_href = top_ad.parent()
            $(top_ad_href).attr("href", "https://github.com/raitnigol");
        });


        // Iha.ee changed their ad, remove the new one
        var new_top_ad = $("img[src$='https://www.iha.ee/stats/stats/203b628019.gif']");
        $(new_top_ad).fadeOut("slow", function() {
            $(new_top_ad.attr('src', 'https://i.ibb.co/dPwgWpy/iha-top-ad-gif.gif')).fadeIn();
            var new_top_ad_href = top_ad.parent()
            $(new_top_ad_href).attr("href", "https://github.com/raitnigol");
        });


        // Remove the text "Sisuturundus"
        // Find the closest table to the top ad, find the td that contains the text and change the text to empty
        var top_ad_text = $(top_ad).closest('table').find('tr').find('td').parent()[0];
        $(top_ad_text).remove();


        // Remove the bottom ad
        var bottom_ad = $("img[src$='https://www.iha.ee/stats/stats/202b127105.png']");
        $(bottom_ad).fadeOut("fast", 0);


        // Remove the bottom ad if source is .gif
        var second_bottom_ad = $("img[src$='https://www.iha.ee/stats/stats/200b915890.gif']");
        $(second_bottom_ad).fadeOut("fast", 0);


        // Get all table elements that contain images
        var images_gif = $('table').find('img.Top_pic[src$=".gif"]');
        // Filter through the images to get only images that do have .gif on top of them
        $(images_gif).fadeTo("fast", 0);


        // Remove the login texts
        $("a:contains('Selle pildi nägemiseks pead olema sisse logitud!')").parent().remove();


        // Get the URL of the image to later copy on click
        var imgURL = undefined;
        // I am not that smart so I do not fucking know why the element was changed, but instead of being nth-child(7) it is now nth-child(8). This fucked up the code. Future reminder for me when fixing code.
        var img = document.querySelector("body > div:nth-child(8) > table > tbody > tr:nth-child(2) > td > table:nth-child(2) > tbody > tr:nth-child(1) > td.center_td > table:nth-child(3) > tbody > tr:nth-child(2) > td > table:nth-child(3) > tbody > tr > td > table > tbody > tr:nth-child(2) > td");
        imgURL = $(img).css('background-image');
        imgURL = imgURL.replace(/(url\(|\)|")/g, '');
        var user_account_link = $(img).children();


        // Remove the href to the user page, because that is annoying.
        $(user_account_link).remove();


        // Show the image URL on top of the image
        var show_image_url_element = document.getElementsByClassName("muu")[3];
        var show_image_url_content = `<a href=${imgURL} target="_blank">${imgURL} | ava pilt uues aknas</a>`;
        show_image_url_element.innerHTML = show_image_url_content


        // Create a new child element to display that upon clicking the image you can copy it.
        $(show_image_url_element).append('<p>Vajuta pildile, et kopeerida pildi URL</p>');


        // When clicking on an image, copy the URL of the image
        img.addEventListener("click", picture_click);
        function picture_click() {
            var dummy = $('<input>').val(imgURL).appendTo('body').select();
            document.execCommand('copy');
            $(dummy).hide(); // The image URL gets appended to the bottom of the page - hide it after clicking on it. When removing it, the page you enter will have grey background. I dont know how to fix it lol
        };


        // The default image resolution on iha.ee is 640x480. Check the image resolution on the remote url and if it is larger, make the iha.ee's resolution match
        function set_image_resolution() {
            // Get the remote image URL
            // If something happens, it might be that the nth-child(8) selector is now updated so the code needs to be fixed
            var image = document.querySelector("body > div:nth-child(8) > table > tbody > tr:nth-child(2) > td > table:nth-child(2) > tbody > tr:nth-child(1) > td.center_td > table:nth-child(3) > tbody > tr:nth-child(2) > td > table:nth-child(3) > tbody > tr > td > table > tbody > tr:nth-child(2) > td");
            var imageURL = $(image).css('background-image');
            imageURL = imageURL.replace(/(url\(|\)|")/g, '');

            // Get the resolution
            const imgSrc = imageURL;
            const img = new Image();
            img.src = imgSrc;
            img.onload = function() {
                document.body.appendChild(img);
                var image_width = img.width;
                var image_height = img.height;
                // Set the resolution
                $(image).width(image_width)
                $(image).height(image_height)
                $(img).remove();
            }
        }
        set_image_resolution();


        // If not logged in, remove the "add comment" section
        $(".AddCommentForm:contains('Lisa kommentaar')").remove();
    });
}, false);

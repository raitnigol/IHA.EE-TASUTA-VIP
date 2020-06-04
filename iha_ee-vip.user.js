// ==UserScript==
// @name         iha.ee gif remover
// @version      0.2
// @description  iha.ee eemalda gif (tasuta vip)
// @author       Nigol
// @run-at       document-end
// @match        https://iha.ee/*
// @include      https://*.iha.ee/*
// @require http://code.jquery.com/jquery-3.4.1.min.js
// @grant        none
// @namespace https://greasyfork.org/users/578974
// ==/UserScript==

(function() {
    window.onload = function(){
        "use strict";
        // eemalda gif pildilt
        var gif = document.querySelector("body > div:nth-child(7) > table > tbody > tr:nth-child(2) > td > table:nth-child(2) > tbody > tr:nth-child(1) > td.center_td > table:nth-child(3) > tbody > tr:nth-child(2) > td > table:nth-child(3) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > a > img");
        gif.style.visibility = "hidden";

        // leia pildi url
        var imgURL = undefined;
        var img = document.querySelector("body > div:nth-child(7) > table > tbody > tr:nth-child(2) > td > table:nth-child(2) > tbody > tr:nth-child(1) > td.center_td > table:nth-child(3) > tbody > tr:nth-child(2) > td > table:nth-child(3) > tbody > tr > td > table > tbody > tr:nth-child(2) > td");
        imgURL = $(img).css('background-image');
        imgURL = imgURL.replace(/(url\(|\)|")/g, '');

        // näita pildi urli pildi kohal ja ava uues aknas pilt
        var showImgURL = document.getElementsByClassName("muu")[3];
        var showImgURL_content = `<a href=${imgURL} target="_blank">${imgURL} | ava pilt uues aknas</a>`;
        showImgURL.innerHTML = showImgURL_content;

        // pildile klõpsates kopeeri url
        img.addEventListener("click", picture_Click);
        function picture_Click() {
            var dummy = $('<input>').val(imgURL).appendTo('body').select();
            document.execCommand('copy');
        };

        // eemalda sisselogimise kirjad
        var login_Top = document.querySelector("body > div:nth-child(7) > table > tbody > tr:nth-child(2) > td > table:nth-child(2) > tbody > tr:nth-child(1) > td.center_td > table:nth-child(3) > tbody > tr:nth-child(2) > td > table:nth-child(3) > tbody > tr > td > table > tbody > tr:nth-child(1)");
        var login_Bottom = document.querySelector("body > div:nth-child(7) > table > tbody > tr:nth-child(2) > td > table:nth-child(2) > tbody > tr:nth-child(1) > td.center_td > table:nth-child(3) > tbody > tr:nth-child(2) > td > table:nth-child(3) > tbody > tr > td > table > tbody > tr:nth-child(3)");
        login_Top.remove();
        login_Bottom.remove();

        // eemalda alumine reklaam
        var bottom_Ad = document.querySelector("body > div:nth-child(7) > table > tbody > tr:nth-child(2) > td > table:nth-child(2) > tbody > tr:nth-child(2)");
        bottom_Ad.remove();

        // eemalda VIP nupp (haha, sellejaoks ju skript ongi tehtud)
        iha_Vip_Button_Pictures = document.querySelector("body > div:nth-child(7) > table > tbody > tr:nth-child(2) > td > table:nth-child(2) > tbody > tr:nth-child(1) > td.center_td > table:nth-child(1) > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(1)");
        iha_Vip_Button_Pictures.remove();
    };
})();

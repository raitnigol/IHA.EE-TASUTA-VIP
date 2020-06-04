// ==UserScript==
// @name         iha.ee gif remover
// @version      0.1
// @description  iha.ee eemalda gif (tasuta vip)
// @author       Nigol
// @run-at       document-end
// @match        https://iha.ee/*
// @include      https://*.iha.ee/*
// @require http://code.jquery.com/jquery-3.4.1.min.js
// @grant        none
// ==/UserScript==

(function() {
    window.onload = function(){
        // eemalda gif pildilt
        document.querySelector("body > div:nth-child(7) > table > tbody > tr:nth-child(2) > td > table:nth-child(2) > tbody > tr:nth-child(1) > td.center_td > table:nth-child(3) > tbody > tr:nth-child(2) > td > table:nth-child(3) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > a > img").style.visibility = "hidden";

        // leia pildi url
        var imgURL = document.querySelector("body > div:nth-child(7) > table > tbody > tr:nth-child(2) > td > table:nth-child(2) > tbody > tr:nth-child(1) > td.center_td > table:nth-child(3) > tbody > tr:nth-child(2) > td > table:nth-child(3) > tbody > tr > td > table > tbody > tr:nth-child(2) > td");
        imgURL = $(imgURL).css('background-image');
        imgURL = imgURL.replace(/(url\(|\)|")/g, '');

        // näita pildi urli pildi kohal ja ava uues aknas pilt
        var showImgURL = document.getElementsByClassName("muu")[3];
        var showImgURL_content = `<a href=${imgURL} target="_blank">${imgURL} | ava pilt uues aknas</a>`;
        showImgURL.innerHTML = showImgURL_content;

        // eemalda sisselogimise kirjad
        var login_Top = document.querySelector("body > div:nth-child(7) > table > tbody > tr:nth-child(2) > td > table:nth-child(2) > tbody > tr:nth-child(1) > td.center_td > table:nth-child(3) > tbody > tr:nth-child(2) > td > table:nth-child(3) > tbody > tr > td > table > tbody > tr:nth-child(1)");
        var login_Bottom = document.querySelector("body > div:nth-child(7) > table > tbody > tr:nth-child(2) > td > table:nth-child(2) > tbody > tr:nth-child(1) > td.center_td > table:nth-child(3) > tbody > tr:nth-child(2) > td > table:nth-child(3) > tbody > tr > td > table > tbody > tr:nth-child(3)");

        login_Top.remove();
        login_Bottom.remove();
    };
})();

// ==UserScript==
// @name         ithelp codeblock customize color
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://ithelp.ithome.com.tw/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const classList = [
        {
            class: ['.hljs'],
            color: '#eaeaea',
            background: 'black';
        },
        {
            class: ['.hljs-keyword', '.hljs-selector-tag'],
            color: '#c397d8',
        },
        {
            class: ['.hljs-title', '.hljs-section'],
            color: '#7aa6da',
        },
        {
            class: ['.hljs-string', '.hljs-symbol', '.hljs-bullet', '.hljs-addition'],
            color: '#b9ca4a',
        },
        {
            class: ['.hljs-attribute'],
            color: '#e7c547',
        },
        {
            class: ['.hljs-comment', '.hljs-quote'],
            color: '#969896',
        },
        {
            class: ['.hljs-variable', '.hljs-template-variable', '.hljs-tag', '.hljs-name',
                     '.hljs-selector-id','.hljs-selector-class', '.hljs-regexp', '.hljs-deletion'],
            color: '#d54e53',
        },
        {
            class: ['.hljs-number', '.hljs-built_in', '.hljs-builtin-name', '.hljs-literal',
                    '.hljs-type', '.hljs-params', '.hljs-meta', '.hljs-link'],
            color: '#e78c45',
        },
        {
            class: ['.markdown__style pre', '.editor-preview pre'],
            background: 'black';
        },
    ];
    classList.forEach((item) => {
        item.class.forEach((c) => {
            document.querySelectorAll(c).forEach((ele) => {
                const keys = Object.keys(item).filter((key) => key !== 'class');
                keys.forEach((key) => {
                    ele.style[key] = item[key];
                });
            });
        });
    });
})();

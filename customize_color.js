// ==UserScript==
// @name         ithelp codeblock customize color
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://ithelp.ithome.com.tw/*
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    if (!localStorage.getItem('itHelp_css')) {
        localStorage.setItem('itHelp_css', prompt('請輸入想使用的程式碼區塊主題!'));
    }
    const theme = localStorage.getItem('itHelp_css');
    const cors = 'https://cors-anywhere.herokuapp.com/';
    $.ajax({
        url: `${cors}https://raw.githubusercontent.com/highlightjs/highlight.js/master/src/styles/${theme}.css`,
        type: 'GET',
        success: setStyle,
        dataType: 'text'
    });
})();

function setStyle(resp) {
    const regList = [
        /(?<class>.hljs-comment,\n.hljs-quote) {\s+color: (?<color>#\w+);\n}/,
        /(?<class>.hljs-variable,\n.hljs-template-variable,\n.hljs-tag,\n.hljs-name,\n.hljs-selector-id,\n.hljs-selector-class,\n.hljs-regexp,\n.hljs-deletion) {\s+color: (?<color>#\w+);\n}/,
        /(?<class>.hljs-number,\n.hljs-built_in,\n.hljs-builtin-name,\n.hljs-literal,\n.hljs-type,\n.hljs-params,\n.hljs-meta,\n.hljs-link) {\s+color: (?<color>#\w+);\n}/,
        /(?<class>.hljs-attribute) {\s+color: (?<color>#\w+);\n}/,
        /(?<class>.hljs-string,\n.hljs-symbol,\n.hljs-bullet,\n.hljs-addition) {\s+color: (?<color>#\w+);\n}/,
        /(?<class>.hljs-title,\n.hljs-section) {\s+color: (?<color>#\w+);\n}/,
        /(?<class>.hljs-keyword,\n.hljs-selector-tag) {\s+color: (?<color>#\w+);\n}/,
        /(?<class>.hljs) {\s+.*\s+.*\s+background: (?<background>#\w+);\s+color: (?<color>#\w+);\s+.*\n}/
    ];
    const classList = regList.map((el) => {
        const { groups } = resp.match(el);
        return {
            class: groups.class.split(`,\n`),
            color: groups.color,
            background: groups.background,
        }
    })
    classList.forEach((item) => {
        item.class.forEach((c) => {
            document.querySelectorAll(c).forEach((ele) => {
                const keys = Object.keys(item).filter((key) => key !== 'class');
                keys.forEach((key) => {
                    if (item[key]) {
                        ele.style[key] = item[key];
                    }
                });
            });
        });
    });
    const { background } = classList[classList.findIndex((el) => el.class[0] === '.hljs')];
    ['.markdown__style pre', '.editor-preview pre'].forEach((c) => {
        document.querySelectorAll(c).forEach((ele) => {
            if (background) {
                ele.style.background = background;
            }
        });
    });
}

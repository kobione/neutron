(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const selector = require('./selector');
const tabManagerFactory = require('./tab-manager-factory');

const tabManager = tabManagerFactory();
selector.goButton().addEventListener('click', tabManager.goToPage);
selector.urlInput().addEventListener('keyup', (e) => {
    // enter
    if (e.keyCode === 13) {
        tabManager.goToPage();
    }
});
selector.createTabButton().addEventListener('click', tabManager.createNewTabButton);
// bind tab click handler to initial tab
tabManager.bindTabClickHandler(0);

},{"./selector":2,"./tab-manager-factory":3}],2:[function(require,module,exports){
const selector = {
    urlInput() {
        return document.querySelector('#url-input');
    },
    goButton() {
        return document.querySelector('#go-button');
    },
    createTabButton() {
        return document.querySelector('#create-tab-button');
    },
    tabBarDiv() {
        return document.querySelector('#tab-bar-div');
    },
    activeTabButton() {
        return document.querySelector('.tab-button.active');
    },
    activeTabIframe() {
        return document.querySelector('.tab-iframe.active');
    },
    tabButton(tabIndex) {
        return document.querySelector(`[data-tabindex='${tabIndex}'].tab-button`);
    },
    tabIframe(tabIndex) {
        return document.querySelector(`[data-tabindex='${tabIndex}'].tab-iframe`);
    }
};

module.exports = selector;

},{}],3:[function(require,module,exports){
const selector = require('./selector');

function buildTabIframe(nextTabIndex) {
    const tabIframe = document.createElement('iframe');
    tabIframe.src = 'new-tab-page.html';
    tabIframe.className = 'tab-iframe active';
    tabIframe.setAttribute('data-tabindex', nextTabIndex);
    return tabIframe;
}

function buildTabButton(nextTabIndex) {
    const tabButton = document.createElement('button');
    tabButton.textContent = 'New Tab';
    tabButton.className = 'tab-button active';
    tabButton.setAttribute('data-tabindex', nextTabIndex);
    return tabButton;
}

function deactiveCurrentActiveTabs() {
    selector.activeTabButton().classList.remove('active');
    selector.activeTabIframe().classList.remove('active');
}

module.exports = function tabManagerFactory() {
    let nextTabIndex = 1;

    function createNewTabButton() {
        deactiveCurrentActiveTabs();
        const tabButton = buildTabButton(nextTabIndex);
        const tabIframe = buildTabIframe(nextTabIndex);
        document.body.appendChild(tabIframe);
        selector.tabBarDiv().insertBefore(tabButton, selector.createTabButton());
        bindTabClickHandler(nextTabIndex);
        nextTabIndex += 1;
    }

    function goToPage() {
        // TODO ensure http at beginning
        const urlInput = selector.urlInput();
        const url = urlInput.value;
        selector.activeTabIframe().src = url;
        urlInput.value = 'http://';
    }

    function changeActiveTab(newActiveTabIndex) {
        deactiveCurrentActiveTabs();
        selector.tabButton(newActiveTabIndex).classList.add('active');
        selector.tabIframe(newActiveTabIndex).classList.add('active');
    }

    function bindTabClickHandler(tabIndex) {
        selector.tabButton(tabIndex).addEventListener('click', () => { changeActiveTab(tabIndex); });
    }

    return {
        createNewTabButton,
        goToPage,
        changeActiveTab,
        bindTabClickHandler
    };
};

},{"./selector":2}]},{},[1]);

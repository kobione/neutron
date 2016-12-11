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

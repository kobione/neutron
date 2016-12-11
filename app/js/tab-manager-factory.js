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

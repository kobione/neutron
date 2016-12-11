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

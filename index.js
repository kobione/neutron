(() => {
    const urlInput = document.querySelector('#url-input');
    const goButton = document.querySelector('#go-button');
    const webpageIframe = document.querySelector('#webpage-iframe');
    const createTabButton = document.querySelector('#create-tab-button');
    const tabBarDiv = document.querySelector('#tab-bar-div');
    let nextIframeIndex = 1;

    function goToPage() {
        // TODO ensure http at beginning
        const url = urlInput.value;
        webpageIframe.src = url;
    }

    function bindClickToTabButton(tabButton) {
        //
    }

    function createNewTabButton() {
        const prevActiveTab = document.querySelector('.tab-button.active');
        prevActiveTab.classList.remove('active');
        const prevActiveIframe = document.querySelector('.webpage-iframe.active');
        prevActiveIframe.classList.remove('active');
        const tabButton = document.createElement('button');
        tabButton.className = 'tab-button active';
        tabButton.setAttribute('data-iframeindex', nextIframeIndex);
        tabButton.textContent = 'New Tab';
        const tabIframe = document.createElement('iframe');
        tabIframe.src = 'http://w3schools.com';
        tabIframe.className = 'webpage-iframe active';
        tabIframe.id = `iframe-${nextIframeIndex}`;
        document.body.appendChild(tabIframe);
        tabBarDiv.insertBefore(tabButton, createTabButton);
        nextIframeIndex += 1;
    }

    goButton.addEventListener('click', goToPage);

    urlInput.addEventListener('keyup', (e) => {
        // enter
        if (e.keyCode === 13) {
            goToPage();
        }
    });

    createTabButton.addEventListener('click', createNewTabButton);
})();

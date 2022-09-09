//vars
var numberOfTabs = 0;
var currentTab = 0;
var lastTab = 0;
var closedTab = false;
var webview = document.getElementById("page0");
var promptList = [];
var activePrompt = null;

setInterval(function() {
    if (!activePrompt) {
        activePrompt = promptList.shift();
    }
},0);
openTab("https://darth-ness.github.io/WarpCore-Start/");
//navigation 

document.getElementById("searchbar").addEventListener('keyup', (e) => {
    if (e.key == "Enter") {
        if (document.getElementById("searchbar").value.startsWith("https://") || document.getElementById("searchbar").value.startsWith("http://")) {
            webview.src = document.getElementById("searchbar").value;
        } else {
            webview.src = "https://swisscows.com/web?query=" + document.getElementById("searchbar").value;
        }
    }
})
document.getElementById("back").addEventListener('click', () => { webview.goBack(); })
document.getElementById("front").addEventListener('click', () => { webview.goForward(); })
document.getElementById("refresh").addEventListener('click', () => { webview.reload(); })

//Tabs
//Don't worry NineTails, your tab code was not copyed.
document.getElementById("newtab").addEventListener('click', () => { openTab('https://darth-ness.github.io/WarpCore-Start/'); }) 

function openTab(url) {
    var newTabs = document.createElement("button");
    numberOfTabs++;
    newTabs.onclick = ()=>{
        changeTab(numberOfTabs);
    };
    currentTab = numberOfTabs;

    var newPage = document.createElement("webview");
    newPage.src = url;
    newPage.id = "page" + numberOfTabs;
    newPage.setAttribute("style", "height:88%; width:100%;display:none;");
    document.getElementById("pages").append(newPage);

    //Set indication of which tab is selected.
    newTabs.id = numberOfTabs;
    newTabs.innerText = "New Tab";
    document.getElementById("tabbar").append(newTabs);
    newPage.preload = path.join(__dirname, 'src', 'customDefinitions.js'); // for some reason this only works if the tab is opened immediately after startup. i have no idea why
    newPage.addEventListener('dom-ready', () => {
        newTabs.innerText = newPage.getTitle();
        document.getElementById("searchbar").value = newPage.getURL();
    })
    newPage.addEventListener('ipc-message', (event) => {
        switch (event.channel) {
            case "debugLog":
                console.log(event.args[0]);
        }
    })
}

function changeTab(newTab) {
    //Hide old tab
    if (closedTab == false) {
        if (lastTab) {
            document.getElementById(lastTab).setAttribute("class", "not-selectedTAB");
            document.getElementById("page" + lastTab).setAttribute("style", "display:none;height:88%;width:100%");
        }
    }
    //Show new tab
    document.getElementById(newTab).setAttribute("class", "bgBlue4");
    document.getElementById("page" + newTab).setAttribute("style", "display: default;height:88%;width:100%");
    webview = document.getElementById("page" + newTab);
    document.getElementById("searchbar").value = webview.getURL();
    currentTab = newTab;
    lastTab = newTab;
    closedTab = false;
}
document.getElementById("closetab").addEventListener("click", () => {
    document.getElementById(currentTab).remove();
    document.getElementById("page" + currentTab).remove();
    closedTab = true;
})

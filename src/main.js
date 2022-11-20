//vars
var numberOfTabs = 0;
var currentTab = 0;
var lastTab = 0;
var closedTab = false;
var listTabs = ['test'];
var webview = document.getElementById("page0");
var promptList = [];
var activePrompt = null;

setInterval(function() {
    if (!activePrompt) {
        activePrompt = promptList.shift();
    }
},0);
//navigation 

document.getElementById("searchbar").addEventListener('keyup', (e) => {
    if (e.key == "Enter") {
        webview.src = "https://swisscows.com/web?query=" + document.getElementById("searchbar").value;
    }
})
document.getElementById("back").addEventListener('click', () => { webview.goBack(); })
document.getElementById("front").addEventListener('click', () => { webview.goForward(); })
document.getElementById("refresh").addEventListener('click', () => { webview.reload(); })
document.getElementById("newtab").addEventListener('click', () => { openTab('https://darth-ness.github.io/WarpCore-Start/'); }) 
document.getElementById("closetab").addEventListener("click", () => {
    document.getElementById(currentTab).remove();
    document.getElementById("page" + currentTab).remove();
    closedTab = true;
})

//Tabs
//Don't worry NineTails, your tab code was not copyed.

if (localStorage.getItem("tabs") != null) {
    var i = 0;
    listTabs = localStorage.getItem("tabs").split(',');
    currentTab = localStorage.getItem("currentTab");
    closedTab = true;
    while (i < listTabs.length) {
        openTab(listTabs[i]);
        i++;
    } 
}
else {
    closedTab = true;
    numberOfTabs = -1;
    openTab('https://darth-ness.github.io/WarpCore-Start/');
}

function openTab(url) {
    var newTabs = document.createElement("button");
    numberOfTabs++;
    newTabs.setAttribute("onclick", "changeTab(" + numberOfTabs + ")");
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
    newPage.addEventListener('dom-ready', () => {
        newTabs.innerText = newPage.getTitle();
        document.getElementById("searchbar").value = newPage.getURL();
    })
}

function changeTab(newTab) {
    //Hide old tab
    if (closedTab == false) {
        document.getElementById(lastTab).setAttribute("class", "not-selectedTAB");
        document.getElementById("page" + lastTab).setAttribute("style", "display:none;height:88%;width:100%");
    }
    //Show new tab
    document.getElementById(newTab).setAttribute("class", "bgBlue4");
    document.getElementById("page" + newTab).setAttribute("style", "display: default;height:88%;width:100%");
    webview = document.getElementById("page" + newTab);
    document.getElementById("searchbar").value = webview.getURL();
    currentTab = newTab;
    lastTab = newTab;
    closedTab = false;
    saveTabs();
}

//This loads currently open tabs into localstorage
function saveTabs() {
    updateTabs();
    localStorage.setItem('tabs', listTabs.toString());
    localStorage.setItem('currentTab', currentTab);
}
function updateTabs() {
    var i = 0;
    while (i < listTabs.length) {
        listTabs[i] = document.getElementById("page" + i).src; 
        i++;
    }
}

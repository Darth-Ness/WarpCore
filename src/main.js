//vars
var numberOfTabs = 0;
var currentTab = 0; 
var lastTab = 0;
var webview = document.getElementById("page0") ;
//navigation 

document.getElementById("searchbar").addEventListener('keyup', (e) => {
    if(e.key == "Enter") {
        webview.src = document.getElementById("searchbar").value; 
    }
})
document.getElementById("back").addEventListener('click', () => {
   webview.goBack();
})

document.getElementById("front").addEventListener('click', () => {
    webview.goForward();
})

//Tabs
//Don't worry NineTails, your tab code was not copyed.
webview.addEventListener("dom-ready", () => {
    document.getElementById(0).innerText = webview.getTitle();
})
document.getElementById("newtab").addEventListener('click', () => {
    var newTabs = document.createElement("button");
    numberOfTabs++;
    newTabs.setAttribute("onclick", "changeTab("+numberOfTabs+")");
    currentTab = numberOfTabs;

    var newPage = document.createElement("webview");
    newPage.src = "https://darth-ness.github.io/WarpCore-Start/";
    newPage.id = "page" + numberOfTabs;
    newPage.setAttribute("style", "height:88%; width:100%;display:none;");
    document.getElementById("pages").append(newPage);

    //Set indication of which tab is selected.
    newTabs.id = numberOfTabs;
    newTabs.innerText = "New Tab";
    document.getElementById("tabbar").append(newTabs);
    newPage.addEventListener('dom-ready', () => {
        newTabs.innerText = newPage.getTitle();
    })
})

function changeTab(newTab) {
    console.log(lastTab == newTab)
    console.log(newTab)
    console.log(lastTab )
    //Hide old tab
    document.getElementById(lastTab).setAttribute("class", "not-selectedTAB")
    document.getElementById("page" + lastTab).setAttribute("style", "display:none;height:88%;width:100%");
    
    //Show new tab
    document.getElementById(newTab).setAttribute("class", "button-highlight");
    document.getElementById("page" + newTab).setAttribute("style", "display: default;height:88%;width:100%")
    webview = document.getElementById("page" + "newTab")
    currentTab = newTab;
    lastTab = newTab;
}

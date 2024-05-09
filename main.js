let myLeads = []
let ulEl = document.getElementById("ul-el")
let saveEl = document.getElementById("save-el") 
let deleteEl = document.getElementById("delete-el")
let tabEl = document.getElementById("tab-el")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
let inputEl = document.getElementById("input-el")

if (leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    renderleads()
}


tabEl.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        renderleads()
    })
})

function renderleads(){
    let listItems = ""
    for( let i= 0; i < myLeads.length; i++){
        listItems += `
        <li>
            <a target='_blank' href='${myLeads[i]}'>
                ${myLeads[i]}
            </a>
        </li>
    `
    }
    ulEl.innerHTML = listItems
}

deleteEl.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    renderleads()
})

saveEl.addEventListener("click",function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    renderleads()
})
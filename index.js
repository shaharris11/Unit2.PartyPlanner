//create a html page, add the javascript to the body
// create different id tags to call into the JS from the html
// create a a API_URL to pull information from
// render a function to creat a list of all the partys
// Next to each party is a delete buttom
// the party should be able to dissapper

//API_URL
const COHORT = "2310-GHP-ET-WEB-FT-SF";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-GHP-ET-WEB-FT-SF/events`;

const state = {
    parties: [],
};

const partyList = document.querySelector('#allparties');
const partyListContainer = document.querySelector('#parties');
const addPartyForm = document.querySelector('#addParty');
addPartyForm.addEventListener("submit", addParty);




//create a function for the time
//create a function for the date (look into the API)
async function partydate () {
    const response = await fetch (API_URL);
    const party = await response.party.date.splice(0, 10);
    console.log(party);
}

async function render() {
    await theParties();
    renderParties();
}
render();



async function theParties () {
    try {
        const response = await fetch (API_URL);
        const json = await response.json();
        state.parties = json.data;
    } catch (error) {
        console.log(error);
    }
}


function renderParties () {
    if(!state.parties.length) {
        partyListContainer.innerHTML = '<h2>No parties</h2>';
        return;
    }
    
    const partyCards = state.parties.map((party) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <h3>${party.name}</h3>
          <h3>${party.date}</h3>
          <h3>${party.location}</h3>
          <p>${party.description}</p>
        `;
        return li;
      });
    
      partyList.replaceChildren(...partyCards);
}
//create a function that can add and save to the website
// async function = try/catch with method, header, body
async function addParty(event) {
    event.preventDefault();
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: addPartyForm.Partyname.value,
                date:
                location, addPartyForm,PartyLocation,value,
                description: addPartyForm.PartyDescription.value,
            }),
        });
        if (!response.ok) {
            throw new Error("Failed to create party");
        }
        render();
    } catch (error) {
        console.error(error);
    }
}
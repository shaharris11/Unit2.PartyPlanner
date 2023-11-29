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

async function render() {
    await theParties();
    renderParties();
}
render();



async function theParties () {
    try {
        const response = await fetch (API_URL);
        const party = await response.party ();
        state.parties = party.data;
    } catch (error) {
        console.log(error);
    }
}


function renderParties () {
    if(!partyList || partyList.length === 0) {
        partyListContainer.innerHTML = '<h3>No parties</h3>';
        return;
    }
    partyListContainer.innerHTML = '';

    partyList.forEach((party) => {
        console.log(party);
        const partyElement = document.createElement('div');
        partyElement.classList.add('party-card');
        partyElement.innerHTML = `
            <h4>${party.name}</h4>
            <h4>${party.date.time}</h4>
            <h4>${party.location}</h4>
            <p>${party.description}</p>
        `;
        partyListContainer.appendChild(partyElement);
    });
}
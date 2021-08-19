const fetch = require('sync-fetch');
const Page = require("./_layout/Default");

module.exports = class extends Page {
    constructor(){
        super({title:"Home", sName:"Nikunj Prajapati"});
    }
    render(sPage) {
        const oJson = fetch("https://popupmeals-369f7-default-rtdb.firebaseio.com/meals.json").json();
        console.log(oJson);
        let sResult = "<h1>Upcoming Popup Meals</h1>";
        let n = 0;
        Object.keys(oJson).map((key) => {
            const oEntity = oJson[key];
            console.log(oEntity);
            oEntity.id = key;
            sResult += `
            <h2>${oEntity.title}</h2>
            <p><img src="${oEntity.featured_image}" alt="${oEntity.title}" width="580px" height="580px"></p>
            <p>${oEntity.full_description}</p>
            <p>${oEntity.event_location}</p>
            <p>${oEntity.event_date}</p>
            <form>
                <button id="button_${n++}" disabled class="paypal_button" data-cost=${oEntity.event_cost}>
                Order now
                </button>
            </form>
            `;
        });
        return sResult;
    }
}
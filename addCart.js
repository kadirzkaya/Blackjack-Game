const addCard=(cardValue, entity, card)=>{
    card.innerHTML += `<div class="card card-item ${entity.substring(1,entity.length-1).toLowerCase()} showAnim">
                      <span class="card-value-suit top"> ${cardValue} ${entity} </span> 
                      <span class="card-suit"> ${entity} </span> 
                      <span class="card-value-suit bot"> ${cardValue} ${entity} </span></div>`;
}
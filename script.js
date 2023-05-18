let cards=deckBuilder();
const cardPc=document.querySelector(".pcStage");
const scorePc=document.querySelector(".pcScore");
const scoreHuman=document.querySelector(".humanScore");
const cardHuman=document.querySelector(".humanStage");
const hitBtn=document.querySelector("#btnHit");
const stayBtn=document.querySelector("#btnStay");
const playBtn=document.querySelector("#btnPlay");
const restartBtn=document.querySelector("#btnRestart");
const myModalLabel=document.querySelector("#myModalLabel");
const closeBtn=document.querySelectorAll(".close");
const modalBody=document.querySelector(".modal-body");
let pointPc=0,pointHuman=0, startPc=0, cardsNumber=52;

let start=true;


const randomCard=(who)=>{
    const random=Math.floor(Math.random()*cardsNumber);

    const cardValue=cards[random].value; 
    const cardSuit=cards[random].suit; 
    const cardScore=score(cardValue);
    cards.splice(random,1);

    addScore(who,Number(cardScore));

    cardsNumber--;
    let entity;

    cardSuit === "Diamonds" ? (entity = "&diams;") : (entity = "&" + cardSuit.toLowerCase() + ";");

    addCard(cardValue, entity, who);
}


for(let i=0; i<4;i++){
    if(i%2==0){
        randomCard(cardPc);
    }else{
        randomCard(cardHuman);
    }   
}

const hideItem=document.querySelectorAll(".card-item");
let hideItemElement=hideItem[1];
const list=hideItemElement.classList.value;
hideItemElement.classList="cardImage";
hideSpan(hideItemElement);

function hideSpan(hideCard){
    for(let span of hideCard.children){
        span.style.opacity=0;
    }   
}

function showSpan(hideCard){
    for(let span of hideCard.children){
        span.style.opacity=1;
    }   
}

if(pointHuman>21){
    winPc();
}else if(pointHuman==21){
    winHuman();
}

hitBtn.addEventListener("click",()=>{
    randomCard(cardHuman);

    if(pointHuman==21){
        scoreHuman.textContent=pointHuman;
        scorePc.textContent=pointPc;
        showScreen();
        return winHuman();
    }else if(pointHuman>21){
        scoreHuman.textContent=pointHuman;
        scorePc.textContent=pointPc;
        showScreen();
        return winPc();
    }else if(pointHuman<21){
        scoreHuman.textContent=pointHuman;
    }

})

function showScreen(){
    hideItemElement.classList=list;
    showSpan(hideItemElement);
}

function addScore(w,s){
    
    if(w==cardPc){
        pointPc+=s;
        if(start){
            startPc=s;
            start=false;
        }
    }else if(w==cardHuman){
        pointHuman+=s;
    }
    scorePc.textContent=startPc;
    scoreHuman.textContent=pointHuman;
}

stayBtn.addEventListener("click",()=>{
    
    showScreen();
    btnState();
    if(pointPc<=pointHuman){
        myLoop();  
    }
})

const btnState=()=>{
    if(pointPc>21){
        winHuman();
    }else if(pointPc==21){
        winPc();
    }else if(pointPc>pointHuman){
        winPc();
    }
    scorePc.textContent=pointPc;
}

function winPc(){
    openModal("Pc Win");
}

function winHuman(){
    openModal("Human Win");
}

function deuceGame(){
    openModal("Deuce");    
}

function openModal(str) {
    showScreen();
    myModalLabel.textContent=str;
    document.getElementById("backdrop").style.display = "block";
    document.getElementById("myModal").style.display = "block";
    document.getElementById("myModal").classList.add("show");

    switch (str) {
        case "Human Win":
            myModalLabel.style.backgroundColor="green";
            modalBody.innerText="Human Score: "+pointHuman;
            break;
        case "Pc Win":
            myModalLabel.style.backgroundColor="red";
            modalBody.innerText="Pc Score: "+pointPc;
            break;
        default:
            myModalLabel.style.backgroundColor="gray";
            modalBody.innerText="Score: "+pointHuman;
            break;
    }
    hitBtn.classList.add("disabled");
    stayBtn.classList.add("disabled");
}

function closeModal() {
    document.getElementById("backdrop").style.display = "none";
    document.getElementById("myModal").style.display = "none";
    document.getElementById("myModal").classList.remove("show");
}

closeBtn.forEach(f=>{
    f.addEventListener("click",()=>{
        closeModal();
    })
})

restartBtn.addEventListener("click",()=>{
    playBtn.click();
})

playBtn.addEventListener("click",()=>{
    location.reload();
})


function myLoop() {         
    setTimeout(function() {   
        randomCard(cardPc);
        scorePc.textContent=pointPc;

        if(pointPc<=21 && pointPc>pointHuman){
            return winPc();
        }else if(pointPc>21){
            return winHuman();
        }else if(pointHuman==pointPc){
            return deuceGame();
        }                  
        if (pointPc<pointHuman) {           
            myLoop();             
        }else{
            console.log("hadi bakalım")
            if(pointPc==pointHuman){
                return deuceGame();
            }else if(pointPc<=21){
                return winPc();
            }
        }                       
    }, 500)
}
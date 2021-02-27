
/*arquivos Css para serem unidos pelo webpack*/
require('../css/main.css');
require('../css/home.css');
require('../css/info.css');
require('../css/team.css');
require('../css/services.css');
require('../css/contact.css');
require('../css/footer.css');
require('../css/responsive.css');



/* container dos cards*/
const screamScroll = document.querySelector('.scrollbar')


/*tamanho dos cards*/
const CARD_WIDTH = 240;
const CARD_MARGIN = 56;

/*intervalo da Animação*/
const TimeAnimationInterval = 4000 //4s
/* retorna um array com todos os cards do container*/
 function returnArrayOfCards(){
        return document.querySelectorAll(".scrollbar .card");
    }

    /*QUANTIDADE INICIAL DE CARDS */

const INITIAL_CARDS = returnArrayOfCards().length;

/*função principal*/
function main(){ 

    /*array com todos os cards do container*/
    /* posiciona os cards na tela*/
    handlePositionInitialCards();
  /* inicia a escuta do click na tela de cards*/  
  screamScroll.addEventListener("mousedown", (event)=>{
        handleStartMoveCards(event);
    });
    screamScroll.addEventListener("touchstart", (event)=>{
        handleStartMoveCards(event);
    });
/* seta o intervalo da animação nos cards*/
    animationInterval.run();
/*adiciona o efeito de aumento no card central */
    addClassScaleForCenterCard();
}
/* função para identificar quando a tela é modificada*/
window.addEventListener('resize', function(){
   const  cards = returnArrayOfCards();
    if(cards.length != INITIAL_CARDS){
        const cardClone = document.querySelector('.clone');
        const cardCloned = document.querySelector('.cloned')?.classList.remove('cloned');
        cardClone.parentNode.removeChild(cardClone);
    }
    animationInterval.stop();
    main() //está função pode ser desnecessária
  });

/* seta o intervalo da animação do carrocel*/


/* criar um objeto para controlar o animação */
const animationInterval = (()=>{
    var AnimationInterval;

    function run(){
        if(AnimationInterval > 0){

            return 0;
        }
        AnimationInterval = setInterval(() => {
         handleMoveAnimatedCards();
        }, TimeAnimationInterval); 
        return true
       
    }
    function stop(){

        clearInterval(AnimationInterval);
        AnimationInterval = 0;

    }
    return {
        run,
        stop
    }
})();


/*posiciona os cards na tela*/
function handlePositionInitialCards(){
    const cards = returnArrayOfCards();
    const centerCardPosition = Math.trunc( (window.innerWidth / 2) - CARD_WIDTH/2);

    /*quantidade de cards*/


    /*tamanho e a margem de cada card*/
    const CardSpace = CARD_WIDTH + CARD_MARGIN;

    /*quantidade de cards que cabem até a posição 0*/
    const CardsInLeftOfCentralCard = cards.length/2;

   
  const cardsMayExistInLeftOfCentralCard= centerCardPosition / CardSpace;

  /*identificar se é um inteiro se for */
  /*se não for*/
  let InitialPosition = 0
  if(cardsMayExistInLeftOfCentralCard > Math.trunc(CardsInLeftOfCentralCard)){
     InitialPosition = - (centerCardPosition - CardSpace * Math.trunc(CardsInLeftOfCentralCard));
  }
  else if(cardsMayExistInLeftOfCentralCard == parseInt(cardsMayExistInLeftOfCentralCard)){
     InitialPosition = 0;
  }else{
   InitialPosition = - (cardsMayExistInLeftOfCentralCard - parseInt(cardsMayExistInLeftOfCentralCard) - 1 ) * CardSpace;
  }

    cards.forEach((card,position)=>{
     card.style.left = `calc(${CARD_WIDTH * position}px - ${InitialPosition}px  + ${CARD_MARGIN * position}px )`;
    });

}


/* controla o a utilização das animações, não deixando dois intervalos existirem simultaneamente */
const MoveCardsAnimation = (()=>{
    
    var MovingCards = 0;

    function run(direction){
        if(MovingCards > 0){
          stop();
        }
        MovingCards = setInterval(function(){ //suaviza a transição do card na tela
            MoveCards(1,direction);
            if(returnCenterCardPosition() == Math.trunc( (window.innerWidth / 2) - CARD_WIDTH/2)){
                addClassScaleForCenterCard(); //
                clearInterval(MovingCards)// limpa o intervalo quando o card está no centro da tela
            }
         },5);
        return true;
    }
    function stop(){
        clearInterval(MovingCards);
        MovingCards = 0;
    }
    return {
        run,
    }
})();
/* movimenta os cards para a esquerda até centralizar o proximo card na tela*/ 
 function handleMoveAnimatedCards(direction = "left"){
    return MoveCardsAnimation.run(direction);
}

/** retira a classe scale de todos os cards e depois adiciona a classe scale ao card central */
async function  addClassScaleForCenterCard(){
         const cards = returnArrayOfCards();
        
         let centerCard = null;
          cards.forEach((card)=>{
            card.classList.remove('scale')
            if(card.offsetLeft == returnCenterCardPosition()){ //retorna a posição do card mais próximo do centro
                centerCard = card;
            }
         })
        if(centerCard != null){
        centerCard.classList.add('scale')
        }
}

/* retorna a posição do card mais próximo do centro*/
function returnCenterCardPosition(){   
    let cardsLeftDistance = returnCardsLeftDistance();   
    const cardCenterPosition =  (window.innerWidth / 2) - CARD_WIDTH/2; //dividi o tamanho da tela somada a metade do tamanho do card
   return cardsLeftDistance.reduce((centerCardPosition,leftDistance)=>{

       if( Math.abs( leftDistance- cardCenterPosition) < Math.abs(centerCardPosition - cardCenterPosition)){
           return leftDistance;
       }
         return centerCardPosition;
     })
     
 }

 /*retornar um array da posição dos cards*/
function returnCardsLeftDistance(){
    const cards = returnArrayOfCards();
    let cardsLeftDistance = [];
    /* pega a distancia do toque para a lateral esquerda do card*/     
   cards.forEach((card,key)=>{
      cardsLeftDistance[key] = card.offsetLeft; 
    })

    return cardsLeftDistance;
}


function returnDirectionMove(direction = null){
    if(direction == 'right' || direction == true ){
        return true;
    }else if (direction == 'left' || direction == false || direction == null){
       return false;
    }else{
        return null;
    }
}

/* função soma ou subtrai a distancia com a posição atual dependendo da direção recebida*/
function MoveCards(distance,direction = null){
    const cards = returnArrayOfCards();
    /*verifica a direção do movimento*/
    if(distance < 0){
        distance = Math.abs(distance);
        direction = returnDirectionMove('left');
    }else{
    direction = returnDirectionMove(direction);
    }

/*retornar um array da posição dos cards*/
   let cardsLeftDistance = returnCardsLeftDistance();
 /*retorna o card mais a esquerda (primeiro card)*/
   const returnFistCardPosition = (cardsLeftDistance) => cardsLeftDistance.reduce((leftCardPosition,cardLeftDistance,key)=>{
           let  position = cardLeftDistance;
            if(key == 0){
                leftCardPosition = position;
            }
            return leftCardPosition <= position ?leftCardPosition : position; 
    },0)
    
/*retorna o card mais a direita (ultimo card)*/
    const returnLastCardPosition = (cardsLeftDistance) => cardsLeftDistance.reduce((RightCardPosition,cardLeftDistance,key)=>{
        let position = cardLeftDistance;
        if(key == 0){
            RightCardPosition = position;
        }
        return RightCardPosition >= position ?RightCardPosition : position; 
    },0)

/* percorre posição a posição até a distancia recebida (necessário pois se a distancia for muito alta pode ocorrer bugs com a troca de posições além
    de não ser suave (esse código não suaviza  a tela para suavizar deveria utilizar algum setInterval como na função handleMoveAnimatedCards */
    for(let current = 1;current <= distance;current++){
 
        cards.forEach((card,key)=>{ 
            /* atualiza a posição do primeiro e do ultimo */
             cardsLeftDistance = returnCardsLeftDistance();
            let fistCardPosition = returnFistCardPosition(cardsLeftDistance);
            let lastCardPosition = returnLastCardPosition(cardsLeftDistance);

    
            /*soma a posição da esquerda com a distancia a ser percorrida - nova posição*/
            let position = (direction == returnDirectionMove('right'))?cardsLeftDistance[key] + current:cardsLeftDistance[key] - current;        
            /*Entra caso  o o primeiro card estiver pela metade e o ultimo também */
            if((INITIAL_CARDS *(CARD_WIDTH + CARD_MARGIN)) > window.innerWidth - CARD_MARGIN
            && (INITIAL_CARDS *(CARD_WIDTH + CARD_MARGIN)) <  window.innerWidth + CARD_WIDTH){
                //quando arrastado para esquerda estava causando bugs.
                const cloned = screamScroll.querySelector('.cloned');
                const clone = screamScroll.querySelector('.clone');
                function removeClonedCard(card = null){
                    if(card !== null && card.classList.contains('cloned')){
                        card.parentNode.removeChild(card);
                        document.querySelector('.clone')?.classList.remove('clone');
                        return true;
                    }else{
                        return false;
                    }
                  
                }

                function cloneCardsIn(direct = '',card,previousCardPosition){
                    let formula = null;
                    if(direct == 'end'){ 
                         formula =  CARD_WIDTH + CARD_MARGIN; 
                    }
                    if(direct == 'start'){
                         formula = -(CARD_WIDTH) - CARD_MARGIN; 
                    }
                
                    if(formula == null){
                        return false;
                    }
                    const cloneFistCard = card.cloneNode(true);
                    card.closest('.scrollbar').appendChild(cloneFistCard);  
                    card.classList.add('cloned');
                    cloneFistCard.classList.add('clone');
                    const  ClonePosition = previousCardPosition + formula;
                    cloneFistCard.style.left = ClonePosition + 'px';
                
                    return true;
                }

                function HasConflictCardsClonesForDirection(direction){
                    if(direction == returnDirectionMove('right')){
                        if(clone != null && clone.offsetLeft > window.innerWidth - CARD_WIDTH){
                            return true;
                        }
                        return false;
                    }else if(direction == returnDirectionMove('left')){
                        if(clone != null && clone.offsetLeft < 0 + CARD_WIDTH){
                            return true;
                        }
                        return false;
                    }else{
                        return undefined;
                    }
                
                }

                function removeCloneCardsAndClonedClass(clone,cloned){
               
                    if(cloned !== null && clone !== null){
                        clone.remove();
                        cloned.classList.remove('cloned');
                        return true;
                    }else{
                        return false;
                    }
                 
                }

                let permittedAction = true;
                if(direction == returnDirectionMove('right')){
                    if(HasConflictCardsClonesForDirection(direction)){
                            if(clone.offsetLeft > window.innerWidth){
                                removeCloneCardsAndClonedClass(clone,cloned);
                            }else{
                                permittedAction = false;
                            }
                    }
                    if(permittedAction && cardsLeftDistance[key] == lastCardPosition && direction && !card.classList.contains('cloned')){
                        cloneCardsIn('start',card,fistCardPosition);

                    }
                    if(permittedAction  && (cardsLeftDistance[key] == lastCardPosition  && lastCardPosition >=  window.innerWidth)){
                        removeClonedCard(card);

                    }
                }else{
                    if(HasConflictCardsClonesForDirection(direction)){
                        if(clone.offsetLeft < - CARD_WIDTH){
                            removeCloneCardsAndClonedClass(clone,cloned);
                        }else{
                            permittedAction = false;
                        }
                    }
                    //código que faça os cards duplicarem e voltarem do outro lado
                    if(permittedAction  && cardsLeftDistance[key] == fistCardPosition && !direction && !card.classList.contains('cloned')){
                         //duplica o ultimo card e envia para primeira posição 
                        cloneCardsIn('end',card,lastCardPosition);

                    }
                    //remove o card caso o seja o primeiro e ela esteja fora da tela
                    if(permittedAction  && (cardsLeftDistance[key] == fistCardPosition  && fistCardPosition + CARD_WIDTH < 0)){

                        removeClonedCard(card);
                    }
                  
                }   
               /*Quando a tela é superior ao tamanho dos cards eles são centralizados*/
            }else if(INITIAL_CARDS *(CARD_WIDTH + CARD_MARGIN) <= window.innerWidth){
                animationInterval.stop();
                handlePositionInitialCards();
                return;
            /*quando o ultimo card estiver entrando na tela o primeiro se tiver fora da tela irá para a ultima posição */
            }else if( cards.length == cardsLeftDistance.length && (lastCardPosition + CARD_WIDTH <=  window.innerWidth    && fistCardPosition + CARD_WIDTH < 0 && cardsLeftDistance[key] == fistCardPosition )){
                cardsLeftDistance[key] = lastCardPosition  + CARD_WIDTH + CARD_MARGIN; 
                position = cardsLeftDistance[key];
            /*envia o ultimo card para a primeira posição caso o primeiro card estiver entrado  totalmente na tela e ultimo não estiver dentro da tela */
            }else if (fistCardPosition >= 0 && lastCardPosition >=  window.innerWidth && cardsLeftDistance[key] == lastCardPosition){
                cardsLeftDistance[key] = fistCardPosition -  CARD_WIDTH - CARD_MARGIN;
                position = cardsLeftDistance[key];
            }

            if(cards.length == cardsLeftDistance.length){
                card.style.left = position  + 'px';
            }
        })     
    }
}


/*inicial o arraste dos cards*/
let startMovePosition = null;
function handleStartMoveCards(e){
     startMovePosition = e.pageX || e.changedTouches[0].pageX; //para touch
    animationInterval.stop();
    addEventListener("mousemove",handleDragCards);
    addEventListener("touchmove",handleDragCards, false);
    addEventListener("mouseup",handleEndMoveCards);
    addEventListener("touchend", handleEndMoveCards, false);
}

/* espera arrastar 20px da posição inicial para movimentar os cards para o lado arrastado finalizando o evento*/
async function handleDragCards(e){
    const pageX = e.pageX || e.changedTouches[0].pageX;
    const movement = (pageX - startMovePosition );
    if(movement > 20){
    handleMoveAnimatedCards('right');
    handleEndMoveCards();
    }else if( movement < -20){
    handleMoveAnimatedCards('left');
    handleEndMoveCards();
    }
}

/*finaliza o evento de arraste e retoma a animação*/
async function handleEndMoveCards(){
    animationInterval.run();
    removeEventListener("mousemove",  handleDragCards);
    removeEventListener("mouseup", handleEndMoveCards);
    removeEventListener("touchmove",handleDragCards);
    removeEventListener("touchend", handleEndMoveCards);
}

/* inicial a função principal*/
main();
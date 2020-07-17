


/* container dos cards*/
const screamScroll = document.querySelector('.scrollbar')


/*tamanho dos cards*/
const CARD_WIDTH = 205;
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
    centerCardPosition = Math.trunc( (window.innerWidth / 2) - CARD_WIDTH/2);

    /*quantidade de cards*/


    /*tamanho e a margem de cada card*/
    CardSpace = CARD_WIDTH + CARD_MARGIN;

    /*quantidade de cards que cabem até a posição 0*/
    CardsInLeftOfCentralCard = cards.length/2;

   
  cardsMayExistInLeftOfCentralCard= centerCardPosition / CardSpace;

  /*identificar se é um inteiro se for */
  /*se não for*/

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


/* função soma ou subtrai a distancia com a posição atual dependendo da direção recebida*/
function MoveCards(distance,direction = null){
    const cards = returnArrayOfCards();
    /*verifica a direção do movimento*/
    if(distance < 0){
        distance = Math.abs(distance);
        direction = 'left';
    }else if(direction == null){
        direction = 'right';
    }
    if(direction == 'right' || direction == true){
        direction = true;
    }else if (direction == 'left' || direction == false){
        direction = false;
    }else{
        return false;
    }

/*retornar um array da posição dos cards*/
   let cardsLeftDistance = returnCardsLeftDistance();
 /*retorna o card mais a esquerda (primeiro card)*/
   const returnFistCardPosition = (cardsLeftDistance) => cardsLeftDistance.reduce((leftCardPosition,cardLeftDistance,key)=>{
            position = cardLeftDistance;
            if(key == 0){
                leftCardPosition = position;
            }
            return leftCardPosition <= position ?leftCardPosition : position; 
    },0)
    
/*retorna o card mais a direita (ultimo card)*/
    const returnLastCardPosition = (cardsLeftDistance) => cardsLeftDistance.reduce((RightCardPosition,cardLeftDistance,key)=>{
        position = cardLeftDistance;
        if(key == 0){
            RightCardPosition = position;
        }
        return RightCardPosition >= position ?RightCardPosition : position; 
    },0)

/* percorre posição a posição até a distancia recebida (necessário pois se a distancia for muito alta pode ocorrer bugs com a troca de posições além
    de não ser suave (esse código não suaviza  a tela para suavizar deveria utilizar algum setInterval como na função handleMoveAnimatedCards */
    for(current = 1;current <= distance;current++){
 
        cards.forEach((card,key)=>{ 
            /* atualiza a posição do primeiro e do ultimo */
            cardsLeftDistance = returnCardsLeftDistance();
            fistCardPosition = returnFistCardPosition(cardsLeftDistance);
            lastCardPosition = returnLastCardPosition(cardsLeftDistance);

    
            /*soma a posição da esquerda com a distancia a ser percorrida - nova posição*/
            
            position = direction?cardsLeftDistance[key] + current:cardsLeftDistance[key] - current;
            /*envia o primeiro card para o lado direito se o ultimo card estiver aparecendo na tela ou o primeiro card estiver a mais -250 a esqyerda*/
            /*esta causando bugs quando os cards não ultrapassam a tela*/

        
                
            /*Entra caso  o o primeiro card estiver pela metade e o ultimo também */
            if((INITIAL_CARDS *(CARD_WIDTH + CARD_MARGIN)) > window.innerWidth - 2 *(CARD_MARGIN + CARD_WIDTH/2)
            && (INITIAL_CARDS *(CARD_WIDTH + CARD_MARGIN)) < window.innerWidth ){
            
                //quando arrastado para esquerda estava causando bugs
                if(direction){
                    return
                }
                //  handlePositionInitialCards();
                //código que faça os cards duplicarem e voltarem do outro lado
                if(cardsLeftDistance[key] == fistCardPosition && !direction && !card.classList.contains('cloned')  && cards.length == INITIAL_CARDS){
                    const cloneFistCard = card.cloneNode(true);
                    card.closest('.scrollbar').appendChild(cloneFistCard);  
                    card.classList.add('cloned');
                    ClonePosition = lastCardPosition + CARD_WIDTH + CARD_MARGIN; 
                    cloneFistCard.style.left = ClonePosition + 'px';
                    console.log('entrei e clonei o primeiro');
                }else if(cardsLeftDistance[key] == lastCardPosition &&  direction && !card.classList.contains('cloned') && cards.length == INITIAL_CARDS){
                    const cloneFistCard = card.cloneNode(true);
                    card.closest('.scrollbar').appendChild(cloneFistCard);  
                    card.classList.add('cloned');
                    ClonePosition = fistCardPosition  -  CARD_WIDTH - CARD_MARGIN; 
                    cloneFistCard.style.left = ClonePosition + 'px';
                    console.log('entrei e clonei o ultimo');

                }
                if((card.classList.contains('cloned') && cardsLeftDistance[key] == fistCardPosition  && fistCardPosition + CARD_WIDTH < 0)
                 || (card.classList.contains('cloned') && cardsLeftDistance[key] == lastCardPosition  && lastCardPosition >=  window.innerWidth)){ 
                        card.parentNode.removeChild(card);
                        cardsLeftDistance = returnCardsLeftDistance();
                        console.log('exclui',cardsLeftDistance);
                        return
                }
               /*Quando a tela é superior ao tamanho dos cards eles são centralizados*/
            }else if(lastCardPosition + CARD_WIDTH + CARD_MARGIN <= window.innerWidth  && fistCardPosition > 0  + CARD_MARGIN){
                animationInterval.stop();
                handlePositionInitialCards();
                console.log('parei tudo',returnCardsLeftDistance(),cards)
                return
            
            /*quando o ultimo card estiver entrando na tela o primeiro se tiver fora da tela irá para a ultima posição */
            }else if( cards.length == cardsLeftDistance.length && (lastCardPosition + CARD_WIDTH <=  window.innerWidth    && fistCardPosition + CARD_WIDTH < 0 && cardsLeftDistance[key] == fistCardPosition )){
                cardsLeftDistance[key] = lastCardPosition  + CARD_WIDTH + CARD_MARGIN; 
                position = cardsLeftDistance[key];
                console.log(card,cardsLeftDistance,fistCardPosition,lastCardPosition);
                console.log('troquei')
               
            
               
                // var cardClone = screamScroll.getElementsByClassName('clone');
                // if(cardClone != null){
                //     screamScroll.removeChild(cardClone);
                // }
            /*envia o ultimo card para a primeira posição caso o primeiro card estiver entrado  totalmente na tela e ultimo não estiver dentro da tela */
            }else if (fistCardPosition >= 0 && lastCardPosition >=  window.innerWidth && cardsLeftDistance[key] == lastCardPosition){
                cardsLeftDistance[key] = fistCardPosition -  CARD_WIDTH - CARD_MARGIN;
                position = cardsLeftDistance[key];
                console.log('não entendi , mas entrei')
            }


         

            if(cards.length == cardsLeftDistance.length){
                card.style.left = position  + 'px';
            }
        })     
    }
   
}

/*inicial o arraste dos cards*/
function handleStartMoveCards(e){

    startMovePosition = e.pageX || e.changedTouches[0].pageX; //para touch
    console.log(startMovePosition)
    animationInterval.stop();
    addEventListener("mousemove",handleDragCards);
    addEventListener("touchmove",handleDragCards, false);
    addEventListener("mouseup",handleEndMoveCards);
    addEventListener("touchend", handleEndMoveCards, false);
 

}



/* espera arrastar 20px da posição inicial para movimentar os cards para o lado arrastado finalizando o evento*/
async function handleDragCards(e){
    const pageX = e.pageX || e.changedTouches[0].pageX;
    console.log(e,pageX);
    movement = (pageX - startMovePosition );
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
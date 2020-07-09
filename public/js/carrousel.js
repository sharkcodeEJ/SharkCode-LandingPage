

/* container dos cards*/
const screanScroll = document.querySelector('.scrolable')

/*arrray com todos os cards do container*/
const cards = document.querySelectorAll(".scrolable .card");

/*tamanho dos cards*/
const CARD_WIDTH = 205;
const CARD_MARGIN = 56;

/*intervalo da Animação*/
const TimeAnimationIntervaL = 4000 //4s

/*função principal*/
function main(){
    /* posiciona os cards na tela*/
    handlePositionInitialCards(cards);
  /* inica a escuta do click na tela de cards*/  
screanScroll.addEventListener("mousedown", (event)=>{
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
        }, TimeAnimationIntervaL); 
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
function handlePositionInitialCards(cards){
    
    centerCardPosition = Math.trunc( (window.innerWidth / 2) - CARD_WIDTH/2);

    /*quantidade de cards*/


    /*tamanho e a margem de cada card*/
    CardSpace = CARD_WIDTH + CARD_MARGIN;

    /*qunatidade de cards que cabem até a posição 0*/

   
  cardsExistingInLeftOfCentralCard= centerCardPosition / CardSpace;

  InitialPosition = cardsExistingInLeftOfCentralCard * CardSpace
  /*identificar se é um intero se for */
  InitialPosition = 0;
  /*se não for*/
  InitialPosition = - (cardsExistingInLeftOfCentralCard - parseInt(cardsExistingInLeftOfCentralCard) - 1 ) * CardSpace;




    cards.forEach((card,position)=>{
     card.style.left = `calc(${CARD_WIDTH * position}px - ${InitialPosition}px  + ${CARD_MARGIN * position}px )`;
    });

}


/* controla o a utlização das animações, não deixando dois intervalos existirem simultaneamente */
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
    let cardsLeftDistance = [];
    /* pega a distancia do toque para a lateral esquerda do card*/     
   cards.forEach((card,key)=>{
      cardsLeftDistance[key] = card.offsetLeft; 
    })
    return cardsLeftDistance;
}


/* função soma ou subtrai a distancia com a posicição atual dependendo da direção recebida*/
function MoveCards(distance,direction = null){

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
   const returnfistCardPosition = () => cardsLeftDistance.reduce((leftCardPosition,cardLeftDistance,key)=>{
            position = cardLeftDistance;
            if(key == 0){
                leftCardPosition = position;
            }
            return leftCardPosition <= position ?leftCardPosition : position; 
    },0)
    
/*retorna o card mais a direita (ultimo card)*/
    const returnlastCardPosition = () => cardsLeftDistance.reduce((RigthCardPosition,cardLeftDistance,key)=>{
        position = cardLeftDistance;
        if(key == 0){
            RigthCardPosition = position;
        }
        return RigthCardPosition >= position ?RigthCardPosition : position; 
    },0)

/* percorre posição a posição até a distancia recebida (necessário pois se a distancia for muito alta pode ocorrer bugs com a troca de posições além
    de não ser suave (esse código não suavisa  a tela para suavisar deveria utilizar algum setinterval como na função handleMoveAnimatedCards */
    for(current = 1;current <= distance;current++){
        cards.forEach((card,key)=>{ 
            /* atualiza a posição do primeiro e do ultimo */
            fistCardPosition = returnfistCardPosition();
            lastCardPosition = returnlastCardPosition();
    
            /*soma a posição da esquerda com a distancia a ser percorrida - nova posição*/
            
            position = direction?cardsLeftDistance[key] + current:cardsLeftDistance[key] - current;
            /*envia o primeiro card para o lado direito se o ultimo card estiver aparecendo na tela ou o primeiro card estiver a mais -250 a esqyerda*/
            /*esta caiusando bugs quando os cards não ultrapassam a tela*/
            if(lastCardPosition < window.innerWidth && fistCardPosition > 0 ){
                position = cardsLeftDistance[key];
            }else if( lastCardPosition <=  window.innerWidth  && cardsLeftDistance[key] == fistCardPosition ){
                cardsLeftDistance[key] = lastCardPosition  + 261; 
                position = cardsLeftDistance[key];
    
                /*enviar o ultimo card para a primeira posição caso o primeiro card estiver -200 left da screan */
            }else if (fistCardPosition >= 0 && cardsLeftDistance[key] == lastCardPosition){
               
                cardsLeftDistance[key] = fistCardPosition - 261;
                position = cardsLeftDistance[key];
            }
                card.style.left = position  + 'px';
        })     
    }
   
}

/*incial o arraste dos cards*/
function handleStartMoveCards(e){

    startMovePosition = e.pageX;
    animationInterval.stop();
    addEventListener("mousemove",handleDragCards);
    addEventListener("mouseup",handleEndMoveCards);

}



/* espera arrastar 20px da posição inicial para movimentar os cards para o lado arrastado finalizando o evento*/
async function handleDragCards(e){
    movement = (e.pageX - startMovePosition );
    if(movement > 20){
    handleMoveAnimatedCards('right');
    handleEndMoveCards();
    }else if( movement < -20){
    handleMoveAnimatedCards('left');
    handleEndMoveCards();
    }

}

/*finaliza o evento de arraste e retoma a animação*/
function handleEndMoveCards(){
    animationInterval.run();
    removeEventListener("mousemove",handleDragCards);
    removeEventListener("mouseup",handleEndMoveCards);
}

/* incial a função principal*/
main();
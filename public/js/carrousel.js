

/*definindo as posições dos cards inicial*/


/* o x inicial do drag*/
let dragOfX = [];
/* o y inicial do drag */
let dragOfY = 0;

const screanScroll = document.querySelector('.scrolable')
const cards = document.querySelectorAll(".card");
function sizeOfCards(){
screanScroll.addEventListener("mousedown", (event)=>{
        handleStartMoveCards(event);
    });
cards.forEach((card,counter)=>{
    handlePositionInitialCards(card,counter);
 
});
}
sizeOfCards();
window.addEventListener('resize', function(){
    sizeOfCards();
  });

function handlePositionInitialCards(card, position){
    var windowWidth = window.innerWidth;

    if(windowWidth < (205 * 2)){
        card.style.left = `calc(${205 * position}px + 205px + ${56 * position}px )`;
    }else if(windowWidth < 205 * 3){
        card.style.left = `calc(${205 * position}px - 50vw + ${56 * position}px )`;
    }else if(windowWidth < 205* 4){
        card.style.left = `calc(${205 * position}px - 205px + ${56 * position}px )`;
    }else if(windowWidth < 205 * 5){
        card.style.left = `calc(${205 * position}px - 205px + ${56 * position}px )`;
    }else{
        card.style.left = `calc(${205 * position}px - 205px + ${56 * position}px )`;
    }
    
}


function handleStartMoveCards(e){

    cards.forEach((card,key)=>{
    dragOfX[key] = e.pageX - card.offsetLeft;
    // diferença entre a posição do click e a distancia do objeto com o lado esquedo
    })
    

    addEventListener("mousemove",handleMoveCards);
    addEventListener("mouseup",handleEndMoveCards);

}

async function handleMoveCards(e){


   
    cards.forEach((card,key)=>{
        fistCardPosition = dragOfX.reduce((leftCardPosition,cardPositionOfpage,key)=>{
            position = (e.pageX - cardPositionOfpage);
            if(key == 0){
                leftCardPosition = position;
            }
           
            
            return leftCardPosition <= position ?leftCardPosition : position; 
        },0)

        lastCardPosition = dragOfX.reduce((RigthCardPosition,cardPositionOfpage,key)=>{
            position = (e.pageX -
                 cardPositionOfpage);
            if(key == 0){
                RigthCardPosition = position;
            }
            return RigthCardPosition >= position ?RigthCardPosition : position; 
        },0)
    
    
        
        str = card.style.left.substring(5);
        leftPosition = str.substring(0,(str.length -1)).replace('px','');
        
        position = (e.pageX - dragOfX[key]);
        if(( fistCardPosition <= - 250 || lastCardPosition <= window.windowWidth) && position == fistCardPosition ){
            dragOfX[key] = e.pageX  - lastCardPosition  - 261; 
            position = (e.pageX - dragOfX[key]);

        }else if (fistCardPosition > -200 && position == lastCardPosition){
           
            dragOfX[key] = e.pageX  -  fistCardPosition + 261;
            position = (e.pageX - dragOfX[key]);
        }
            card.style.left = position  + 'px';
    })

}
function handleEndMoveCards(){
    console.log('FIM do movimento')
    removeEventListener("mousemove",handleMoveCards);
    removeEventListener("mouseup",handleEndMoveCards);
    counter = 0;
}


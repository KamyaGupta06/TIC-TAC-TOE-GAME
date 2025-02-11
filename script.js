let boxes=document.querySelectorAll(".box");
let resetBtn = document.querySelector("#rest-btn");
let newGame= document.querySelector("#new-game");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector(".msg");


let drawline=document.querySelector(".line");

let turn0=true;
const winPatterns=[
    [0,1,2,10,-150,180], // horizontal*
    [0,3,6,-150,10,90],// vertical*
    [0,4,8, 1,1,45],// diagonal*
    [1,4,7,1,10,90],// vertical*
    [2,5,8,150,10,90],// vertical*
    [2,4,6,1,1,135],// diagonal*
    [3,4,5,10,1,180],// horizontal*
    [6,7,8 ,10,150,1800],// horizontal*

    // [0, 1, 2, 0, -15, 0],    // Top horizontal
    // [3, 4, 5, 0, 0, 0],      // Middle horizontal
    // [6, 7, 8, 0, 15, 0],     // Bottom horizontal
    // [0, 3, 6, -15, 0, 90],   // Left vertical
    // [1, 4, 7, 0, 0, 90],     // Middle vertical
    // [2, 5, 8, 15, 0, 90],    // Right vertical
    // [0, 4, 8, 0, 0, 45],     // Main diagonal
    // [2, 4, 6, 0, 0, 135]     // Opposite diagonal

];
const resetGame=()=>{
    turn0=true;
    enableBoxes();
    msgContainer.classList.add("hide");
    document.querySelector(".container").classList.remove("hide");
    document.querySelector("h1").classList.remove("hide");
    document.querySelector("#rest-btn").classList.remove("hide");
    document.querySelector(".line").classList.add("hide");
   
}
const enableBoxes=()=>{
    for(let box of boxes)
    {
        box.disabled=false;
        box.innerText="";
    }
};

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turn0)
        {
            box.innerText="O";
            turn0=false;
        }
        else
        {
            box.innerText="X";
            turn0=true;
        }
        box.disabled=true;
        checkWinner();
    });
});

const checkWinner=()=>{
    for(let pattern of winPatterns)
    {
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;
        if(pos1Val!="" && pos2Val!="" && pos3Val!="")
        {
        if(pos1Val==pos2Val && pos2Val==pos3Val)
        {
            drawline.style.width = "55vh"; // Match the grid width
            drawline.style.transform = `translate(${pattern[3]}px, ${pattern[4]}px) rotate(${pattern[5]}deg)`;
            drawline.classList.remove("hide"); // Ensure the line is visible
            setTimeout(() => {
            showWinner();
        },500);
    }
        }
    }
    if(boxes[winPatterns[0][0]].innerText!="" && boxes[winPatterns[0][1]].innerText!="" && boxes[winPatterns[0][2]].innerText!=""
        && boxes[winPatterns[1][0]].innerText!="" && boxes[winPatterns[1][1]].innerText!="" && boxes[winPatterns[1][2]].innerText!=""
        && boxes[winPatterns[2][0]].innerText!="" && boxes[winPatterns[2][1]].innerText!="" && boxes[winPatterns[2][2]].innerText!="")
    {
        tie();
    }

};

const tie=()=>
{
    msg.innerText="It's a tie!";
    msg.classList.add("show");
    msgContainer.classList.remove("hide");
    document.querySelector(".container").classList.add("hide");
    document.querySelector("h1").classList.add("hide");
    document.querySelector("#rest-btn").classList.add("hide");

    disableBoxes();
}

const showWinner=(winner)=>
{
    
   
    if(winner==="O")
    {
    msg.innerText="Congratulations , Winner is player 1!🎉";

    }
    else
    {
        msg.innerText="Congratulations , Winner is player 2!🎉";
    }
    msg.classList.add("show");
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });
    setTimeout(() => {
        confetti({
            particleCount: 500,
            spread: 200,
            startVelocity: 30,
        });
    }, 600);
    msgContainer.classList.remove("hide");
    document.querySelector(".container").classList.add("hide");
    document.querySelector("h1").classList.add("hide");
    document.querySelector("#rest-btn").classList.add("hide");

    disableBoxes();
};
const disableBoxes=()=>{
    for(let box of boxes)
    {
        box.disabled=true;
    }
};

newGame.addEventListener("click",resetGame)

resetBtn.addEventListener("click",resetGame)


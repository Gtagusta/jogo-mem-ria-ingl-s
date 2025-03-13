function aleatorio(tamanho){
    let escolhido = Math.floor(Math.random()*tamanho);
    return escolhido;
}

function gencards(){
const list=["ponder",
        "he was busy <b>contemplating</b> his options",
        "observe", 
        "it's hard to <b>watch</b> the footage of that surgery",
        "post",
        "the dock’s <b>piling</b> rots",
       "accumulate",
       "the investigators have yet to <b>amass</b> enough evidence to convict them"
       ]
let size=list.length
let resultado=""
let nal=0
for(let i=0;i<size;i++){
nal=aleatorio(list.length)
resultado+=`
<div class="cardcontainer">
    <div id="container-${i}" class="card flipped">
        <div class="cardfront">
        <p id="card-${i}">
        ${list[nal]}
        </p>
        </div>
        <div class="cardback" onclick="select('card-${i}','container-${i}')"></div>
    </div>
</div>
`
list.splice(nal,1)
}

return resultado

}

function fullscreen(){
    if(!document.fullscreenElement){
        document.querySelector("#main").requestFullscreen()
    }else{
        document.exitFullscreen()
    }
}

function help(){
    document.getElementById("modal").innerHTML=
    `
    <div class="modalstats">
    <h1>Explicação do Jogo</h1>
    <p>
    Cada palavra tem uma frase com a qual devem ser associadas, se a palavra destacada na frase tiver, no contexto da frase, o mesmo significado que a palavra escolhida, sabemos que essa palavra é associada a essa frase.
    </p>
    </div>
    <div class="modalbuttons">
    <p onclick="closemodal()">X</p>
    </div>
    `
    document.getElementById("modal").classList.add("open")
    document.getElementById("overlay").classList.add("open")
}

function closemodal(){
    document.getElementById("modal").classList.remove("open")
    document.getElementById("overlay").classList.remove("open")
    document.getElementById("overlay").innerHTML=""
    document.getElementById("modal").innerHTML=""
}

function start(){
    document.getElementById("overlay").innerHTML=
    `
    <div onclick="closemodal()">
    <p>Clique para Jogar!</p>
    </div>
    `
    document.getElementById("overlay").classList.add("open")
}

function reload(){
    lastcard=""
    processing=false
    counter=0
    document.querySelector(".deck").innerHTML = gencards()
}

document.onfullscreenchange = function() {
    if(!document.fullscreenElement){
        document.querySelector(".fullscreen").classList.remove("minscreen")
    }else{
        document.querySelector(".fullscreen").classList.add("minscreen")
    }
}

window.onload = function() {
    start()
    document.querySelector(".deck").innerHTML = gencards()
    };

var counter=0
var lastcard=""
var processing=false
function select(card,container){
    if(!processing){
    processing=true
    if(!lastcard){
        lastcard=[card,container]
        document.getElementById(container).classList.remove("flipped")
        processing=false
    } else{
        document.getElementById(container).classList.remove("flipped")

        let a = document.getElementById(lastcard[0]).innerHTML
        let b = document.getElementById(card).innerHTML
        let c=[a.trim(),b.trim()]
        console.log(c)
        if((c.includes("ponder") && c.includes("he was busy <b>contemplating</b> his options"))||
        (c.includes("observe") && c.includes("it's hard to <b>watch</b> the footage of that surgery"))||
        (c.includes("post") && c.includes("the dock’s <b>piling</b> rots"))||
        (c.includes("accumulate") && c.includes("the investigators have yet to <b>amass</b> enough evidence to convict them"))
        ){
            processing=true
            setTimeout(()=>{
            document.getElementById(lastcard[1]).innerHTML=
            `
            <div class="cardfront">
            <p id="${lastcard[0]}">
             ${document.getElementById(lastcard[0]).innerHTML}
            </p>
            </div>
            <div class="cardback"></div>
            `
            
            document.getElementById(container).innerHTML=
            `
            <div class="cardfront">
            <p id="${card}">
             ${document.getElementById(card).innerHTML}
            </p>
            </div>
            <div class="cardback" ></div>
            ` 
            counter+=1
            document.getElementById(lastcard[1]).classList.add("deactive")
            document.getElementById(container).classList.add("deactive")
            lastcard=""
            processing=false
            if(counter>=4){

                document.getElementById("overlay").innerHTML=
                `
                <div onclick="closemodal()">
                <p>Parabéns, Jogo Concluído!</p>
                <p>Clique para Jogar Novamente!</p>
                </div>
                `
                document.getElementById("overlay").classList.add("open")
                reload()
            }
            },800)
        } else{
            setTimeout(()=>{
            document.getElementById(lastcard[1]).classList.add("flipped")
            document.getElementById(container).classList.add("flipped")
            lastcard=""
            processing=false
            },1800)
        }
    }
}
}
fetch('https://api.sportsdata.io/v3/nfl/scores/json/Players?key=9bb929f203854586a80ed06ce03c813a')
.then(res => res.json())
.then(j => {
            document.querySelector("canvas").hidden = true
            json = j
            renderQBS(json)
            renderWRS(json)
    })

let div_images = document.querySelector('#images')
let input = document.querySelector('#qbName')
let currentQB = document.querySelector('#currentQB')
let div_QB = document.querySelector('#QB')
let q1 = 0
let timer = ''
let interval = 500

let json = []
let selectedQB = {}

input.addEventListener('input', () => {
    console.log(input.value)
    renderQBS(json,input.value.toLowerCase())
})


function atualizaQB(id){
    selectedQB = json.filter( p => p.PlayerID == id)[0]
    currentQB.innerHTML = selectedQB.FirstName + ' ' + selectedQB.LastName
    div_QB.innerHTML = `<p id = "randQB">100</p>
                            <img src=${selectedQB.PhotoUrl} class="card-img-top"/>
                            <a href="#" onclick = "testaLancamento()"> 
                                <img class="ballIcon" src = "/imagens/animated_ball.gif"/>
                            </a> `
    timer = setInterval(randomQBPass,interval);
}

function randomQBPass(){
    q1 = getRandomIntInclusive(50,100)
    document.querySelector('#randQB').innerHTML = q1
}

function testaLancamento(){
    clearInterval(timer)
    let diff1 = Math.abs(r1-q1)
    let diff2 = Math.abs(r2-q1)
    console.log(diff1,diff2)

    if( diff1 <= 5 || diff2 <= 5){
        alert("TOUCHDOWN")
        interval-=100
    }else{
        alert("INTERCEPTAÇÃO")
        interval+=100
    }
    timer = setInterval(randomQBPass,interval)
}


function renderQBS(json,filter = ""){
    div_images.innerHTML = ""
    for(let player of json){
        if(player.Active && player.Position === "QB" && player.ShortName.toLowerCase().includes(filter)){
            let img = `<div class="col-sm-3">
                            <div class="card"> 
                                <img src=${player.PhotoUrl} class="card-img-top"/>
                                <div class="card-body">
                                    <p class="card-text" >${player.ShortName} </p>
                                    <p class="card-text" >${player.Team}</p>
                                    <button onclick = "atualizaQB(${player.PlayerID})" type="button" class="btn btn-primary">Escolher</button>
                                    <p hidden="true">${player.PlayerID}</p>
                                </div>
                            </div>
                        </div>`
            div_images.insertAdjacentHTML('beforeend',img)
        }
    }
}




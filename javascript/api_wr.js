let wr_images = document.querySelector('#imagesWR')
let wr_input = document.querySelector('#wrName')
let currentWR = document.querySelector('#currentWR')
let div_WR1 = document.querySelector('#WR1')
let div_WR2 = document.querySelector('#WR2')

let selectedWR = []
let r1
let r2

wr_input.addEventListener('input', () => {
    renderWRS(json,wr_input.value.toLowerCase())
})

function atualizaWR(id){
    selectedWR.push(json.filter( p => p.PlayerID == id)[0])
    currentWR.innerHTML = selectedWR.reduce((acc,p)=> acc += p.FirstName + ' ' + p.LastName + '</br>','')
    if(selectedWR.length == 2){
        r1 = getRandomIntInclusive(50,75)
        r2 = getRandomIntInclusive(75,100)
        div_WR1.insertAdjacentHTML('afterbegin', `<img src=${selectedWR[0].PhotoUrl} class="card-img-top"/> <p id = "randWR1">${r1}</p>`)
        div_WR2.insertAdjacentHTML('afterbegin', `<p id = "randWR2">${r2}</p> <img src=${selectedWR[1].PhotoUrl} class="card-img-top"/> `)
    }
}

function renderWRS(json,filter = ""){
    wr_images.innerHTML = ""
    for(let player of json){
        if(player.Active && player.Position === "WR" && player.ShortName.toLowerCase().includes(filter)){
            let img = `<div class="col-sm-3">
                            <div class="card"> 
                                <img src=${player.PhotoUrl} class="card-img-top"/>
                                <div class="card-body">
                                    <div class="card-info">
                                        <p class="card-text" >Player: ${player.ShortName} </p>
                                        <p class="card-text" >Team: ${player.Team}</p>
                                        <button onclick = "atualizaWR(${player.PlayerID})" type="button" class="btn btn-primary">Escolher</button>
                                    </div>
                                    <div class="nfl-logo"><img src="/imagens/nfl_logo_peq.png" width=70%></div>
                                    <p hidden="true">${player.PlayerID}</p>
                                </div>
                            </div>
                        </div>`
            wr_images.insertAdjacentHTML('beforeend',img)
        }
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


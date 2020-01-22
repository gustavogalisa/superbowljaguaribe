fetch('https://api.sportsdata.io/v3/nfl/scores/json/Players?key=9bb929f203854586a80ed06ce03c813a')
.then(res => res.json())
.then(j => {
            json = j
            renderQBS(json)
            renderWRS(json)
    })

let div_images = document.querySelector('#images')
let input = document.querySelector('#qbName')
let currentQB = document.querySelector('#currentQB')
let div_QB = document.querySelector('#QB')

let json = []
let selectedQB = {}

input.addEventListener('input', () => {
    console.log(input.value)
    renderQBS(json,input.value.toLowerCase())
})


function atualizaQB(id){
    selectedQB = json.filter( p => p.PlayerID == id)[0]
    currentQB.innerHTML = selectedQB.FirstName + ' ' + selectedQB.LastName
    div_QB.innerHTML = `<img src=${selectedQB.PhotoUrl} class="card-img-top"/>`
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



let wr_images = document.querySelector('#imagesWR')
let wr_input = document.querySelector('#wrName')
let currentWR = document.querySelector('#currentWR')

let selectedWR = []

wr_input.addEventListener('input', () => {
    console.log(input.value)
    renderWRS(json,input.value.toLowerCase())
})

function atualizaWR(id){
    selectedWR.push(json.filter( p => p.PlayerID == id)[0])
    currentWR.innerHTML = selectedWR.reduce((acc,p)=> acc += p.FirstName + ' ' + p.LastName + '</br>','')
}

function renderWRS(json,filter = ""){
    wr_images.innerHTML = ""
    for(let player of json){
        if(player.Active && player.Position === "WR" && player.ShortName.toLowerCase().includes(filter)){
            let img = `<div class="col-sm-3">
                            <div class="card"> 
                                <img src=${player.PhotoUrl} class="card-img-top"/>
                                <div class="card-body">
                                    <p class="card-text" >${player.ShortName} </p>
                                    <p class="card-text" >${player.Team}</p>
                                    <button onclick = "atualizaWR(${player.PlayerID})" type="button" class="btn btn-primary">Escolher</button>
                                    <p hidden="true">${player.PlayerID}</p>
                                </div>
                            </div>
                        </div>`
            wr_images.insertAdjacentHTML('beforeend',img)
        }
    }
}


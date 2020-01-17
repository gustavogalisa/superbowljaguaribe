let div_images = document.querySelector('#images')
let input = document.querySelector('#qbName')

let json = []

input.addEventListener('input', () => {
    console.log(input.value)
    renderQBS(json,input.value.toLowerCase())
})


fetch('https://api.sportsdata.io/v3/nfl/scores/json/Players?key=9bb929f203854586a80ed06ce03c813a')
.then(res => res.json())
.then(j => {
            json = j
            renderQBS(json)
    })


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
                                    <button type="button" class="btn btn-primary">Escolher</button>
                                    <p hidden="true">${player.PlayerID}</p>
                                </div>
                            </div>
                        </div>`
            div_images.insertAdjacentHTML('beforeend',img)
        }
    }
}



function openMenu(){
    document.getElementById('sideMenu').style.marginLeft = '0'
    document.getElementById('main').style.marginLeft = '15rem'
    document.getElementById('ball').style.marginLeft = '15rem'
    document.body.blur() /*tá fazendo nada*/
}

function closeMenu(){
    document.getElementById('sideMenu').style.marginLeft = '-15rem'
    document.getElementById('main').style.marginLeft = '0'
    document.getElementById('ball').style.marginLeft = '0'
    closeQb()
    closeWr()
    closeAtaque()
}

function ataque(){
    document.getElementById('card-ataque').style.marginLeft = '15rem'
    document.getElementById('main').style.marginLeft = '0'
    document.getElementById('ball').style.marginLeft = '15rem'
    closeQb()
    closeWr()    
}

function closeAtaque(){
    document.getElementById('card-ataque').style.marginLeft = '-1000rem'
}

function qb(){
    document.getElementById('card-qb').style.marginLeft = '15rem'
    document.getElementById('main').style.marginLeft = '0'
    document.getElementById('ball').style.marginLeft = '15rem'
    closeAtaque()
    closeWr()    
}

function closeQb(){
    document.getElementById('card-qb').style.marginLeft = '-1000rem'
}

function wr(){
    document.getElementById('card-wr').style.marginLeft = '15rem'
    document.getElementById('main').style.marginLeft = '0'
    document.getElementById('ball').style.marginLeft = '15rem'
    closeAtaque()
    closeQb()
}

function closeWr(){
    document.getElementById('card-wr').style.marginLeft = '-1000rem'
}
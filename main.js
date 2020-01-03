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
}
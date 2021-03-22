var mybtn = document.querySelector('#mybtn')

mybtn.onclick = function(e){

    window.open('./popup_page.html')
}

window.addEventListener('message',(msg)=>{
    let mytext = document.querySelector('#mytext')
    mytext.innerHTML = JSON.stringify(msg)
})
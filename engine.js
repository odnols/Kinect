var tocando = false, indice_atual = 0

function get(alvo) {
    let elemento = document.getElementsByClassName(alvo)

    if (elemento.length < 1)
        elemento = document.getElementById(alvo)

    return elemento
}

function muda_som(indice) {

    const musics = ['tennis', 'football', 'baseball', 'golf', 'skiing', 'darts', 'store']
    const colors = ['greenyellow', 'red', 'rgb(0, 15, 151)', 'rgb(0, 183, 255)', 'orange', 'purple', 'gray']

    let tocador = get('sound')

    if (indice !== indice_atual) {
        if (!tocando) {

            tocador.volume = 1
            tocador.src = `source/${musics[indice]}.mp3`
            tocador.play()

            tocando = true
        } else {

            let tempo_atual = tocador.currentTime

            // Som atual movido para outra faixa
            let tocador2 = get('sound2')
            tocador2.volume = 1
            tocador2.src = tocador.src
            tocador2.currentTime = tempo_atual
            tocador2.play()

            // Som que está sendo iniciado
            tocador.volume = 0
            tocador.src = `source/${musics[indice]}.mp3`
            tocador.currentTime = tempo_atual
            tocador.play()

            // Iguala o som do novo e encerra o anterior
            regulariza_sons()
        }

        indice_atual = indice

        // Alterando a cor e o texto da música na tela
        get('filter').style.backgroundColor = colors[indice]
        get('currentSong').innerHTML = `${musics[indice]}.mp3`
    }
}

function regulariza_sons() {

    let tocador = get('sound')
    let tocador2 = get('sound2')

    setTimeout(() => {

        tocador.volume += 0.1
        tocador2.volume -= 0.1

        if (tocador2.volume > 0.1)
            regulariza_sons()
    }, 50)
}

// Começa a musica novamente
document.getElementById('sound').addEventListener("ended", function () {
    let tocador = get('sound')
    tocador.play()
})
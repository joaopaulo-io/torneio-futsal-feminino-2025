/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
   navToggle.addEventListener('click', () =>{
      navMenu.classList.add('show-menu')
   })
}

/* Menu hidden */
if(navClose){
   navClose.addEventListener('click', () =>{
      navMenu.classList.remove('show-menu')
   })
}

/*===== ACTIVE AND REMOVE MENU =====*/
const navLink = document.querySelectorAll('.nav__link');   

function linkAction(){
  /*Active link*/
  navLink.forEach(n => n.classList.remove('active'));
  this.classList.add('active');
  
  /*Remove menu mobile*/
  navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*=============== CLASSIFICAÇÃO JS ===============*/
let tabelaClassificacao = document.querySelector('.tabelaClassificacao')
let linhas = document.querySelectorAll('.corpoClassificacao tr')

exibirTabelaClassificacao('A')

function exibirTabelaClassificacao(letraGrupo) {
    // atualizar letra do grupo no index.html
    document.querySelector('.letra').innerHTML = letraGrupo

    // ler json das classificações
    fetch(`./arquivos-json/classificacaoGrupo${letraGrupo}.json`)
    .then( resposta => resposta.json() )
    .then( dados => {
        // ORDENAR OS DADOS DO ARRAY COM OBJETOS
        dados.sort(function compararNumeros(a, b) {
            return a.posicao - b.posicao
        })
        
        dados.forEach( (equipe, indice) => {
        
            // preencher os dados
            linhas[indice].innerHTML = `
                <td>${equipe.posicao}</td>
                <td>${equipe.equipe}</td>
                <td>${equipe.pontos}</td>
                <td>${equipe.jogos}</td>
                <td>${equipe.vitorias}</td>
                <td>${equipe.empates}</td>
                <td>${equipe.derrotas}</td>
                <td>${equipe.gols_pro}</td>
                <td>${equipe.gols_contra}</td>
                <td>${equipe.saldo_de_gols}</td>
            `
        })
    }
    )
}

// controlar a escolha da letra do grupo para exibir na tabela de classificação
let selectLetra = document.querySelector('.letrasDosGrupos')

// usar um escutador de eventos para a nossa cx select
selectLetra.addEventListener('change', (event) => {
    exibirTabelaClassificacao(event.target.value)
})

/*=============== JOGOS 1ª FASE JS ===============*/
let tabelaJogos = document.querySelector('.tableGames')

// ler o arquivo json
fetch('./arquivos-json/jogos-fase1.json')
.then( response => response.json() )
.then( data => data.forEach( jogo => {

    // criar uma linha de tabela, colocar ela na tabela
    let linha = document.createElement('div')
    tabelaJogos.appendChild(linha)

    // preencher os dados do jogo em cada linha da tabela
    linha.innerHTML = `
        <div class='table__title'>
          <h2>Torneio Feminino 2025</h2>
          <p>${jogo.estadio} / ${jogo.diaSemana}</p>
          <h3>${jogo.data} - ${jogo.hora}<h3>
        </div>

        <div class='container__departure'>
          <div class="container__team">
            <div class="alignment">
              <span class='team__name'>${jogo.equipe_mandante}</span>
              <img src="images/${jogo.escudo_mandante}">
            </div>
          </div>
          <div class='scoreboard'>
            <!---<span class='scoreboard'>${jogo.gols_mandante}</span>-->
            <span>X</span>
            <!---<span class='scoreboard'>${jogo.gols_visitante}</span>-->
          </div>
          <div class="container__team">
            <div class="alignment">
              <img src="images/${jogo.escudo_visitante}">
              <span class='team__name'>${jogo.equipe_visitante}</span>
            </div>
          </div>
        </div>

        <div class='table-games-button'>
          <button class='btn'>Grupo ${jogo.grupo}</button>
        </div>
    `
})
)
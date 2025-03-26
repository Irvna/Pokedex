const nome_pokemon = document.querySelector('.pokemon_nome');
const num_pokemon = document.querySelector('.pokemon_numero');
const img_pokemon = document.querySelector('.pokemon_img');

const form = document.querySelector('.form');
const input_search = document.querySelector('.input_search');
const voltar = document.querySelector('.voltar');
const proximo = document.querySelector('.proximo');

let id_atual = 1; /*o id do pokemon que esta no pokedex*/

/*Identifica qual o pokemon pesquisado na API*/
async function identificar (pokemon){
    /*await = faz a execução de uma função async pausar, para esperar pelo retorno da Promise*/
    const RespostaAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    /*fetch realiza uma solicitação em uma API com seus argumento*/
    /*toLowerCase() serve para transformar todas as letras em minusculos*/
    /*Extrair dados json, tomar JSON como entrada e analisá-lo para produzir um objeto JavaScript se os dados de pesquisa forem validos*/
    if(RespostaAPI.status == 200){
        const dados = await RespostaAPI.json(); 
        return dados;
    }
}

/*Renderiza/atualiza os dados desse pokemon no HTML*/
async function renderizar (pokemon){
    nome_pokemon.innerHTML = 'Carregando...';
    num_pokemon.innerHTML = '';

    const dado = await identificar(pokemon);

    if(dado){
        img_pokemon.style.display = 'block';
        nome_pokemon.innerHTML = dado.name;
        num_pokemon.innerHTML = dado.id;
        /*será usado cochetes pois ele n reconhece o traço (-) da geração*/
        img_pokemon.src = dado['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        id_atual = dado.id; /*Atualiza o id atual do pokemon*/
    }
    else{
        nome_pokemon.innerHTML = 'Não encontrado';
        num_pokemon.innerHTML = '';
        img_pokemon.style.display = 'none'; /*Escode a imagem*/
    }
    input_search.value = '';
}

/*Pegar o que foi digitado no input, submissão do formulário*/
function formulario(event){
    event.preventDefault(); /*Evita o recarregamento da página*/

    renderizar(input_search.value.toLowerCase());
}

//adiciona um evento do form
form.addEventListener('submit', formulario);

function botao_voltar(){
    if(id_atual > 1){
        id_atual -= 1;
        renderizar(id_atual);   
    }
}

function botao_proximo(){
    id_atual += 1;
    renderizar(id_atual);
}


renderizar(id_atual);

 

/* ASYNC
A palavra-chave async:
Quando usamos async antes de uma função, ela sempre retornará uma Promise automaticamente.

O await dentro da função:
O await pausa a execução da função até que a Promise seja resolvida, permitindo que trabalhemos com código assíncrono como se fosse síncrono.
*/
window.addEventListener('load', start);

// Declarando Variáveis Globais

// Itens pré cadastrados.
var globalNames = ['Um', 'Dois', 'Três', 'Quatro', 'Cinco'];
// Seletor da div 'names'
var names = document.querySelector('#registered');
// cria lista não ordenada
var ul = document.createElement('ul');
// seleciona campo de inserção de dados
var input = document.getElementById('input');
// seleciona formulário
var form = document.getElementById('form');
var isEditable = false;
var position;


// função que irá rodar assim que a página carregar
function start() {
     preventDefaultBehavior(form);
     applyFocus(input);
     catchKeypressedValues(input);
     shownValues();
}

// evita que a pégina precise ser recarregada quando adicionada um novo item.
function preventDefaultBehavior(Objeto) {
     Objeto.addEventListener('submit', function (event) {
          event.preventDefault();
     });
}


// aplica foco no input por default
function applyFocus(Objeto) {
     Objeto.focus();
}


function catchKeypressedValues(Objeto) {
     Objeto.addEventListener('keyup', function (event) {
     if (event.key === 'Enter') {
          // Obtendo conteudo digitado.
          var keyPressedValue = event.target.value;

          // Se algum valor tiver sido digitado, então editar ou inserir
          if (keyPressedValue) {
          if (isEditable) {
               // Editando valores
               globalNames.splice(position, 1, keyPressedValue);
               // Desativando modo de edição
               isEditable = false; 
          } else {
               // Inserindo valores
               globalNames.push(keyPressedValue); 
               // Inserindo no array GlobalNames
          }
          }

          shownValues(); 
          // Atualizar site e Exibir vetor com novo valor
     }
     });
}

function shownValues() {
     // Limpando conteudo da ul e input para receber novos valores
     ul.innerHTML = '';
     input.value = '';

     // Para cada posição do vetor, executar a função PercorrerVetor
     globalNames.forEach(readItems);
     names.appendChild(ul); // Adicionar ul na div nomes para ser exibida no site
}

function readItems(item) {
     var li = document.createElement('li');

     li.appendChild(createButton()); // Cria e adiciona o botão x na li
     li.appendChild(CriarSpan(item)); // Cria e adiciona o span na li
     ul.appendChild(li); // Adicionando li na ul
}

function createButton() {
     var botao = document.createElement('button');
     // Adicionando classe DeleteButton
     botao.classList.add('DeleteButton');
     botao.textContent = 'x'; // Adicionando conteúdo x

     // Retornando botão criado ao ponto de chamada desta função
     return botao;
}

function CriarSpan(valor) {
     var span = document.createElement('span');
     span.textContent = valor; // Adicionando o valor dentro do span
     span.classList.add('clicavel');
     span.addEventListener('click', EditarItem);
     // Retornando valor dentro do span
     return span;
}

function EditarItem(event) {
     // Capturando valor do elemento clicado
     var valor = event.target.innerHTML;

     var index = globalNames.indexOf(valor); // Identificando índice
     input.value = globalNames[index];
     applyFocus(input); // Aplicando Foco no Input
     isEditable = true;
     position = index;
}

// Deletando elementos da lista que forem clicados
ul.addEventListener('click', function (event) {
     // Realizar evento apenas quando o usário clicar no botão
     if (event.target.localName === 'button') {
     // Capturando valor do elemento clicado
     var valor = event.srcElement.nextElementSibling.innerHTML;

     // Deletando elemento de Global Names
     var index = globalNames.indexOf(valor); // Identificando índice
     globalNames.splice(index, 1);

     var ancestral = event.target.parentElement;
     ancestral.remove(); // Removendo elemento do site
     shownValues(); // Atualizar site e Exibir vetor com novo valor
     }
});
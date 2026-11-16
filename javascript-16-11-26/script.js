// ==========================================================
// Minhas Tarefas — projeto final de JavaScript
// O HTML e o CSS já estão prontos. Aqui a gente escreve o JS.
// ==========================================================

// ---------- Elementos da página (já selecionados) ----------
const saudacao = document.querySelector('#saudacao');
const contador = document.querySelector('#contador');
const btnNome = document.querySelector('#btn-nome');
const formTarefa = document.querySelector('#form-tarefa');
const inputTarefa = document.querySelector('#input-tarefa');
const mensagem = document.querySelector('#mensagem');
const filtro = document.querySelector('#filtro');
const lista = document.querySelector('#lista');

// ---------- Etapa 1: começamos aqui ----------

let tarefas = [
    { id: 1, todo: 'Revisar if e switch', completed: true },
    { id: 2, todo: 'Praticar eventos do DOM', completed: false },
    { id: 3, todo: 'Aprender POST, PUT e DELETE', completed: false }
];

function renderizar() {
    let html = '';

    for (const tarefa of tarefas) {
        html += `
            <li class="tarefa ${tarefa.completed ? 'concluida' : ''}">
                <span class="texto">${tarefa.todo}</span>
                <button class="btn-concluir" data-id="${tarefa.id}">${tarefa.completed ? 'Desfazer' : 'Concluir'}</button>
                <button class="btn-excluir" data-id="${tarefa.id}">Excluir</button>
            </li>
        `;
    }

    lista.innerHTML = html;
}

renderizar();

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

const preferencias = {
    nome: 'Visitante',
    filtro: 'todas'
};

function atualizarSaudacao() {
    const hora = new Date().getHours();
    let periodo;

    if (hora < 12) {
        periodo = 'Bom dia';
    } else if (hora < 18) {
        periodo = 'Boa tarde';
    } else {
        periodo = 'Boa noite';
    }

    saudacao.textContent = `${periodo}, ${preferencias.nome}!`;
}

function filtrarTarefas() {
    switch (preferencias.filtro) {
        case 'pendentes':
            return tarefas.filter((tarefa) => !tarefa.completed);
        case 'concluidas':
            return tarefas.filter((tarefa) => tarefa.completed);
        default:
            return tarefas;
    }
}

function atualizarContador() {
    const total = tarefas.length;
    const concluidas = tarefas.filter((tarefa) => tarefa.completed).length;
    const porcentagem = total === 0 ? 0 : Math.round(concluidas / total * 100);

    contador.textContent = `${concluidas} de ${total} concluídas (${porcentagem}%)`;
}

function renderizar() {
    let html = '';

    for (const tarefa of filtrarTarefas()) {
        const texto = document.createElement('span');
        texto.textContent = tarefa.todo;
        html += `
            <li class="tarefa ${tarefa.completed ? 'concluida' : ''}">
                <span class="texto">${texto.innerHTML}</span>
                <button class="btn-concluir" data-id="${tarefa.id}">${tarefa.completed ? 'Desfazer' : 'Concluir'}</button>
                <button class="btn-excluir" data-id="${tarefa.id}">Excluir</button>
            </li>
        `;
    }

    lista.innerHTML = html;
    atualizarContador();
}

function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = 'mensagem ' + tipo;
}

function adicionarTarefa(texto) {
    if (texto === '') {
        mostrarMensagem('Digite uma tarefa.', 'erro');
        return;
    }

    tarefas.push({
        id: Date.now(),
        todo: texto,
        completed: false
    });

    inputTarefa.value = '';
    mostrarMensagem('Tarefa adicionada!', 'sucesso');
    renderizar();
}

function alternarTarefa(id) {
    const tarefa = tarefas.find((tarefa) => tarefa.id === id);

    if (tarefa) {
        tarefa.completed = !tarefa.completed;
        renderizar();
    }
}

function excluirTarefa(id) {
    tarefas = tarefas.filter((tarefa) => tarefa.id !== id);
    renderizar();
}

filtro.addEventListener('change', () => {
    preferencias.filtro = filtro.value;
    renderizar();
});

formTarefa.addEventListener('submit', (event) => {
    event.preventDefault();
    const texto = inputTarefa.value.trim();
    adicionarTarefa(texto);
});

lista.addEventListener('click', (event) => {
    const botao = event.target;
    const id = Number(botao.dataset.id);

    if (botao.classList.contains('btn-concluir')) {
        alternarTarefa(id);
    } else if (botao.classList.contains('btn-excluir')) {
        excluirTarefa(id);
    }
});

atualizarSaudacao();
renderizar();

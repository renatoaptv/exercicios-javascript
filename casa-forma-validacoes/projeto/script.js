// Cada produto começa sem estar marcado como favorito.
let produtos = [
  { id: 1, nome: "Luminária de mesa", preco: 49.99, categoria: "Iluminação", imagem: "assets/luminaria.webp", favorito: false },
  { id: 2, nome: "Vaso para plantas", preco: 14.99, categoria: "Decoração", imagem: "assets/vaso.webp", favorito: false },
  { id: 3, nome: "Cadeira de escritório", preco: 499.99, categoria: "Móveis", imagem: "assets/cadeira.webp", favorito: false }
];

function formatarPreco(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}

const titulo = document.querySelector("#titulo");
const campoTitulo = document.querySelector("#novo-titulo");
const botaoAlterar = document.querySelector("#alterar-titulo");
const mensagemTitulo = document.querySelector("#mensagem-titulo");
const colecao = document.querySelector("#colecao");
const botaoDestaque = document.querySelector("#alternar-destaque");

botaoAlterar.addEventListener("click", () => {
  const novoTitulo = campoTitulo.value.trim();
  campoTitulo.classList.remove("invalido");
  campoTitulo.removeAttribute("aria-invalid");
  mensagemTitulo.classList.remove("erro", "sucesso");

  if (novoTitulo === "") {
    campoTitulo.classList.add("invalido");
    campoTitulo.setAttribute("aria-invalid", "true");
    mensagemTitulo.textContent = "Digite um título para a coleção.";
    mensagemTitulo.classList.add("erro");
    return;
  }

  titulo.textContent = novoTitulo;
  salvarColecao();
  mensagemTitulo.textContent = "Título atualizado.";
  mensagemTitulo.classList.add("sucesso");
});

botaoDestaque.addEventListener("click", () => {
  colecao.classList.toggle("destaque");

  if (colecao.classList.contains("destaque")) {
    botaoDestaque.textContent = "Retirar destaque ↗";
  } else {
    botaoDestaque.textContent = "Destacar coleção ↗";
  }
});

const lista = document.querySelector("#lista-produtos");
const quantidade = document.querySelector("#quantidade");
const totalElemento = document.querySelector("#total");
const avisoVazio = document.querySelector("#aviso-vazio");
const campoOrdem = document.querySelector("#ordem");
const quantidadeFavoritos = document.querySelector("#quantidade-favoritos");
const resumoValorFavoritos = document.querySelector("#resumo-valor-favoritos");
const totalFavoritos = document.querySelector("#total-favoritos");
const campoBusca = document.querySelector("#busca");

// A busca acontece em tempo real, sem alterar a coleção original.
document.querySelector("#area-busca").hidden = false;
// Os botões permitem mostrar todas as peças ou apenas uma categoria.
let filtroCategoria = "Todas";
const filtrosCategoria = document.querySelectorAll(".filtro");
document.querySelector("#filtros-categoria").hidden = false;

filtrosCategoria.forEach((botao) => {
  botao.addEventListener("click", () => {
    filtroCategoria = botao.dataset.categoria;

    filtrosCategoria.forEach((filtro) => {
      const ativo = filtro === botao;
      filtro.classList.toggle("ativo", ativo);
      filtro.setAttribute("aria-pressed", String(ativo));
    });

    renderizarProdutos();
  });
});

campoBusca.addEventListener("input", () => {
  salvarBuscaDaAba();
  renderizarProdutos();
});

// Combina a pesquisa pelo nome com a categoria escolhida.
function obterProdutosVisiveis() {
  const busca = campoBusca.value.trim().toLocaleLowerCase("pt-BR");

  return produtos.filter((produto) => {
    const correspondeNome = produto.nome.toLocaleLowerCase("pt-BR").includes(busca);
    const correspondeCategoria = filtroCategoria === "Todas" || produto.categoria === filtroCategoria;
    return correspondeNome && correspondeCategoria;
  });
}

function aplicarOrdenacao() {
  if (campoOrdem.value === "crescente") {
    produtos.sort((a, b) => a.preco - b.preco);
  } else if (campoOrdem.value === "decrescente") {
    produtos.sort((a, b) => b.preco - a.preco);
  } else if (campoOrdem.value === "nome") {
    produtos.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
  } else {
    produtos.sort((a, b) => a.id - b.id);
  }
}

function renderizarProdutos() {
  aplicarOrdenacao();
  const produtosVisiveis = obterProdutosVisiveis();
  lista.textContent = "";

  produtosVisiveis.forEach((produto) => {
    const item = document.createElement("li");
    const imagem = document.createElement("img");
    const categoria = document.createElement("p");
    const nome = document.createElement("h3");
    const preco = document.createElement("p");
    const acoes = document.createElement("div");
    const botao = document.createElement("button");

    item.classList.add("produto");
    if (produto.favorito) {
      item.classList.add("produto-favorito");
    }
    item.dataset.id = produto.id;
    imagem.classList.add("produto-imagem");
    imagem.src = produto.imagem;
    imagem.alt = produto.nome;
    categoria.classList.add("produto-categoria");
    categoria.textContent = produto.categoria;
    nome.classList.add("produto-nome");
    nome.textContent = produto.nome;
    preco.classList.add("produto-preco");
    preco.textContent = formatarPreco(produto.preco);
    acoes.classList.add("produto-acoes");
    botao.classList.add("acao-produto");
    botao.type = "button";
    botao.textContent = "Remover";
    botao.dataset.id = produto.id;
    botao.setAttribute("aria-label", "Remover " + produto.nome);
    botao.addEventListener("click", removerProduto);

    // O ID do cartão identifica qual produto será editado.
    const botaoEditar = document.createElement("button");
    botaoEditar.classList.add("acao-produto", "botao-editar");
    botaoEditar.type = "button";
    botaoEditar.dataset.id = produto.id;
    botaoEditar.textContent = "Editar";
    botaoEditar.setAttribute("aria-label", "Editar " + produto.nome);
    botaoEditar.addEventListener("click", editarProduto);

    // Botão de favoritar e desfavoritar.
    const botaoFavorito = document.createElement("button");
    botaoFavorito.classList.add("acao-produto", "botao-favorito");
    botaoFavorito.type = "button";
    botaoFavorito.dataset.id = produto.id;
    botaoFavorito.textContent = produto.favorito ? "Desfavoritar" : "Favoritar";
    botaoFavorito.setAttribute("aria-pressed", String(produto.favorito));
    botaoFavorito.addEventListener("click", alternarFavorito);

    acoes.appendChild(botaoFavorito);
    acoes.appendChild(botaoEditar);
    acoes.appendChild(botao);
    item.appendChild(imagem);
    item.appendChild(categoria);
    item.appendChild(nome);
    item.appendChild(preco);
    item.appendChild(acoes);
    lista.appendChild(item);
  });

  const total = produtos.reduce((acumulador, produto) => {
    return acumulador + produto.preco;
  }, 0);

  quantidade.textContent = produtos.length;
  totalElemento.textContent = formatarPreco(total);

  // Diferencia a coleção sem produtos de uma busca sem resultados.
  avisoVazio.hidden = produtosVisiveis.length > 0;
  if (produtosVisiveis.length === 0) {
    avisoVazio.textContent = produtos.length === 0
      ? "Sua coleção está vazia. Adicione uma peça para começar."
      : "Nenhuma peça encontrada para esta busca. Tente outro nome.";
  }

  // Conta os produtos que estão favoritos.
  const favoritos = produtos.filter((produto) => produto.favorito);
  quantidadeFavoritos.textContent = favoritos.length;

  // Soma o preço dos favoritos.
  const valorFavoritos = favoritos.reduce((soma, produto) => soma + produto.preco, 0);
  resumoValorFavoritos.hidden = false;
  totalFavoritos.textContent = formatarPreco(valorFavoritos);
}

function alternarFavorito(evento) {
  const id = Number(evento.currentTarget.dataset.id);
  const produto = produtos.find((item) => item.id === id);

  if (produto) {
    produto.favorito = !produto.favorito;
    renderizarProdutos();
    salvarColecao();
  }
}

function removerProduto(evento) {
  const id = Number(evento.currentTarget.dataset.id);

  produtos = produtos.filter((produto) => {
    return produto.id !== id;
  });

  // Se o produto aberto no formulário foi removido, sai da edição.
  if (idEmEdicao === id) {
    finalizarFormulario();
  }

  renderizarProdutos();
  salvarColecao();
}

// Usa um ID novo a cada cadastro, inclusive após remover produtos.
let proximoId = Math.max(0, ...produtos.map((produto) => produto.id)) + 1;

// null = cadastro de um produto novo; número = ID do produto em edição.
let idEmEdicao = null;

// Os IDs abaixo são os mesmos que o professor colocou no index.html.
const formulario = document.querySelector("#formulario");
const campoNome = document.querySelector("#nome");
const campoPreco = document.querySelector("#preco");
const campoCategoria = document.querySelector("#categoria");
const mensagemProduto = document.querySelector("#mensagem");
const contadorNome = document.querySelector("#contador-nome");
const tituloFormulario = document.querySelector("#titulo-formulario");
const botaoSalvarProduto = document.querySelector("#salvar-produto");
const botaoCancelarEdicao = document.querySelector("#cancelar-edicao");
const textoOriginalBotao = botaoSalvarProduto.innerHTML;

// Persistência da coleção no navegador (conteúdo da aula).
const CHAVE_COLECAO = "casa-forma-09-11-colecao";
const mensagemArmazenamento = document.querySelector("#mensagem-armazenamento");
const tituloInicial = titulo.textContent;

// Evita carregar dados incompletos ou corrompidos no catálogo.
function validarColecao(dados) {
  if (!dados || typeof dados !== "object" || !Array.isArray(dados.produtos)) {
    throw new Error("A coleção precisa ter uma lista de produtos.");
  }

  if (typeof dados.titulo !== "string" || !dados.titulo.trim()) {
    throw new Error("O título da coleção é inválido.");
  }

  if (!Number.isSafeInteger(dados.proximoId) || dados.proximoId < 1) {
    throw new Error("O próximo ID da coleção é inválido.");
  }

  const ids = new Set();
  let maiorId = 0;
  for (const produto of dados.produtos) {
    if (!produto || !Number.isSafeInteger(produto.id) || produto.id < 1 ||
        ids.has(produto.id) || typeof produto.nome !== "string" ||
        !produto.nome.trim() || !Number.isFinite(produto.preco) ||
        produto.preco < 0.01 || typeof produto.categoria !== "string" ||
        typeof produto.imagem !== "string" || typeof produto.favorito !== "boolean") {
      throw new Error("Há um produto inválido na coleção salva.");
    }
    ids.add(produto.id);
    maiorId = Math.max(maiorId, produto.id);
  }

  if (dados.proximoId <= maiorId) {
    throw new Error("O próximo ID deve ser maior que os IDs existentes.");
  }
}

function salvarColecao() {
  try {
    const dados = { produtos: produtos, titulo: titulo.textContent, proximoId: proximoId };
    const texto = JSON.stringify(dados);
    localStorage.setItem(CHAVE_COLECAO, texto);
    mensagemArmazenamento.textContent = "";
    mensagemArmazenamento.classList.remove("erro");
  } catch (error) {
    mensagemArmazenamento.textContent = "A alteração aparece na tela, mas não foi salva neste navegador.";
    mensagemArmazenamento.classList.add("erro");
    console.warn(error.message);
  }
}

function carregarColecao() {
  try {
    const texto = localStorage.getItem(CHAVE_COLECAO);
    if (texto === null) return;

    const dados = JSON.parse(texto);
    validarColecao(dados);

    produtos = dados.produtos;
    if (dados.titulo !== tituloInicial) {
      titulo.textContent = dados.titulo;
    }
    proximoId = dados.proximoId;
  } catch (error) {
    mensagemArmazenamento.textContent = "Não foi possível recuperar a coleção salva. A coleção inicial foi aberta.";
    mensagemArmazenamento.classList.add("erro");
    console.warn(error.message);
  }
}

// Guarda o texto da pesquisa somente durante a sessão da aba.
const CHAVE_BUSCA = "casa-forma-09-11-busca";

function salvarBuscaDaAba() {
  try {
    sessionStorage.setItem(CHAVE_BUSCA, campoBusca.value);
  } catch (error) {
    console.warn("Não foi possível recuperar a busca desta aba.", error.message);
  }
}

function atualizarContadorNome() {
  const caracteres = campoNome.value.length;
  contadorNome.textContent = caracteres + (caracteres === 1 ? " caractere" : " caracteres");
}

// Mostra o erro no campo e encerra o cadastro.
function mostrarErro(campo, texto) {
  campo.classList.add("invalido");
  campo.setAttribute("aria-invalid", "true");
  campo.setCustomValidity(texto);
  mensagemProduto.textContent = texto;
  mensagemProduto.classList.remove("sucesso");
  mensagemProduto.classList.add("erro");
  campo.focus();
  campo.reportValidity();
}

function limparErros() {
  [campoNome, campoPreco, campoCategoria].forEach((campo) => {
    campo.classList.remove("invalido");
    campo.removeAttribute("aria-invalid");
    campo.setCustomValidity("");
  });
  mensagemProduto.classList.remove("erro", "sucesso");
  mensagemProduto.textContent = "";
}

// Devolve o formulário ao modo cadastro, sem modificar o array produtos.
function finalizarFormulario() {
  idEmEdicao = null;
  formulario.reset();
  limparErros();
  atualizarContadorNome();
  tituloFormulario.textContent = "Uma nova peça";
  botaoSalvarProduto.innerHTML = textoOriginalBotao;
  botaoCancelarEdicao.hidden = true;
}

// Usa o ID, e não a posição no array: ordenar não troca o produto editado.
function editarProduto(evento) {
  const id = Number(evento.currentTarget.dataset.id);
  const produto = produtos.find((item) => item.id === id);

  // Pode ter sido removido antes de o botão ser acionado.
  if (!produto) return;

  idEmEdicao = produto.id;
  campoNome.value = produto.nome;
  campoPreco.value = String(produto.preco);
  campoCategoria.value = produto.categoria;
  limparErros();
  atualizarContadorNome();
  tituloFormulario.textContent = "Editar peça";
  botaoSalvarProduto.textContent = "Salvar alterações";
  botaoCancelarEdicao.hidden = false;
  campoNome.focus();
}

function salvarProduto(evento) {
  // Não deixa o envio do formulário recarregar a página.
  evento.preventDefault();

  // trim() elimina os espaços no começo e no final do nome.
  const nome = campoNome.value.trim();
  // Number() transforma o texto digitado em número.
  const precoTexto = campoPreco.value.trim();
  const preco = Number(precoTexto.replace(",", "."));
  const categoria = campoCategoria.value;

  limparErros();

  if (nome.length < 2) {
    mostrarErro(campoNome, "Digite um nome com pelo menos 2 caracteres.");
    return;
  }

  // Number("") é 0. Por isso testamos o campo vazio também.
  // Rejeitamos zero, negativos, valores abaixo de R$ 0,01 e infinito.
  if (precoTexto === "" || !Number.isFinite(preco) || preco < 0.01) {
    mostrarErro(campoPreco, "Informe um preço válido de pelo menos R$ 0,01.");
    return;
  }

  if (categoria === "") {
    mostrarErro(campoCategoria, "Selecione uma categoria.");
    return;
  }

  const estavaEditando = idEmEdicao !== null;

  if (estavaEditando) {
    const produto = produtos.find((item) => item.id === idEmEdicao);
    if (!produto) {
      finalizarFormulario();
      mensagemProduto.textContent = "Produto não encontrado. Edição encerrada.";
      mensagemProduto.classList.add("erro");
      return;
    }

    // Atualiza apenas os dados editáveis, preservando ID, imagem e favorito.
    produto.nome = nome;
    produto.preco = preco;
    produto.categoria = categoria;
  } else {
    produtos.push({
      id: proximoId,
      nome: nome,
      preco: preco,
      categoria: categoria,
      imagem: "assets/nova-peca.svg",
      favorito: false
    });
    proximoId += 1;
  }

  // Mantém a ordenação, os favoritos e os totais atualizados.
  renderizarProdutos();
  salvarColecao();

  // Prepara o formulário para um novo cadastro.
  finalizarFormulario();
  mensagemProduto.textContent = estavaEditando
    ? "Produto atualizado com sucesso!"
    : "Produto cadastrado com sucesso!";
  mensagemProduto.classList.add("sucesso");
  campoNome.focus();
}

formulario.addEventListener("submit", salvarProduto);
botaoCancelarEdicao.addEventListener("click", () => {
  // Cancelar limpa os erros e encerra a edição, mas não salva alterações.
  finalizarFormulario();
  campoNome.focus();
});
// A atualização acontece a cada caractere digitado.
campoNome.addEventListener("input", () => {
  campoNome.classList.remove("invalido");
  campoNome.removeAttribute("aria-invalid");
  campoNome.setCustomValidity("");
  atualizarContadorNome();
});
[campoPreco, campoCategoria].forEach((campo) => {
  campo.addEventListener("input", () => {
    campo.classList.remove("invalido");
    campo.removeAttribute("aria-invalid");
    campo.setCustomValidity("");
  });
});

campoOrdem.addEventListener("change", renderizarProdutos);
carregarColecao();
renderizarProdutos();


// Atividade de Promises: consulta à API sem alterar os produtos da Casa Forma.
const URL_PRODUTOS = "https://dummyjson.com/products";
const URL_PRODUTOS_ERRO = "https://dummyjson.com/products/0";

const botaoBuscarApi = document.querySelector("#buscar-produtos-api");
const botaoErroApi = document.querySelector("#testar-erro-api");
const botaoOrdemJs = document.querySelector("#demonstrar-ordem-js");
const listaProdutosApi = document.querySelector("#lista-produtos-api");
const statusApi = document.querySelector("#status-api");
const ordemExecucaoJs = document.querySelector("#ordem-execucao-js");

// Retorna a cadeia de Promises, verifica o status HTTP e imprime os nomes com forEach.
function listarNomesComThen(url) {
  botaoBuscarApi.disabled = true;
  botaoErroApi.disabled = true;
  listaProdutosApi.replaceChildren();
  ordemExecucaoJs.hidden = true;
  statusApi.classList.remove("erro", "sucesso");
  statusApi.textContent = "Consultando os produtos...";

  return fetch(url)
    .then((resposta) => {
      if (!resposta.ok) {
        throw new Error("Falha HTTP " + resposta.status);
      }
      return resposta.json();
    })
    .then((dados) => {
      if (!Array.isArray(dados.products)) {
        throw new Error("A resposta não contém uma lista de produtos.");
      }

      dados.products.forEach((produto) => {
        console.log(produto.title);
        const item = document.createElement("li");
        item.textContent = produto.title;
        listaProdutosApi.appendChild(item);
      });

      statusApi.textContent = dados.products.length + " produtos recebidos com sucesso.";
      statusApi.classList.add("sucesso");
      return dados;
    })
    .catch((erro) => {
      console.error("Erro na consulta:", erro.message);
      statusApi.textContent = "Erro na consulta: " + erro.message;
      statusApi.classList.add("erro");
      return null;
    })
    .finally(() => {
      botaoBuscarApi.disabled = false;
      botaoErroApi.disabled = false;
    });
}

// Teste da URL válida e teste de falha, como proposto na atividade.
botaoBuscarApi.addEventListener("click", () => listarNomesComThen(URL_PRODUTOS));
botaoErroApi.addEventListener("click", () => listarNomesComThen(URL_PRODUTOS_ERRO));

// Demonstra a ordem: síncrono > microtarefas das Promises > setTimeout.
botaoOrdemJs.addEventListener("click", () => {
  listaProdutosApi.replaceChildren();
  ordemExecucaoJs.replaceChildren();
  ordemExecucaoJs.hidden = false;
  statusApi.textContent = "Veja abaixo a ordem de execução.";
  statusApi.classList.remove("erro", "sucesso");

  function registrar(texto) {
    console.log(texto);
    const item = document.createElement("li");
    item.textContent = texto;
    ordemExecucaoJs.appendChild(item);
  }

  registrar("Início do código síncrono");

  setTimeout(() => registrar("Callback do setTimeout com atraso zero"), 0);

  Promise.resolve().then(() => registrar("Callback da Promise (.then)"));

  registrar("Fim do código síncrono");
});

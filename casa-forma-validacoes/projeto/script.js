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
  lista.textContent = "";

  produtos.forEach((produto) => {
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

    // Botão de favoritar e desfavoritar.
    const botaoFavorito = document.createElement("button");
    botaoFavorito.classList.add("acao-produto", "botao-favorito");
    botaoFavorito.type = "button";
    botaoFavorito.dataset.id = produto.id;
    botaoFavorito.textContent = produto.favorito ? "Desfavoritar" : "Favoritar";
    botaoFavorito.setAttribute("aria-pressed", String(produto.favorito));
    botaoFavorito.addEventListener("click", alternarFavorito);

    acoes.appendChild(botaoFavorito);
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
  avisoVazio.hidden = produtos.length > 0;
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
  }
}

function removerProduto(evento) {
  const id = Number(evento.currentTarget.dataset.id);

  produtos = produtos.filter((produto) => {
    return produto.id !== id;
  });

  renderizarProdutos();
}

// Usa um ID novo a cada cadastro, inclusive após remover produtos.
let proximoId = Math.max(0, ...produtos.map((produto) => produto.id)) + 1;

// Os IDs abaixo são os mesmos que o professor colocou no index.html.
const formulario = document.querySelector("#formulario");
const campoNome = document.querySelector("#nome");
const campoPreco = document.querySelector("#preco");
const campoCategoria = document.querySelector("#categoria");
const mensagemProduto = document.querySelector("#mensagem");
const contadorNome = document.querySelector("#contador-nome");

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

  produtos.push({
    id: proximoId,
    nome: nome,
    preco: preco,
    categoria: categoria,
    imagem: "assets/nova-peca.svg",
    favorito: false
  });
  proximoId += 1;

  // Mantém a ordenação, os favoritos e os totais atualizados.
  renderizarProdutos();

  // Prepara o formulário para um novo cadastro.
  formulario.reset();
  atualizarContadorNome();
  mensagemProduto.textContent = "Produto cadastrado com sucesso!";
  mensagemProduto.classList.add("sucesso");
  campoNome.focus();
}

formulario.addEventListener("submit", salvarProduto);
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
renderizarProdutos();

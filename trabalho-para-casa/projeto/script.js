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

campoOrdem.addEventListener("change", renderizarProdutos);

renderizarProdutos();

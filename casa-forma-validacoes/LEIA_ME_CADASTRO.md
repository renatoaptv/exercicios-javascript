# Casa Forma — Cadastro de produtos (nova aula)

Esta é uma cópia separada da atividade de favoritos, que continua intacta no GitHub.

## Como testar
1. Abra `projeto/index.html` no navegador.
2. Preencha nome, preço e categoria, e clique em **Cadastrar produto**.
3. O novo item aparece na coleção, com botão **Favoritar** e **Remover**.
4. Teste ordenar por preço/nome, favoritar o novo item e removê-lo.
5. Recarregar a página reinicia os produtos, pois os dados ficam apenas na memória.

## Entendendo a nova função
- `document.querySelector()` encontra o formulário e seus campos no HTML.
- `addEventListener("submit", salvarProduto)` chama `salvarProduto()` no envio.
- `preventDefault()` evita o recarregamento do formulário.
- `trim()` tira espaços extras do nome; `Number()` converte o preço.
- `if` verifica nome, preço e categoria antes de cadastrar.
- `produtos.push({...})` coloca o novo produto no array, com ID único e `favorito: false`.
- `renderizarProdutos()` reconstrói os cartões e recalcula as quantidades e somas.

O arquivo `EXPLICACAO.md` foi mantido como na atividade anterior.

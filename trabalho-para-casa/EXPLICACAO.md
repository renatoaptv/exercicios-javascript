# EXPLICAÇÃO — TRABALHO PARA CASA
Coloquei `favorito: false` nos três produtos para começar com nenhum favorito.
Criei um botão em cada cartão, com o ID do produto guardado em `dataset.id`.
Quando clico, a função pega esse ID e usa `find()` para localizar a peça.
O `!` troca o valor de `favorito` entre `true` e `false`.
Depois chamo `renderizarProdutos()` para atualizar o botão e o destaque.
Uso `filter()` e `length` para mostrar quantos produtos estão favoritos.
No desafio opcional, uso `reduce()` para somar os preços e `formatarPreco()` para exibir o total.

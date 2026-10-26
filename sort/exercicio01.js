// Exercício: ordenar os produtos do menor para o maior preço.
// Depois, mostrar apenas os nomes usando forEach().

const produtos = [
    { nome: "Mouse", preco: 707 },
    { nome: "Teclado", preco: 375 },
    { nome: "Headset", preco: 222 }
];

// Em ordem crescente: subtrair o preço do segundo do primeiro.
produtos.sort((a, b) => a.preco - b.preco);

// Percorrer os produtos já ordenados e mostrar seus nomes.
produtos.forEach((produto) => {
    console.log(produto.nome);
});

// Saída:
// Headset
// Teclado
// Mouse

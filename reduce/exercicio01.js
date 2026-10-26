// Exercício 01: somar notas e calcular a média com reduce()
const notas = [7, 8, 9];

const soma = notas.reduce((acumulador, valorAtual) => {
    return acumulador + valorAtual;
});

const media = soma / notas.length;

console.log(soma);  // 24
console.log(media); // 8

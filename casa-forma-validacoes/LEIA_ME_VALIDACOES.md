# Casa Forma — Aula de validação do cadastro

Esta versão usa os IDs do HTML que o professor mandou para a turma: `#formulario`, `#nome`, `#preco`, `#categoria`, `#contador-nome` e `#mensagem`.

## O que foi acrescentado no JavaScript
1. `preventDefault()` evita que o formulário recarregue a página no envio (inclusive com Enter).
2. `trim()` remove espaços antes/depois do nome.
3. `Number()` converte o preço e `Number.isFinite()` rejeita infinito e números inválidos.
4. Se o preço for vazio, zero, negativo ou abaixo de R$ 0,01, `mostrarErro()` marca o campo e impede o cadastro.
5. Quando cadastra, `push()` adiciona a peça com ID único e `favorito: false`.
6. `renderizarProdutos()` mantém favoritos, somas, cartões e ordenação atualizados.
7. `formulario.reset()` limpa o formulário; `atualizarContadorNome()` volta para 0; `campoNome.focus()` devolve o foco.

## Roteiro de testes pedido pelo professor
- Deixe o preço vazio e tente cadastrar: deve aparecer erro no campo.
- Teste preços `0`, `-1`, `0.005` e um valor muito grande (`1e309`, quando o navegador permitir): não devem cadastrar.
- Pressione **Enter** no formulário com dados válidos: deve adicionar a peça sem recarregar a página.
- Cadastre `  Mesa lateral  ` (com espaços) na categoria **Móveis**: deve aparecer `Mesa lateral`.
- Selecione **Maior preço primeiro** e cadastre outra peça: a ordenação deve continuar correta.
- Favorite uma peça antes de cadastrar outra: ela deve permanecer favorita.
- Após cadastrar, verifique o formulário vazio, o contador `0 caracteres` e o foco no campo de nome.

**Observação:** o catálogo só guarda os produtos enquanto a página estiver aberta. Recarregar a página reinicia os dados.

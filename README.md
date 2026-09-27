# Controle de Despesas

Aplicação desenvolvida em React Native com Expo para gerenciamento de despesas pessoais.

O projeto foi desenvolvido como atividade da disciplina de Desenvolvimento para Dispositivos Móveis II, com o objetivo de aplicar na prática os principais conceitos estudados em aula, como componentes, estados, navegação, Context API, AsyncStorage, integração com API REST, Axios e operações CRUD.

---

## Objetivo

O objetivo da aplicação é permitir que o usuário registre e acompanhe suas despesas de forma simples.

A aplicação permite:

- Realizar login;
- Manter a sessão do usuário salva;
- Visualizar um resumo das despesas;
- Cadastrar novas despesas;
- Listar despesas cadastradas;
- Editar despesas;
- Excluir despesas;
- Filtrar despesas por categoria;
- Visualizar o total das despesas;
- Visualizar a quantidade de despesas cadastradas;
- Encerrar a sessão por meio do logout.

---

## Funcionalidades

### Login

A aplicação possui uma tela de autenticação.

Para fins acadêmicos, foi utilizado um usuário de teste:

- E-mail: aluno@controle.com
- Senha: Controle@2026

Após o login, a sessão é armazenada utilizando o AsyncStorage.

Assim, caso a aplicação seja atualizada ou aberta novamente, o usuário permanece autenticado até realizar o logout.

---

### Tela inicial

A tela inicial apresenta um pequeno resumo financeiro contendo:

- Valor total das despesas;
- Quantidade de despesas cadastradas;
- Botão para visualizar as despesas;
- Botão para cadastrar uma nova despesa;
- Botão para sair da aplicação.

---

### Cadastro de despesas

O usuário pode cadastrar uma nova despesa informando:

- Descrição;
- Valor;
- Categoria.

A data é adicionada automaticamente no momento do cadastro.

Antes de salvar, a aplicação verifica se todos os campos foram preenchidos.

---

### Listagem de despesas

As despesas cadastradas são recuperadas da API e exibidas utilizando o componente FlatList.

Cada despesa apresenta:

- Descrição;
- Categoria;
- Data;
- Valor;
- Botão para editar;
- Botão para excluir.

---

### Edição

Ao selecionar a opção Editar, os dados da despesa são carregados no formulário.

O usuário pode modificar os dados e salvar novamente.

A alteração é enviada para a API utilizando uma requisição HTTP PUT.

---

### Exclusão

A aplicação permite excluir uma despesa cadastrada.

Antes da exclusão é apresentada uma mensagem de confirmação.

Após a confirmação, o registro é removido da API utilizando uma requisição HTTP DELETE.

---

### Filtro por categoria

As categorias são identificadas automaticamente a partir das despesas cadastradas.

O usuário pode utilizar uma lista suspensa para selecionar uma categoria.

Exemplos:

- Todas;
- Alimentação;
- Transporte;
- Vestuário;
- Outras categorias cadastradas pelo usuário.

Ao selecionar uma categoria, somente as despesas correspondentes são apresentadas.

O total também é recalculado de acordo com o filtro escolhido.

---

## CRUD

A aplicação implementa as quatro operações básicas de um CRUD:

| Operação | Método HTTP | Função                |
|----------|-------------|-----------------------|
| Create   | POST        | Cadastrar uma despesa |
| Read     | GET         | Listar despesas       |
| Update   | PUT         | Editar uma despesa    |
| Delete   | DELETE      | Excluir uma despesa   |

---

## Tecnologias utilizadas

- JavaScript;
- React;
- React Native;
- Expo;
- React Navigation;
- Axios;
- AsyncStorage;
- MockAPI;
- React Native Picker.

---

## Principais conceitos utilizados

Durante o desenvolvimento foram utilizados os seguintes conceitos:

- Componentes React;
- JSX;
- Props;
- useState;
- useEffect;
- useContext;
- useCallback;
- useFocusEffect;
- Context API;
- AsyncStorage;
- Navegação Stack;
- Navegação condicional;
- async/await;
- try/catch/finally;
- API REST;
- Axios;
- FlatList;
- Picker;
- map();
- filter();
- reduce();
- Validação de formulários;
- Renderização condicional.

---

## API

Para armazenar as despesas foi utilizado o MockAPI.

Endpoint utilizado:

https://6ab95f3df84897980b72911d.mockapi.io/expenses

Exemplo de registro:

{
  "descricao": "Supermercado",
  "valor": 200,
  "categoria": "Alimentação",
  "data": "27/09/2026",
  "id": "3"
}

---

## Estrutura do projeto

controle_despesas
│
├── App.js
├── index.js
├── package.json
│
└── src
    │
    ├── components
    │   └── ExpenseItem.js
    │
    ├── contexts
    │   └── AuthContext.js
    │
    ├── navigation
    │   ├── AppNavigator.js
    │   ├── AuthNavigator.js
    │   └── RootNavigator.js
    │
    ├── screens
    │   ├── ExpenseFormScreen.js
    │   ├── ExpensesListScreen.js
    │   ├── HomeScreen.js
    │   └── LoginScreen.js
    │
    ├── services
    │   ├── api.js
    │   ├── authApi.js
    │   └── expensesApi.js
    │
    └── utils
        └── validators.js

---

## Organização da aplicação

A aplicação foi dividida em diferentes responsabilidades.

### screens

Contém as telas utilizadas pelo usuário.

### components

Contém componentes reutilizáveis, como o item utilizado para apresentar cada despesa.

### services

Responsável pela comunicação com a API utilizando Axios.

### navigation

Responsável pela navegação entre as telas.

### contexts

Responsável pelo gerenciamento da autenticação e compartilhamento do estado da sessão.

### utils

Destinado a funções auxiliares e validações.

---

## Instalação

Após baixar o projeto, execute:

npm install

Caso seja necessário instalar as dependências utilizadas no projeto:

npm install axios

npm install @react-navigation/native

npm install @react-navigation/native-stack

npx expo install react-native-screens react-native-safe-area-context

npx expo install @react-native-async-storage/async-storage

npx expo install @react-native-picker/picker

npx expo install react-native-web

---

## Executando o projeto

Para iniciar:

npm start

ou:

npx expo start

Após iniciar o Expo:

- Pressione w para executar no navegador;
- Utilize o QR Code com Expo Go para testar em dispositivo móvel compatível.

---

## Fluxo básico da aplicação

Login
  |
  v
Autenticação
  |
  v
Home
  |
  |-- Ver Despesas
  |     |
  |     |-- Filtrar
  |     |-- Editar
  |     `-- Excluir
  |
  |-- Nova Despesa
  |
  `-- Sair

---

## Fluxo de comunicação com a API

Tela
  |
  v
Service
  |
  v
Axios
  |
  v
API REST
  |
  v
MockAPI

Exemplo de cadastro:

ExpenseFormScreen
  |
  v
createExpense()
  |
  v
Axios POST
  |
  v
MockAPI

---

## Considerações finais

O projeto foi desenvolvido com foco didático, buscando aplicar os conceitos estudados na disciplina de Desenvolvimento para Dispositivos Móveis II.

Além do CRUD completo, foram implementadas funcionalidades adicionais, como autenticação, persistência de sessão, resumo financeiro e filtros dinâmicos por categoria.

O projeto foi mantido propositalmente simples para facilitar o entendimento do código e permitir a explicação do funcionamento de cada parte da aplicação.

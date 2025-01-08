# TechManage - Aplicação de Gerenciamento de Usuários

Este repositório contém a solução para o desafio de desenvolvimento front-end proposto pela TechManage. O objetivo foi criar uma aplicação em Angular para o gerenciamento de usuários, implementando funcionalidades como cadastro, edição, listagem e exclusão de usuários, com um design responsivo e boas práticas de código.

---

## 📜 Contexto do Desafio

A TechManage, uma empresa fictícia, solicitou a criação de uma aplicação que permita gerenciar usuários de forma eficiente. O foco principal era a criação de um formulário de cadastro, garantindo validações, uma interface responsiva, e o uso de testes unitários com alta cobertura.

---

## 🚀 Funcionalidades Implementadas

### 1. **Formulário de Cadastro de Usuários**
- Campos:
  - Nome Completo: Campo de texto com validação de mínimo de 3 caracteres.
  - E-mail: Campo de texto com validação de formato e presença do caractere "@". 
  - Telefone: Campo de texto com máscara para DDD e número no formato `(99) 99999-9999`.
  - Data de Nascimento: Campo de data com validação para aceitar apenas usuários entre 18 e 100 anos.
  - Tipo de Usuário: Dropdown com as opções:
    - Administrador
    - Editor
    - Visualizador
- Validações:
  - Todos os campos são obrigatórios.
  - Mensagens de erro curtas e em linguagem natural.

### 2. **Mock do Service**
Foi criado um service que simula um backend para gerenciar os usuários em um array local. Este service inclui os seguintes métodos:

- `addUser(user: User)`: Adiciona um novo usuário à lista.
- `getUsers()`: Retorna a lista de usuários cadastrados.
- `editUser(id: string, user: User)`: Atualiza as informações de um usuário.
- `deleteUser(id: string)`: Remove um usuário pelo ID.

---

## 🖥️ Interface do Usuário

A interface é responsiva e apresenta as seguintes telas:

- **Página Inicial:** Exibe uma lista de usuários cadastrados e permite ações como edição e exclusão.
- **Cadastro de Usuário:** Formulário para adicionar novos usuários, com validações.
- **Edição de Usuário:** Tela semelhante ao cadastro, pré-populada com os dados do usuário a ser editado.

**Protótipo Implementado:**

```
--------------------------------------
|       Cadastro de Usuário          |
--------------------------------------
| Nome Completo: [_________________] |
| E-mail:        [_________________] |
| Telefone:      [_________________] |
| Data de Nasc.: [______/______/___] |
| Tipo de Usuário: [ Administrador▼] |
--------------------------------------
|            [Salvar]                |
--------------------------------------
```

---

## 🔍 Validações

- **Nome Completo:** Deve conter ao menos 3 caracteres.
- **E-mail:** Deve ser válido e conter "@".
- **Telefone:** Deve seguir o formato `(99) 99999-9999`.
- **Data de Nascimento:** Apenas idades entre 18 e 100 anos são permitidas.
- **Tipo de Usuário:** Deve ser selecionado entre as opções disponíveis.

---

## 🧪 Testes Unitários

A aplicação conta com cobertura de testes de 90%, utilizando **Jest**. Foram realizados testes para verificar:

- Validações dos campos.
- Funcionamento correto dos métodos do service.
- Renderização correta dos componentes.
- Comportamento do modal de confirmação.

---

## 📐 Avaliação e Boas Práticas

### Boas Práticas Utilizadas
- Uso do Angular 14 e **Reactive Forms** para validação do formulário.
- Código modular e organizado, respeitando os princípios de **separação de responsabilidades**.
- Testes extensivos com **Jest**, garantindo alta cobertura.
- Uso de **CSS utilitário** (Tailwind) para design limpo e responsivo.

---

## 📂 Estrutura do Projeto

```
src/
├── app/
│   ├── components/
│   │   ├── header/
│   │   ├── footer/
│   │   ├── modal/
│   │   └── menu/
│   ├── pages/
│   │   ├── home/
│   │   ├── create-user/
│   │   └── edit-user/
│   ├── services/
│   ├── models/
│   └── app.module.ts
├── assets/
│   ├── imagens/
├── environments/
```

---

## 📖 Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 16 ou superior).
- Angular CLI.
- Yarn ou npm.

### Passos para Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/RafaellSouzza/TechManage-Frontend.git
   cd techmanage-frontend
   ```

2. Instale as dependências:
   ```bash
   yarn install
   ```

3. Inicie o servidor:
   ```bash
   yarn start
   ```

4. Acesse a aplicação em [http://localhost:4200](http://localhost:4200).

---

## 🛠️ Tecnologias Utilizadas

- **Angular 14**: Framework principal para desenvolvimento do front-end.
- **Jest**: Ferramenta de testes unitários.
- **Tailwind CSS**: Estilo responsivo e utilitário.
- **Reactive Forms**: Validações e manipulação de formulários reativos.
- **TypeScript**: Tipagem estática para maior confiabilidade do código.

---

## 🚩 Observações Finais

Este projeto foi desenvolvido como parte de um desafio técnico. Todo o código foi implementado com foco em clareza, funcionalidade e desempenho. Sinta-se à vontade para explorar o repositório e sugerir melhorias.

---

**Repositório:** [TechManage-Frontend](https://github.com/RafaellSouzza/TechManage-Frontend.git)  
**Autor:** Rafael Souza  
**Contato:** rlcitriny@gmail.com  
```
# FeedbackView - Backend

## Visão Geral

Este é o repositório do backend do projeto FeedbackView, um sistema de avaliação da satisfação do cliente desenvolvido pelo grupo composto por, Kauê Recio, Leonardo Marcel Hyppolito. O objetivo principal deste projeto é proporcionar uma maneira mais precisa de coletar e analisar dados referentes à satisfação do cliente em relação a produtos e/ou serviços.

## Tecnologias Utilizadas

- Node.js
- Express.js
- MongoDB (ou outra base de dados relacional ou não-relacional)
- Outras dependências conforme necessário

## Funcionalidades

O sistema Feed-back oferece as seguintes funcionalidades:

- Gerenciamento de formulários de avaliação.
- Criação e edição de perguntas e formulários.
- Personalização de formulários de acordo com as necessidades do usuário.
- Geração de códigos QR e links de acesso para os formulários.
- Armazenamento seguro de dados dos formulários e respostas dos usuários.
- Apresentação de resultados das avaliações de forma clara e compreensível.

## Público-Alvo

- Gerentes de empresas de pequeno e médio porte que desejam conhecer melhor seus clientes.
- Gerentes de empresas de pequeno e médio porte que desejam conhecer seus próprios funcionários e aplicar questionários internos.

## Perfis de Usuário

- **Usuário**: Permite responder aos formulários.
- **Gerente**: Permite criar e finalizar formulários, visualizar dados dos formulários e personalizar perguntas do formulário.
- **Administrador**: Permite visualizar usuários, visualizar formulários, criar e editar tópicos e questões.


## Casos de uso

### Manager

#### Auth
- Login
- Register
- Forgot Password

#### Crud Forms
- Create
- Read
- Delete
- Change
- Add Public Questions
- Use Models
- Toggle Active
- Toggle Public
- Generate QRCode/Link

### Admin

#### Crud Public Forms
- Create
- Read
- Delete
- Change

#### Crud Public Questions
- Create
- Read
- Delete

### Crud Topics
- Create
- Read
- Delete

### View Users
- List Users w/ Pagination
  - Show (Name, Email, Number of Forms, Plan)

### User
- Responder Formulário

# Backend do projeto FeedbackView

## Tecnologias

- NodeJS
- Fastify
- Prisma ORM

# Routes

### Auth
- POST "/register" receives:
  ```
    {
      "name": "Teste",
      "email": "email@gmail.com",
      "password": "Senha123"
    }
  ``` 
  Return: token

- POST "/register" receives:
  ```
    {
      "email": "email@gmail.com",
	    "password": "Senha123"
    }
  ``` 
  Return: token

GET
"/form"
"/form:formId"
"/question"
"/question:questionId/answer"

# Use Cases
# Backend do projeto FeedbackView

## Tecnologias

- NodeJS
- Fastify
- Prisma ORM

# Routes

GET
"/form"
"/form:formId"
"/question"
"/question:questionId/answer"

# Use Cases


# Auth
  - [x] Login
  - [x] Register
  - [ ] Forgot Password

# User
  - [x] Get All
  - [x] Get One
  - [ ] Delete account
  - [ ] Edit name/password

### Form

-create form
- [x] get all forms of user
 - pagination 
 - not include questions
- [] get one form
 - no auth
 - include questions
 - no sensive data
- [] Create new form
- with questions if has
-[] Edit form
- and all questions
-[] delete form
 - all questions should be deleted too

### Answer 

Session ID for answers it helps to identify all answers of a single user

[] answer one question
[] answer entire form


- Read answer
- Answer form
- Delete answer
- See answers by form
- See answers by question

### Graph

- Generate graph data for all form answers
- Generate graph data for question answers
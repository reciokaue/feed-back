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

### User

- Crud User
- Login
- Forgot password

### Form

- Read form and all questions
- Create form
- Update form 
- Delete form -> delete all questions
- Add multiple questions -> create questions
- Remove question -> delete question

### Question

- Read question and all options
- Create question
- Update question 
- Delete question
- Add option
- Remove option
- Update option

### Answer 

- Read answer
- Answer form
- Delete answer
- See answers by form
- See answers by question

### Graph

- Generate graph data for all form answers
- Generate graph data for question answers



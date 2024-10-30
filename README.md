# Produto API

Projeto inicial da matéria de Desenvolvimento Móvel(OP120).

## Pré-requisitos

Antes de começar, você precisa ter o seguinte instalado em sua máquina:

- [Docker](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/pt)
- [PostgreSQL - Opcional](https://www.postgresql.org/)

## Iniciando o Projeto

Siga os passos abaixo para configurar o projeto em sua máquina:

1. **Clone o repositório**

   ```bash
   git clone https://github.com/oluiznascimento/produto-api.git
   cd produto-api
   ```
2. **Instale as dependências**
```
   npm start
```

3. **Inicie o contêiner do PostgreSQL**

Execute o seguinte comando para iniciar o contêiner:

   ```bash
   docker run --name postgres-container \
  --env-file .env \
  -p ${POSTGRES_PORT}:5432 \
  -v $(pwd)/postgres-data:/var/lib/postgresql/data \
  -v $(pwd)/init.sql:/docker-entrypoint-initdb.d/init.sql \
  -d postgres:latest
  ```
O PostgreSQL será iniciado, e a tabela Produto será criada automaticamente, com dados de exemplo inseridos.

4. **Verifique se a tabela foi criada**

   ```bash
   docker exec -it postgres-container psql -U user -d mydb
   ```   

Em seguida, execute o comando:

   ```sql
   SELECT * FROM Produto;
   ```

5. **Utilizando a API**

Execute o seguinte script para adicionar 5 produtos à tabela Produto:

  ```bash
   npm start
  ```


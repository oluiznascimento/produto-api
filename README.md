# Produto API

Projeto inicial da matéria de Desenvolvimento Móvel(OP120).

## Pré-requisitos

Antes de começar, você precisa ter o seguinte instalado em sua máquina:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)

## Iniciando o Projeto

Siga os passos abaixo para configurar o projeto em sua máquina:

1. **Clone o repositório**

   ```bash
   git clone https://github.com/oluiznascimento/produto-api.git
   cd produto-api
   ```

2. **Inicie o contêiner do PostgreSQL**

Execute o seguinte comando para iniciar o contêiner:

   ```bash
   docker run --name postgres-container \
    -e POSTGRES_USER=user \
    -e POSTGRES_PASSWORD=password \
    -e POSTGRES_DB=mydb \
    -p 5432:5432 \
    -v $(pwd)/postgres-data:/var/lib/postgresql/data \
   -d postgres:latest
  ```

3. **Criar tabela `Produto`**

Após iniciar o contêiner, execute o seguinte comando para acessar o PostgreSQL:

```bash
  docker exec -it postgres-container psql -U user -d mydb
  ```

Em seguida, execute o seguinte script para criar a tabela Produto:

  ```sql
  CREATE TABLE Produto (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    preco NUMERIC(10, 2) NOT NULL,
    estoque INT NOT NULL,
    data DATE NOT NULL
);
  ```

4. **Inserir produtos na tabela**

Execute o seguinte script para adicionar 5 produtos à tabela Produto:

  ```sql
  INSERT INTO Produto (descricao, preco, estoque, data) VALUES
  ('Produto 1', 10.99, 100, CURRENT_DATE),
  ('Produto 2', 20.50, 150, CURRENT_DATE),
  ('Produto 3', 30.00, 200, CURRENT_DATE),
  ('Produto 4', 40.25, 50, CURRENT_DATE),
  ('Produto 5', 50.75, 75, CURRENT_DATE);
);
  ```
5. **Verificar os produtos**

  ```sql
  SELECT * FROM Produto;
  ```

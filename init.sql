CREATE TABLE IF NOT EXISTS Produto (
  id SERIAL PRIMARY KEY,
  descricao VARCHAR(255) NOT NULL,
  preco NUMERIC(10, 2) NOT NULL,
  estoque INT NOT NULL,
  data DATE NOT NULL
);

INSERT INTO Produto (descricao, preco, estoque, data) VALUES
('Produto 1', 10.99, 100, CURRENT_DATE),
('Produto 2', 20.50, 150, CURRENT_DATE),
('Produto 3', 30.00, 200, CURRENT_DATE),
('Produto 4', 40.25, 50, CURRENT_DATE),
('Produto 5', 50.75, 75, CURRENT_DATE)
ON CONFLICT DO NOTHING;

API Juntos Energia
Esta é uma API para gerenciar o estoque de uma loja de eletrônicos utilizando Node.js e MongoDB.

Instalação
Clone o repositório:

git clone https://github.com/lucwssouza/electronics-stock.git>
cd api-juntos-energia
Instale as dependências:

npm install

Configure a conexão com o MongoDB:

Substitua a URL de conexão no arquivo src/index.js pela sua URL do MongoDB.

Execução

node src/index.js

Endpoints
GET /: Verifica se a API está rodando.
POST /products: Cria um novo produto.

Body:
{
  "name": "Nome do Produto",
  "price": 99.99,
  "stockQuantity": 10,
  "description": "Descrição do Produto",
  "category": "Categoria do Produto"
}

GET /products: Lista todos os produtos. Suporte a filtros por categoria e faixa de preço.
Query Parameters:
category (opcional): Filtra produtos por categoria.
minPrice (opcional): Faixa mínima de preço.
maxPrice (opcional): Faixa máxima de preço.
GET /products/
Lista um produto pelo ID.
PUT /products/
Atualiza um produto pelo ID.

Body:
{
  "name": "Nome Atualizado",
  "price": 149.99,
  "stockQuantity": 20,
  "description": "Descrição Atualizada",
  "category": "Categoria Atualizada"
}

200 OK: Produto atualizado com sucesso.
400 Bad Request: Campos obrigatórios ausentes ou erro de validação.
404 Not Found: Produto não encontrado.
500 Internal Server Error: Erro ao atualizar o produto.

DELETE /products/
Remove um produto pelo ID.

Requisitos
Node.js
MongoDB Atlas

Contribuições
Se você deseja contribuir com o projeto, por favor, abra uma issue ou envie um pull request.

Licença
Este projeto é licenciado sob a Licença MIT.

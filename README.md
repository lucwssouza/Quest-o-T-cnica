# API Juntos Energia

Uma API para gerenciar o estoque de uma loja de eletrônicos utilizando **Node.js** e **MongoDB**.

## 📦 Instalação

### 1. Clone o repositório:

git clone https://github.com/lucwssouza/electronics-stock.git
cd api-juntos-energia

2. Instale as dependências:
npm install

3. Configure a conexão com o MongoDB:
Substitua a URL de conexão no arquivo src/index.js pela sua URL do MongoDB Atlas.

🚀 Execução
Para iniciar o servidor, utilize o seguinte comando:

node src/index.js

O servidor estará rodando na porta configurada (por padrão, http://localhost:3000).

🔗 Endpoints

GET / - Verificar se a API está rodando
Resposta esperada:
{
  "message": "API rodando"
}


POST /products - Criar um novo produto
Exemplo de corpo da requisição:
{
  "name": "Nome do Produto",
  "price": 99.99,
  "stockQuantity": 10,
  "description": "Descrição do Produto",
  "category": "Categoria do Produto"
}


GET /products - Listar todos os produtos
Suporta filtros por categoria e faixa de preço.
Parâmetros de consulta (query):
category (opcional): Filtra produtos por categoria.
minPrice (opcional): Faixa mínima de preço.
maxPrice (opcional): Faixa máxima de preço.


GET /products/
- Buscar um produto pelo ID
Resposta esperada:
{
  "id": "1",
  "name": "Produto Exemplo",
  "price": 199.99,
  "stockQuantity": 20,
  "description": "Descrição do Produto",
  "category": "Eletrônicos"
} 


PUT /products/
- Atualizar um produto pelo ID
Exemplo de corpo da requisição:
{
  "name": "Nome Atualizado",
  "price": 149.99,
  "stockQuantity": 20,
  "description": "Descrição Atualizada",
  "category": "Categoria Atualizada"
}


Respostas:
200 OK: Produto atualizado com sucesso.
400 Bad Request: Campos obrigatórios ausentes ou erro de validação.
404 Not Found: Produto não encontrado.
500 Internal Server Error: Erro ao atualizar o produto.


DELETE /products/
- Remover um produto pelo ID


🛠️ Requisitos
Node.js

MongoDB Atlas


🤝 Contribuições
Se você deseja contribuir com o projeto, por favor, abra uma issue ou envie um pull request.


📝 Licença
Este projeto é licenciado sob a Licença MIT.

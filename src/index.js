const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect('mongodb+srv://lucassnoze1:98632845l@juntos-energia.4dcfs.mongodb.net/juntos-energia?retryWrites=true&w=majority')
    .then(() => {
        console.log("Conectado ao MongoDB!");
    })
    .catch((error) => {
        console.error("Erro ao conectar ao MongoDB:", error);
    });

// definindo o esquema do produto
const productSchema = new mongoose.Schema({
    id: { type: Number, unique: true }, // id automático
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true, min: 0 },
    stockQuantity: { type: Number, required: true },
    description: String,
    category: String,
    createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

app.get('/', (req, res) => {
    res.status(200).send('api rodando corretamente');
});

// funcao para gerar o id automático
const getNextId = async () => {
    try {
        const lastProduct = await Product.findOne().sort({ id: -1 });
        return lastProduct ? lastProduct.id + 1 : 1;
    } catch (error) {
        console.error("erro ao gerar o próximo ID:", error);
        throw error;
    }
};

// post products
app.post('/products', async (req, res) => {
    try {
        const { name, price, stockQuantity, description, category } = req.body;

        if (!name || price == null || stockQuantity == null) {
            return res.status(400).send({ error: 'preencha todos os campos' });
        }

        if (price < 0) {
            return res.status(400).send({ error: 'o preço não pode ser negativo' });
        }

        // verificar se existe um produto cadastrado com o mesmo nome
        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            return res.status(400).send({ error: 'já existe um produto com esse nome' });
        }

        const nextId = await getNextId(); 

        const product = new Product({
            id: nextId,
            name,
            price,
            stockQuantity,
            description,
            category
        });

        await product.save();
        res.status(201).send(product);
    } catch (error) {
        console.error("erro ao criar o produto:", error.message);
        res.status(500).send({ error: 'erro ao criar o produto', details: error.message });
    }
});

// get products
app.get('/products', async (req, res) => {
    try {
        const { category, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

        const filters = {};

        if (category) {
            filters.category = category;
        }

        if (minPrice || maxPrice) {
            filters.price = {};
            if (minPrice) {
                filters.price.$gte = parseFloat(minPrice);
            }
            if (maxPrice) {
                filters.price.$lte = parseFloat(maxPrice);
            }
        }

        const pageNumber = parseInt(page);
        const pageSize = parseInt(limit);

        if (pageNumber < 1 || pageSize < 1) {
            return res.status(400).send({ error: 'número de página ou tamanho da página inválido' });
        }

        const products = await Product.find(filters)
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize);

        const totalProducts = await Product.countDocuments(filters);

        res.status(200).send({
            products,
            pagination: {
                totalProducts,
                totalPages: Math.ceil(totalProducts / pageSize),
                currentPage: pageNumber,
                pageSize
            }
        });
    } catch (error) {
        console.error("erro ao recuperar produtos:", error.message);
        res.status(500).send({ error: 'erro ao recuperar produtos', details: error.message });
    }
});

// get produts id
app.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ id: parseInt(req.params.id) });
        if (!product) {
            return res.status(404).send({ error: 'produto não encontrado' });
        }
        res.status(200).send(product);
    } catch (error) {
        console.error("erro ao recuperar o produto:", error.message);
        res.status(500).send({ error: 'erro ao recuperar o produto', details: error.message });
    }
});

// put products id
app.put('/products/:id', async (req, res) => {
    try {
        const { name, price, stockQuantity, description, category } = req.body;

        if (!name || price == null || stockQuantity == null) {
            return res.status(400).send({ error: 'preencha todos os campos' });
        }

        if (price < 0) {
            return res.status(400).send({ error: 'o preço não pode ser negativo' });
        }

        const product = await Product.findOneAndUpdate(
            { id: parseInt(req.params.id) },
            { name, price, stockQuantity, description, category },
            { new: true }
        );

        if (!product) {
            return res.status(404).send({ error: 'produto não encontrado' });
        }
        res.status(200).send(product);
    } catch (error) {
        console.error("erro ao atualizar o produto:", error.message);
        res.status(500).send({ error: 'erro ao atualizar o produto', details: error.message });
    }
});

// del produto pelo id
app.delete('/products/:id', async (req, res) => {
    try {
        const result = await Product.deleteOne({ id: parseInt(req.params.id) });

        if (result.deletedCount === 0) {
            return res.status(404).send({ error: 'produto não encontrado!' });
        }
        res.status(200).send({ message: 'produto removido com sucesso!' });
    } catch (error) {
        console.error("erro ao remover o produto:", error.message);
        res.status(500).send({ error: 'erro ao remover o produto!', details: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

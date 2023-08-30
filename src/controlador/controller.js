const fs = require(`fs/promises`);

const listaItem = async (req, res) => {
    try {
        const arquivo = await fs.readFile(`./src/bancodados/bancodedados.json`);
        const itens = JSON.parse(arquivo);
        let tam = itens.length;
        if (tam === 0) {
            return res.status(200).json({ mensagem: `ainda não tem produtos aqui` });
        }
        return res.status(200).json(itens);
    } catch (error) {
        return res.status(400).json(error.message)
    }
};

const encontraUmItem = async (req, res) => {
    const itemId = req.params.id;
    try {
        const arquivo = await fs.readFile(`./src/bancodados/bancodedados.json`);
        const itens = JSON.parse(arquivo);
        const achouProduto = itens.findIndex((elemento => elemento.id === Number(itemId)));
        if (achouProduto < 0) {
            return res.status(404).json({ mensagem: `Produto não encontrado ` });
        }
        return res.status(200).json(itens[achouProduto]);
    } catch (error) {
        return res.status(400).json(error.message)
    }
};

const adicionaItem = async (req, res) => {
    const produto = req.body;
    try {
        const arquivo = await fs.readFile(`./src/bancodados/bancodedados.json`);
        const itens = JSON.parse(arquivo);
        let id;
        let tam = itens.length;
        tam === 0 ? id = 1 : id = itens[tam - 1].id + 1;
        itens.push({ id, produto });
        await fs.writeFile(`./src/bancodados/bancodedados.json`, JSON.stringify(itens));
        return res.status(201).json({ mensagem: `ítem adicionado com sucesso` });
    } catch (error) {
        return res.status(400).json(error.message)
    }
};

const atualizaItem = async (req, res) => {
    let { id } = req.params;
    try {
        const arquivo = await fs.readFile(`./src/bancodados/bancodedados.json`);
        const itens = JSON.parse(arquivo);
        const achouProduto = itens.findIndex((elemento => elemento.id === Number(id)));
        if (achouProduto < 0) {
            return res.status(404).json({ mensagem: `Produto não encontrado ` });
        }
        const produto = req.body;
        id = Number(id);
        itens[achouProduto] = { id, produto }
        await fs.writeFile(`./src/bancodados/bancodedados.json`, JSON.stringify(itens));
        return res.status(200).json({ mensagem: `ítem atualizado com sucesso` });
    } catch (error) {
        return res.status(400).json(error.message)
    }
};

const excluiItem = async (req, res) => {
    const itemId = req.params.id;
    try {
        const arquivo = await fs.readFile(`./src/bancodados/bancodedados.json`);
        const itens = JSON.parse(arquivo);
        const achouProduto = itens.findIndex((elemento => elemento.id === Number(itemId)));
        if (achouProduto < 0) {
            return res.status(404).json({ mensagem: `Produto não encontrado ` });
        }
        const deletedItem = itens.splice(achouProduto, 1);
        await fs.writeFile(`./src/bancodados/bancodedados.json`, JSON.stringify(itens));
        return res.status(200).json(deletedItem);
    } catch (error) {
        return res.status(400).json(error.message)
    }
};

module.exports = {
    listaItem,
    encontraUmItem,
    adicionaItem,
    atualizaItem,
    excluiItem
}
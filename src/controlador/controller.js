const fs = require(`fs/promises`);

const listaItem = async (req, res) => {
    //
};

const encontraUmItem = async (req, res) => {
    //res.json(items);
};

const adicionaItem = async (req, res) => {
    const newItem = req.body;
    const arquivo = await fs.readFile(`./src/bancodados/bancodedados.json`);
    console.log(newItem,arquivo);
    //const itens = JSON.parse(arquivo); 
    /*  
    if (itens = null) {
        return 
    }
    return res.status(200).json(itens);
    



    items.push(newItem);
    res.status(201).json(newItem);
    */
   return res.status(200).json({ mensagem: `ainda não tem produtos aqui` });
};

const atualizaItem = async (req, res) => {
    const itemId = req.params.id;
    const updatedItem = req.body;

    items[itemId] = updatedItem;
    res.json(updatedItem);
};

const excluiItem = async (req, res) => {
    const itemId = req.params.id;
    const deletedItem = items.splice(itemId, 1);

    res.json(deletedItem);
};

module.exports = {
    listaItem,
    encontraUmItem,
    adicionaItem,
    atualizaItem,
    excluiItem
}
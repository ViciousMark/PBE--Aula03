const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const read = async (req, res) => {
    const comidas = await prisma.comida.findMany();
    return res.json(comidas);
};

const create = async (req, res) => {
    const { nome, preco } = req.body;
    const comida = await prisma.comida.create({
        data: { nome, preco }
    });
    return res.status(201).json(comida);
};

const update = async (req, res) => {
    const { id, nome, preco } = req.body;
    const comida = await prisma.comida.update({
        where: { id: parseInt(id) },
        data: { nome, preco }
    });
    return res.status(202).json(comida);
};

const del = async (req, res) => {
    const id = parseInt(req.params.id);
    await prisma.comida.delete({
        where: { id }
    });
    return res.status(204).send();
};

module.exports = {
    read,
    create,
    update,
    del
};
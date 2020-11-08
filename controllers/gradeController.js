import { db } from '../models/index.js';
import { gradeModel } from '../models/gradeModel.js'
import { logger } from '../config/logger.js';

const create = async (req, res) => {
  const dadoCorpo = req.body
  console.log(dadoCorpo)
  try {
    const insereDado = new gradeModel(dadoCorpo)
    insereDado.save()
    res.send({ message: 'Grade inserido com sucesso' });
    logger.info(`POST /grade - ${JSON.stringify()}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;
  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  try {
    const dados = await gradeModel.find(condition)
    res.send(JSON.stringify(dados))
    logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const dados = await gradeModel.findOne({ _id: id })
    res.send(JSON.stringify(dados))
    logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }
  const id = req.params.id;
  try {
    const dados = await gradeModel.findByIdAndUpdate({ _id: id }, req.body, { new: true })
    if (!dados) {
      console.log("Não achou arquivo para editar")
      res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    }
    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
    res.send("Atualizado com sucesso")
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const dados = await gradeModel.findByIdAndDelete({ _id: id })
    if (!dados) {
      console.log("Não achou arquivo para remover")
      res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    }
    console.log('Excluído com sucesso')
    res.send("Arquivo excluído com Sucesso")
    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  try {
    const dados = await gradeModel.deleteMany({})
    if (!dados) {
      console.log("Não deletou os arquivos")
      res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    }
    console.log("Deletado todo o banco de dados")
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };

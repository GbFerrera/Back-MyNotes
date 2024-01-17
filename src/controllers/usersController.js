const AppError = require("../utils/appError");

const knex = require("../database/knex");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      throw new AppError("Necessario preencher todos os campos");
    }

    if (password.length < 6) {
      throw new AppError("A senha deve ter pelo menos 6 caracteres");
    }

    const emailExist = await knex("users").where("email", email).first();

    if (emailExist) {
      throw new AppError("Esse e-mail ja esta em uso!");
    }

    await knex("users").insert({ name, email, password });

    return response.json("Criado com sucesso");
  }

  async update(request, response) {
    const { name, email, newPassword, oldPassword } = request.body;
    const { id } = request.params;

    const user = await knex("users").where("id", id).first();

    if (email !== user.email) {
      const verifyEmail = await knex("users").where("email", email).first();

      if (verifyEmail && verifyEmail.id != user.email) {
        throw new AppError("Este e-mail já esta em uso!");
      }
    }

    if (oldPassword != user.password) {
      throw new AppError("A antiga senha não confere!");
    }

    if (newPassword.length < 6) {
      throw new AppError("A nova senha é necessária ter no minimo 6 digitos!");
    }

    await knex("users").where("id", id).update({
      name,
      email,
      password: newPassword,
    });

    return response.json("Atualizado com sucesso :)");
  }

  async show(request, response) {
    const { id } = request.params;

    const user = await knex("users")
      .where("id", id)
      .select("name", "email", "password", "avatar");

    return response.json(user);
  }
}

module.exports = UsersController;

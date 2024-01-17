const AppError = require("../utils/appError")

const knex = require("../database/knex")

class UsersController {


create(request,response){

  const {name,email,password} = request.body

 if(!name){

 throw new AppError("Nome obrigatório")
 
}

 return response.json({name,email,password})


}

update(request,response){

  const {name,email,password} = request.body
  const user = request.params


  

}

show(request,response){
  
}



}


module.exports = UsersController
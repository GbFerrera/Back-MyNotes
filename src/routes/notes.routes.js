const {Router} = require("express")
const notesRoutes = Router()

const  NotesController = require("../controllers/notesController")
const notesController = new NotesController()


notesRoutes.post("/",notesController.create)
notesRoutes.put("/:id", notesController.update)
notesRoutes.delete("/:id", notesController.delete)
notesRoutes.get("/:id", notesController.show)




module.exports = notesRoutes
const { register, login, setAvatar, getAllUsers } = require("../controllers/usersController");


const router = require("express").Router();


//post request router to register user
router.post("/register", register);
//post request router to login user
router.post('/login', login);
//post request router to set avatar
router.post('/setAvatar/:id', setAvatar);
router.get('/allusers/:id', getAllUsers)


module.exports = router;
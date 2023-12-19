const { addMessage, getAllMessage } = require("../controllers/messagesController");


const router = require("express").Router();


//post request router to add message
router.post("/addmsg", addMessage);
//post request router to lget messages
router.post('/getmsg', getAllMessage);



module.exports = router;
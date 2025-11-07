const contentRouter=require("express").Router();
const auth=require("../../../utils/auth");

const generateContent=require("../../../controllers/content/generateContent");
contentRouter.post('/generate',auth,generateContent);
module.exports=contentRouter;


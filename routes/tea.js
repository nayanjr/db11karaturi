var express = require('express'); 
const tea_controlers= require('../controllers/tea'); 
var router = express.Router(); 
 
/* GET costumes */ 
router.get('/', tea_controlers.tea_view_all_Page ); 
module.exports = router; 
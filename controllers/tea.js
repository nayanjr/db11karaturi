var Tea = require("../models/tea");

// List of all teas
exports.tea_list = async function (req, res) {
  try {
    theteas = await Tea.find();
    res.send(theteas);
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};

// for a specific tea.
exports.tea_detail = async function (req, res) {
  console.log("detail"  + req.params.id) 
    try { 
        result = await Tea.findById( req.params.id) 
        res.send(result) 
    } catch (error) { 
        res.status(500) 
        res.send(`{"error": document for id ${req.params.id} not found`); 
    } 
};


// Handle tea create on POST.
exports.tea_create_post = async function (req, res) {
  let document = new Tea();
  // We are looking for a body, since POST does not have query parameters.
  // Even though bodies can be in many different formats, we will be picky
  // and require that it be a json object
  document.tea_brand = req.body.tea_brand;
  document.size = req.body.size;
  document.price = req.body.price;
  console.log(req.body);
  try {
    if(document.price < 2 || document.price>999){
      throw new TypeError("Please add price in between 0 and 9999")
    }
    else if(document.tea_brand.length<=0){
      throw new TypeError("Brand name is Empty")
    }
    else{
      let result = await document.save();
      res.send(result);
    }
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};

// Handle tea delete form on DELETE.
exports.tea_delete =async function (req, res) {
  console.log("delete "  + req.params.id) 
    try { 
        result = await Tea.findByIdAndDelete( req.params.id) 
        console.log("Removed " + result) 
        res.send(result) 
    } catch (err) { 
        res.status(500) 
        res.send(`{"error": Error deleting ${err}}`); 
    } 
};

// Handle tea update form on PUT.
exports.tea_update_put =async function (req, res) {
  console.log(`update on id ${req.params.id} with body 
${JSON.stringify(req.body)}`) 
    try { 
        let toUpdate = await Tea.findById( req.params.id) 
        // Do updates of properties 
        if(req.body.costume_type)  
               toUpdate.tea_brand = req.body.tea_brand; 
        if(req.body.size) toUpdate.size = req.body.size; 
        if(req.body.price) toUpdate.price = req.body.price; 
        let result = await toUpdate.save(); 
        console.log("Sucess " + result) 
        res.send(result) 
    } catch (err) { 
        res.status(500) 
        res.send(`{"error": ${err}: Update for id ${req.params.id} 
failed`); 
    } 
};

// VIEWS
// Handle a show all view
exports.tea_view_all_Page = async function(req, res) { 
  try{ 
      theTeas = await Tea.find(); 
      res.render('tea', { title: 'Tea Search Results', results: theTeas }); 
  } 
  catch(err){ 
      res.status(500); 
      res.send(`{"error": ${err}}`); 
  }   
}; 

// Handle a show one view with id specified by query
exports.costume_view_one_Page = async function(req, res) {
console.log("single view for id " + req.query.id)
try{
result = await Tea.findById( req.query.id)
res.render('tea',
{ title: 'Tea Detail', toShow: result });
}
catch(err){
res.status(500)
res.send(`{'error': '${err}'}`);
}
};

// Handle building the view for creating a costume.
// No body, no in path parameter, no query.
// Does not need to be async
exports.tea_create_Page = function(req, res) {
console.log("create view")
try{
res.render('teacreate', { title: 'Tea Create'});
}
catch(err){
res.status(500)
res.send(`{'error': '${err}'}`);
}
};

// Handle a delete one view with id from query
exports.costume_delete_Page = async function(req, res) {
console.log("Delete view for id " + req.query.id)
try{
result = await Costume.findById(req.query.id)
res.render('teadelete', { title: 'Tea Delete', toShow:
result });
}
catch(err){
res.status(500)
res.send(`{'error': '${err}'}`);
}
};

// Handle building the view for updating a costume.
// query provides the id
exports.costume_update_Page = async function(req, res) {
console.log("update view for item "+req.query.id)
try{
let result = await Costume.findById(req.query.id)
res.render('teaupdate', { title: 'Tea Update', toShow: result });
}
catch(err){
res.status(500)
res.send(`{'error': '${err}'}`);
}
};

exports.tea_view_one_Page = async function(req, res) { 
  console.log("single view for id "  + req.query.id) 
  try{ 
      result = await Tea.findById( req.query.id) 
      res.render('teadetail',  
{ title: 'Tea Detail', toShow: result }); 
  } 
  catch(err){ 
      res.status(500) 
      res.send(`{'error': '${err}'}`); 
  } 
}; 

// Handle building the view for creating a costume. 
// No body, no in path parameter, no query. 
// Does not need to be async 
exports.tea_create_Page =  function(req, res) { 
    console.log("create view") 
    try{ 
        res.render('teacreate', { title: 'Tea Create'}); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 

// Handle building the view for updating a costume. 
// query provides the id 
exports.tea_update_Page =  async function(req, res) { 
    console.log("update view for item "+req.query.id) 
    try{ 
        let result = await Tea.findById(req.query.id) 
        res.render('teaupdate', { title: 'Tea Update', toShow: result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 

// Handle a delete one view with id from query 
exports.tea_delete_Page = async function(req, res) { 
  console.log("Delete view for id "  + req.query.id) 
  try{ 
      result = await Tea.findById(req.query.id) 
      res.render('teadelete', { title: 'Tea Delete', toShow: 
result }); 
  } 
  catch(err){ 
      res.status(500) 
      res.send(`{'error': '${err}'}`); 
  } 
}; 

const { body } = require('express-validator/check')

exports.validate = (method) => {
  switch (method) {
    case 'teaupdate': {
     return [ 
        body('teabrand', 'Username is mandatory').isUppercase(),
        body('teaprice').optional().isInt()
       ]   
    }
  }
};

const { validationResult } = require('express-validator/check');

exports.teaupdate = async (req, res, next) => {
   try {
      const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }

      const { teabrand,teaprice } = req.body
      
      const user = await User.tea_update_Page({

        teabrand,

        teaprice

          
      })

      res.json(user)
   } catch(err) {
     return next(err)
   }
}
var Tea = require("../models/tea");

// List of all teas
exports.tea_list = function (req, res) {
  res.send("NOT IMPLEMENTED: tea list");
};

// for a specific tea.
exports.tea_detail = function (req, res) {
  res.send("NOT IMPLEMENTED: tea detail: " + req.params.id);
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
    let result = await document.save();
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}}`);
  }
};

// Handle tea delete form on DELETE.
exports.tea_delete = function (req, res) {
  res.send("NOT IMPLEMENTED: tea delete DELETE " + req.params.id);
};

// Handle tea update form on PUT.
exports.tea_update_put = function (req, res) {
  res.send("NOT IMPLEMENTED: tea update PUT" + req.params.id);
};

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
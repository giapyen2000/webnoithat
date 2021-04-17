var express = require('express');
var router = express.Router();
const contactMongooes=require('../model/contact.js')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/view', function(req, res, next) {
 contactMongooes.find({},function(err,dulieu){
   res.render('view',{title:"trang xem ",data:dulieu})
 })
 
});
router.get('/remove/:idRemove', function(req, res, next) {
  var id=req.params.idRemove;
  contactMongooes.findByIdAndRemove(id).exec();
  res.redirect('/view')
});
router.get('/update/:idRemove', function(req, res, next) {
  var id=req.params.idRemove;
  contactMongooes.find({_id:id},function(err,dulieu){
        res.render('update',{title: " sua",data:dulieu})
  });
  
});
router.post('/update/:idRemove', function(req, res, next) {
  var id=req.params.idRemove;
  contactMongooes.findById({_id:id},function(err,dulieu){
       if (err) return handleError(err);
       dulieu.ten=req.body.ten;
       dulieu.tuoi=req.body.tuoi;
       dulieu.save();
       res.redirect('/view');
  });
  
});
router.get('/insert', function(req, res, next) {
  
        res.render('insert',{title: " insert"})
  
  
});
router.post('/insert', function(req, res, next) {
  var one={
    'ten':req.body.ten,
    'tuoi':req.body.tuoi
  }
  var insert= new contactMongooes(one);
  insert.save();
  res.redirect('/view')
 


});

module.exports = router;

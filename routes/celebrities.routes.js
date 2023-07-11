const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');
/* GET celebrities page */

router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then(allCelebrities => {
      // -> allTheBooksFromDB is a placeholder, it can be any word
      console.log('Retrieved celebrities from DB:', allCelebrities);
 
     res.render('celebrities/celebrities.ejs', {allCelebrities});
    })
    .catch(error => {
      console.log('Error while getting the celebrities from the DB: ', error);
 
      // Call the error-middleware to display the error page to the user
      next(error);
    });
});
 
router.get('/celebrities/create',(req, res, next) => { 
  res.render('celebrities/new-celebrity.ejs');

})
router.post('/celebrities/create',(req, res, next) => { 
  console.log(req.body);
  Celebrity.create(req.body)
  .then(celebFromDB => console.log(`New book created: ${celebFromDB}.`))
  .catch(error => next(error));

  res.redirect('/celebrities');

})

router.get('/celebrities/:id', async(req,res)=>{
    const celebrity=  await Celebrity.findById(req.params.id)
    res.render('celebrities/celebrity-details.ejs', {celebrity});
 
 })
 router.get('/celebrities/:id/edit', async(req,res)=>{
  const celebrity=  await Celebrity.findById(req.params.id)
  res.render('celebrities/celebrity-update.ejs', {celebrity});

})
router.post('/celebrities/:id/edit', async(req,res)=>{
  const celebrity=  await Celebrity.findByIdAndUpdate(req.params.id, req.body)
  res.redirect('/celebrities');

})


router.post('/celebrities/:id/delete', async(req,res)=>{
  console.log(req.params)
     await Celebrity.findByIdAndDelete(req.params.id)
     res.redirect('/celebrities');
 
 })
module.exports = router;
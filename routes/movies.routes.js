const router = require("express").Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');


router.get('/movies', (req, res, next) => {
    Movie.find()
      .then(allMovie=> {
        // -> allTheBooksFromDB is a placeholder, it can be any word
        console.log('Retrieved celebrities from DB:', allMovie);
   
       res.render('movies/movies.ejs', {allMovie});
      })
      .catch(error => {
        console.log('Error while getting the celebrities from the DB: ', error);
   
        // Call the error-middleware to display the error page to the user
        next(error);
      });
  });
  router.get('/movies/create', (req, res, next) => {
    Celebrity.find()
    .then(allCelebrities => {
      // -> allTheBooksFromDB is a placeholder, it can be any word
      console.log('Retrieved celebrities from DB:', allCelebrities);
 
     res.render('movies/new-movie.ejs', {allCelebrities});
    })
  })
  router.post('/movies/create', (req, res, next) => {

    Movie.create(req.body)
    .then(movieFromDB => console.log(`New movie created: ${movieFromDB}.`))
    .catch(error => next(error));
  
    res.redirect('/movies');
})


router.get('/movies/:id', async(req,res)=>{
 console.log(req.params)
   const movie=  await Movie.findById(req.params.id)
   res.render('movies/movie-details.ejs', {movie});

})

router.post('/movies/:id/delete', async(req,res)=>{
    console.log(req.params)
       await Movie.findByIdAndDelete(req.params.id)
       res.redirect('/movies');
   
   })


   router.get('/movies/:id/edit', async(req, res, next) => {

    const movie=  await Movie.findById(req.params.id)
    Celebrity.find()
    .then(allCelebrities => {
      // -> allTheBooksFromDB is a placeholder, it can be any word
      console.log('Retrieved celebrities from DB:', allCelebrities);
      console.log('movie cast', movie)
    res.render('movies/movie-update.ejs', {movie, allCelebrities});
    })

})
router.post('/movies/:id/edit', async(req, res, next) => {

    const movie=  await Movie.findByIdAndUpdate( req.params.id, req.body)
  
    
     
    res.render('movies/movie-details.ejs', {movie});
    

})
  module.exports = router;
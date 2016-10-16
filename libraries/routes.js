/**
 * Created by Harsh on 11-05-2016.
 */
//var header = require('request');



module.exports = function(app){
	app.get('/login',function(req,res){
		res.send("Login to see further details")
	})
    app.get('/headertest',function(req,res){
			res.send(req.headers);
			
			//res.send(res.headers);
    });

	app.get('/redirectest',function(req,res){
		res.redirect('/headertest');
	})
	
	app.get('/redirectest1',function(req,res){
		res.statusCode = 302; 
    res.setHeader("Location", "http://localhost:3000/login");
    res.end();
	})
	


}
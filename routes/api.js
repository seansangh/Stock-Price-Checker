'use strict';

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const MONGODB_CONNECTION_STRING = process.env.DB;
var request = require('request')
var requestIp = require('request-ip');
var mongoose = require('mongoose');
const assert = require('assert');

module.exports=function(app){



/*app.get('/api/stock-prices',function(req,res){
  //res.send(res.dream1)
});*/
  

app.route('/api/stock-prices')
  .post(function(req,res){
  if(req.body.like != undefined && req.body.dream1 != undefined && req.body.submit1 != undefined){
 res.redirect('?stock=' + req.body.dream1.toUpperCase()+'&like=true');
  }
  if(req.body.like == undefined && req.body.dream1 != undefined && req.body.submit1 != undefined){
 res.redirect('?stock=' + req.body.dream1.toUpperCase());
  }
  if(req.body.like2 != undefined && req.body.dream2 != undefined && req.body.dream3 != undefined && req.body.submit2 != undefined){
 res.redirect('?stock=' + req.body.dream2.toUpperCase() + '&stock=' + req.body.dream3.toUpperCase() +'&like=true');
  }
  if(req.body.like2 == undefined && req.body.dream2 != undefined && req.body.dream3 != undefined && req.body.submit2 != undefined){
 res.redirect('?stock=' + req.body.dream2.toUpperCase() + '&stock=' + req.body.dream3.toUpperCase());
  }  
});
  
  
 app.get('/api/stock-prices',(function(req,res){
if(req.query.like && Array.isArray(req.query.stock)==false){
 var like=1;
    request.get("https://api.iextrading.com/1.0/stock/" + req.query.stock + "/price", (err, response, body) => {
        if(response.body=="Unknown symbol") {
            res.send(response.body);
        }
        else{
     MongoClient.connect(MONGODB_CONNECTION_STRING, function(err,db){
        if(err){console.log('error')}       
    db.collection('url').findOne({name:req.query.stock},function(err,docs){
        if(docs){
          like=docs.ip.length; 
     MongoClient.connect(MONGODB_CONNECTION_STRING, function(err,db){
    db.collection('url').findOneAndUpdate({$and:[{name:req.query.stock},{ip:{$nin:[requestIp.getClientIp(req)]}}]},{$push:{ip:requestIp.getClientIp(req)}},{new:true},function(err,docss){ 
        if(docss.value == null){
          //res.send('The criteria is not valid:'+ docs.ip.length) 
         }
        else{
          //res.send('Updated'+ docs.ip.length+1)
        }
        });
     })  
        } //end of if(doc)
        else{
          //res.send('1st empty:')
      var cc={name:req.query.stock, likes: 1, ip:[requestIp.getClientIp(req)]};            
      MongoClient.connect(MONGODB_CONNECTION_STRING, function(err,db){
      db.collection('url').insert(cc, function(err,docs){
        if(err){
          return err;
        }
        db.close();
      })
     });           
        }
    })
      db.close()
     })                
          
       MongoClient.connect(MONGODB_CONNECTION_STRING, function(err,db){
        if(err){console.log('error')}       
    db.collection('url').findOne({name:req.query.stock},function(err,docs){

      res.json({stockData: {stock: req.query.stock.toUpperCase(), price: JSON.parse(body).toString(),likes: like}})  

    })})        
          
        }
    });
}
   
   
if(!req.query.like && Array.isArray(req.query.stock)== false){   
 var like=0;
    request.get("https://api.iextrading.com/1.0/stock/" + req.query.stock + "/price", (err, response, body) => {
        if(response.body=="Unknown symbol") {
            res.send(response.body);
        }
        else{  
      
      MongoClient.connect(MONGODB_CONNECTION_STRING, function(err,db){
        if(err){console.log('error')}       
    db.collection('url').findOne({name:req.query.stock},function(err,docs){
        if(docs){
        like=docs.ip.length; 
     MongoClient.connect(MONGODB_CONNECTION_STRING, function(err,db){
    db.collection('url').findOneAndUpdate({$and:[{name:req.query.stock},{ip:{$nin:[requestIp.getClientIp(req)]}}]},{$push:{ip:requestIp.getClientIp(req)}},{new:true},function(err,docss){ 
        if(docss.value == null){
          //res.send('The criteria is not valid:'+ docs.ip.length) 
         }
        else{
          //res.send('Updated'+ docs.ip.length+1)
        }
        });
     })  
        } //end of if(doc)
        else{
          //res.send('1st empty:')
      var cc={name:req.query.stock, likes: 0, ip:[]};            
      MongoClient.connect(MONGODB_CONNECTION_STRING, function(err,db){
      db.collection('url').insert(cc, function(err,docs){
        if(err){
          return err;
        }
        db.close();
      })
     });          
        }
    })
      db.close()
     })                
          
       MongoClient.connect(MONGODB_CONNECTION_STRING, function(err,db){
        if(err){console.log('error')}       
    db.collection('url').findOne({name:req.query.stock},function(err,docs){

      res.json({stockData: {stock: req.query.stock.toUpperCase(), price: JSON.parse(body).toString(),likes: like}})  

    })})           
          
          
        }
    });
}
   
   
if(req.query.like && Array.isArray(req.query.stock)){
 var like1=1;
 var like2=2;
    request.get("https://api.iextrading.com/1.0/stock/" + req.query.stock[0] + "/price", (err, response, body) => {
        if(response.body=="Unknown symbol") {
            res.send(response.body);
        }
        else{  

      request.get("https://api.iextrading.com/1.0/stock/" + req.query.stock[1] + "/price", (erra, response2, body2) => {
        if(response2.body=="Unknown symbol") {
            res.send(response2.body);
        }
        else{  

          
          
          
          
          
      MongoClient.connect(MONGODB_CONNECTION_STRING, function(err,db){
        if(err){console.log('error')}       
    db.collection('url').findOne({name:req.query.stock[0]},function(err,docs){
        if(docs){
        like1=docs.ip.length; 
     MongoClient.connect(MONGODB_CONNECTION_STRING, function(err,db){
    db.collection('url').findOneAndUpdate({$and:[{name:req.query.stock[0]},{ip:{$nin:[requestIp.getClientIp(req)]}}]},{$push:{ip:requestIp.getClientIp(req)}},{new:true},function(err,docss){ 
        if(docss.value == null){
          //res.send('The criteria is not valid:'+ docs.ip.length) 
         }
        else{
          //res.send('Updated'+ docs.ip.length+1)
        }
        });
     })  
        } //end of if(doc)
        else{
          like1=1;
          //res.send('1st empty:')
      var cc={name:req.query.stock[0], likes: 1, ip:[requestIp.getClientIp(req)]};            
      MongoClient.connect(MONGODB_CONNECTION_STRING, function(err,db){
      db.collection('url').insert(cc, function(err,docs){
        if(err){
          return err;
        }
        db.close();
      })
     });          
        }
    })
      db.close()
     })//end 1          
      MongoClient.connect(MONGODB_CONNECTION_STRING, function(err,db){
        if(err){console.log('error')}       
    db.collection('url').findOne({name:req.query.stock[1]},function(err,docs){
        if(docs){
        like2=docs.ip.length; 
     MongoClient.connect(MONGODB_CONNECTION_STRING, function(err,db){
    db.collection('url').findOneAndUpdate({$and:[{name:req.query.stock[1]},{ip:{$nin:[requestIp.getClientIp(req)]}}]},{$push:{ip:requestIp.getClientIp(req)}},{new:true},function(err,docss){ 
        if(docss.value == null){
          //res.send('The criteria is not valid:'+ docs.ip.length) 
         }
        else{
          //res.send('Updated'+ docs.ip.length+1)
        }
        });
     })  
        } //end of if(doc)
        else{
          like2=1;
          //res.send('1st empty:')
      var cc={name:req.query.stock[1], likes: 1, ip:[requestIp.getClientIp(req)]};            
      MongoClient.connect(MONGODB_CONNECTION_STRING, function(err,db){
      db.collection('url').insert(cc, function(err,docs){
        if(err){
          return err;
        }
        db.close();
      })
     });          
        }
    })
      db.close()
     })           
          
          
          
          
          
          
       MongoClient.connect(MONGODB_CONNECTION_STRING, function(err,db){
        if(err){console.log('error')}       
    db.collection('url').findOne({name:req.query.stock[0]},function(err,docs){

      MongoClient.connect(MONGODB_CONNECTION_STRING, function(err,db){
        if(err){console.log('error')}       
    db.collection('url').findOne({name:req.query.stock[1]},function(err,docss){
      
 res.json({stockData: [{stock: req.query.stock[0].toUpperCase(), price: JSON.parse(body).toString(), rel_likes:docs.ip.length-docss.ip.length},{stock: req.query.stock[1].toUpperCase(), price:JSON.parse(body2).toString(), rel_likes:docs.ip.length-docss.ip.length}]})
    })})              

    })})              
          
          
          
        }
    });        
          
        }
    });
  
}
   
   
   
   
   
   
   
   
if(!req.query.like && Array.isArray(req.query.stock)){
 var like1=0;    
 var like2=0;
      request.get("https://api.iextrading.com/1.0/stock/" + req.query.stock[0] + "/price", (err, response, body) => {
        if(response.body=="Unknown symbol") {
            res.send(response.body);
        }
        else{  

      request.get("https://api.iextrading.com/1.0/stock/" + req.query.stock[1] + "/price", (erra, response2, body2) => {
        if(response2.body=="Unknown symbol") {
            res.send(response2.body);
        }
        else{  

      MongoClient.connect(MONGODB_CONNECTION_STRING, function(err,db){
        if(err){console.log('error')}       
    db.collection('url').findOne({name:req.query.stock[0]},function(err,docs){
        if(docs){
        like1=docs.ip.length; 
     MongoClient.connect(MONGODB_CONNECTION_STRING, function(err,db){
   /* db.collection('url').findOneAndUpdate({$and:[{name:req.query.stock[0]},{ip:{$nin:[requestIp.getClientIp(req)]}}]},{$push:{ip:requestIp.getClientIp(req)}},{new:true},function(err,docss){ 
        if(docss.value == null){
          //res.send('The criteria is not valid:'+ docs.ip.length) 
         }
        else{
          //res.send('Updated'+ docs.ip.length+1)
        }
        });*/
     })  
        } //end of if(doc)
        else{
          like1=0;
          //res.send('1st empty:')
      var cc={name:req.query.stock[0], likes: 0, ip:[requestIp.getClientIp(req)]};            
      MongoClient.connect(MONGODB_CONNECTION_STRING, function(err,db){
      db.collection('url').insert(cc, function(err,docs){
        if(err){
          return err;
        }
        db.close();
      })
     });          
        }
    })
      db.close()
     })//end 1          
      MongoClient.connect(MONGODB_CONNECTION_STRING, function(err,db){
        if(err){console.log('error')}       
    db.collection('url').findOne({name:req.query.stock[1]},function(err,docs){
        if(docs){
        like2=docs.ip.length; 
     MongoClient.connect(MONGODB_CONNECTION_STRING, function(err,db){
 /*   db.collection('url').findOneAndUpdate({$and:[{name:req.query.stock[1]},{ip:{$nin:[requestIp.getClientIp(req)]}}]},{$push:{ip:requestIp.getClientIp(req)}},{new:true},function(err,docss){ 
        if(docss.value == null){
          //res.send('The criteria is not valid:'+ docs.ip.length) 
         }
        else{
          //res.send('Updated'+ docs.ip.length+1)
        }
        }); */
     })  
        } //end of if(doc)
        else{
          like2=0;
          //res.send('1st empty:')
      var cc={name:req.query.stock[1], likes: 0, ip:[]};            
      MongoClient.connect(MONGODB_CONNECTION_STRING, function(err,db){
      db.collection('url').insert(cc, function(err,docs){
        if(err){
          return err;
        }
        db.close();
      })
     });          
        }
    })
      db.close()
     })           
          
         
          
       MongoClient.connect(MONGODB_CONNECTION_STRING, function(err,db){
        if(err){console.log('error')}       
    db.collection('url').findOne({name:req.query.stock[0]},function(err,docs){

      MongoClient.connect(MONGODB_CONNECTION_STRING, function(err,db){
        if(err){console.log('error')}       
    db.collection('url').findOne({name:req.query.stock[1]},function(err,docss){
      console.log(docss.ip.length)
 res.json({stockData: [{stock: req.query.stock[0].toUpperCase(), price: JSON.parse(body).toString(), rel_likes:docs.ip.length-docss.ip.length},{stock: req.query.stock[1].toUpperCase(), price:JSON.parse(body2).toString(), rel_likes:docss.ip.length-docs.ip.length}]})
    })})              

    })})           
          
        }
    });        
          
        }
    })
  
  
}
   
   
  
   
 }));



};

# Stock-Price-Checker

*Real-time stock prices*

This is an app that allows you to get stock prices for stocks of interest.

Also, it provides you with information about likes (i.e. stocks that users like) and relative likes (i.e. the difference in likes between two stocks).


...

**Home Page**

<img src="/StockPriceChecker.PNG" title="home page" alt="home page" width="500px">


---


## Table of Contents 

> Sections
- [Sample Code](#Sample_Code)
- [Installation](#installation)
- [Features](#features)
- [Contributing](#contributing)
- [Team](#team)
- [FAQ](#faq)
- [Support](#support)
- [License](#license)


---

## Sample Code

```javascript
// code

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

```

---

## Installation


### Setup


>  install npm package

```shell
$ npm install
```

- For all of the packages used, refer to the package.json file [here](/package.json).

---

## Features
## Usage (Optional)
## Documentation (Optional)
## Tests (Optional)
## Contributing
## Team

> Contributors/People

| [**seansangh**](https://github.com/seansangh) |
| :---: |
| [![seansangh](https://avatars0.githubusercontent.com/u/45724640?v=3&s=200)](https://github.com/seansangh)    |
| [`github.com/seansangh`](https://github.com/seansangh) | 

-  GitHub user profile

---

## FAQ

- **Have any *specific* questions?**
    - Use the information provided under *Support* for answers

---

## Support

Reach out to me at one of the following places!

- Twitter at [`@wwinvestingllc`](https://twitter.com/wwinvestingllc?lang=en)
- Github at [`seansangh`](https://github.com/seansangh)

---

## Donations (Optional)

- If you appreciate the code provided herein, feel free to donate to the author via [Paypal](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=4VED5H2K8Z4TU&source=url).

[<img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/cc-badges-ppppcmcvdam.png" alt="Pay with PayPal, PayPal Credit or any major credit card" />](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=4VED5H2K8Z4TU&source=url)

---

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2019 © <a>S.S.</a>

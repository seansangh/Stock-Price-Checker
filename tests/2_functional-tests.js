
var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    
    suite('GET /api/stock-prices => stockData object', function() {
      
      test('1 stock', function(done) {
       chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'ebay'})
        .end(function(err, res){
          assert.equal(res.status, 200)
          assert.equal(res.body.stockData.stock, 'EBAY')
         
          //complete this one too
          
          done();
        });
      });
      
      test('1 stock with like', function(done) {
       chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'ebay', like: true})
        .end(function(err, res){
          assert.equal(res.status, 200)
          assert.equal(res.body.stockData.stock, 'EBAY')
          assert.equal(res.body.stockData.likes, 1)
         
          //complete this one too
          
          done();
        });        
      });
      
      test('1 stock with like again (ensure likes arent double counted)', function(done) {
       chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'ebay', like: true})
        .end(function(err, res){
          assert.equal(res.status, 200)
          assert.equal(res.body.stockData.stock, 'EBAY')
          assert.equal(res.body.stockData.likes, 1)         
          //complete this one too
          
          done();
        });        
      });
      
      test('2 stocks', function(done) {
       chai.request(server)
        .get('/api/stock-prices')
        .query({stock: ['ebay', 'msft']})
        .end(function(err, res){
          assert.equal(res.status, 200)
          assert.equal(res.body.stockData[0].stock, 'EBAY')
          assert.equal(res.body.stockData[1].stock, 'MSFT')
         
          //complete this one too
          
          done();
        });        
      });
      
      test('2 stocks with like', function(done) {
       chai.request(server)
        .get('/api/stock-prices')
        .query({stock: ['ebay', 'msft'], like: true})
        .end(function(err, res){
          assert.equal(res.status, 200)
          assert.equal(res.body.stockData[0].stock, 'EBAY')
          assert.equal(res.body.stockData[1].stock, 'MSFT')
         
         
          //complete this one too         
         
          done();
        });        
      });
      
    });

});

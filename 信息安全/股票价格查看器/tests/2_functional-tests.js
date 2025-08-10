const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const assert = chai.assert;

suite('Functional Tests', function() {
    this.timeout(5000);
    
    suite('GET /api/stock-prices => stock data object', function() {
        
        test('Viewing one stock: GET request to /api/stock-prices/', function(done) {
            chai.request(server)
                .get('/api/stock-prices')
                .query({ stock: 'AAPL' })
                .end(function(err, res) {
                    assert.equal(res.status, 200);
                    assert.property(res.body, 'stockData');
                    assert.property(res.body.stockData, 'stock');
                    assert.property(res.body.stockData, 'price');
                    assert.property(res.body.stockData, 'likes');
                    assert.isString(res.body.stockData.stock);
                    assert.isNumber(res.body.stockData.price);
                    assert.isNumber(res.body.stockData.likes);
                    done();
                });
        });
        
        test('Viewing one stock and liking it: GET request to /api/stock-prices/', function(done) {
            chai.request(server)
                .get('/api/stock-prices')
                .query({ stock: 'GOOGL', like: 'true' })
                .end(function(err, res) {
                    assert.equal(res.status, 200);
                    assert.property(res.body, 'stockData');
                    assert.property(res.body.stockData, 'stock');
                    assert.property(res.body.stockData, 'price');
                    assert.property(res.body.stockData, 'likes');
                    assert.isString(res.body.stockData.stock);
                    assert.isNumber(res.body.stockData.price);
                    assert.isNumber(res.body.stockData.likes);
                    assert.equal(res.body.stockData.stock, 'GOOGL');
                    done();
                });
        });
        
        test('Viewing the same stock and liking it again: GET request to /api/stock-prices/', function(done) {
            chai.request(server)
                .get('/api/stock-prices')
                .query({ stock: 'GOOGL', like: 'true' })
                .end(function(err, res) {
                    assert.equal(res.status, 200);
                    assert.property(res.body, 'stockData');
                    assert.property(res.body.stockData, 'stock');
                    assert.property(res.body.stockData, 'price');
                    assert.property(res.body.stockData, 'likes');
                    assert.isString(res.body.stockData.stock);
                    assert.isNumber(res.body.stockData.price);
                    assert.isNumber(res.body.stockData.likes);
                    assert.equal(res.body.stockData.stock, 'GOOGL');
                    done();
                });
        });
        
        test('Viewing two stocks: GET request to /api/stock-prices/', function(done) {
            chai.request(server)
                .get('/api/stock-prices')
                .query({ stock: ['AAPL', 'MSFT'] })
                .end(function(err, res) {
                    assert.equal(res.status, 200);
                    assert.property(res.body, 'stockData');
                    assert.isArray(res.body.stockData);
                    assert.lengthOf(res.body.stockData, 2);
                    
                    res.body.stockData.forEach(stock => {
                        assert.property(stock, 'stock');
                        assert.property(stock, 'price');
                        assert.property(stock, 'rel_likes');
                        assert.isString(stock.stock);
                        assert.isNumber(stock.price);
                        assert.isNumber(stock.rel_likes);
                    });
                    
                    done();
                });
        });
        
        test('Viewing two stocks and liking them: GET request to /api/stock-prices/', function(done) {
            chai.request(server)
                .get('/api/stock-prices')
                .query({ stock: ['AAPL', 'MSFT'], like: 'true' })
                .end(function(err, res) {
                    assert.equal(res.status, 200);
                    assert.property(res.body, 'stockData');
                    assert.isArray(res.body.stockData);
                    assert.lengthOf(res.body.stockData, 2);
                    
                    res.body.stockData.forEach(stock => {
                        assert.property(stock, 'stock');
                        assert.property(stock, 'price');
                        assert.property(stock, 'rel_likes');
                        assert.isString(stock.stock);
                        assert.isNumber(stock.price);
                        assert.isNumber(stock.rel_likes);
                    });
                    
                    done();
                });
        });
        
    });
});

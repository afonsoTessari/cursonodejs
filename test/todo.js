let chai = require('chai');
let chaiHttp = require('chai-Http');
chai.use(chaiHttp);
let expect = chai.expect;
let should = chai.should;

let server = require ('../server.js');

describe('Test server working',function(done){
    it('should get a server message', function(done){
        chai.request(server)
            .get('/')
            .end(function(err, res){
                expect(res.status).to.eql(200);
                done();
            });
    });
});

describe('Test ToDo working',function(done){

    let id;

    it('should get ToDo', function(done){
        chai.request(server)
            .get('/todo')
            .end(function(err, res){
                expect(res.body.success).to.eql(true);
                expect(res.body.todos).to.be.an('array');
                done();
            });
    });

    // test POST
    it('should create ToDos', function(done){
        chai.request(server)
            .post('/todo')
            .send({title: "Todo Teste"})
            .end(function(err,res){
                expect(res.body.success).to.eql(true);
                expect(res.body.todo).to.not.be.undefined;
                expect(res.body.todo.is_complete).to.eql(false);

                id = res.body.todo._id; //salvando para alterar
                
                done();
            })
    })
});


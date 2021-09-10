const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http');
const server = require('../server');
const {posts} = require('../sample')

chai.use(chaiHttp);
chai.should();



// Mocha provides us with two function calls describe() and it()
describe("Testing API /ping", () => {

	it("tests the base route and returns true for status", (done) => {

		chai.request(server)
		  .get('/api/ping')
		  .end((err, res) => {
				res.should.have.status(200);
				res.should.to.be.json;
				expect(res.body.data).to.be.an('undefined');
				expect(res.body.sucess).to.be.true;
            done();	
		  })
	    });

});




describe("Testing API /posts", () => {

	it("it should GET all the posts", (done) => {

		chai.request(server)
		    .get('/api/posts?tags=tech,history&sortBy=likes&direction=desc')
			.end((err, res) => { 
				// console.log(res.body);
				expect(res.body.posts).to.not.be.empty;
				res.should.have.status(200);
				res.body.posts.should.be.a('array');
			   done();
			})
	});

});

describe("Testing API /posts  without tags", () => {

	it("it should return an error response", (done) => {

		chai.request(server)
		    .get('/api/posts?tags=&sortBy=likes&direction=desc')
			.end((err, res) => { 
				res.should.have.status(400);
				res.body.error.should.equal('Tags parameter is required');
			   done();
			})
	});

});

describe("Testing API /posts  with invalid direction value", () => {

	it("it should return an error response", (done) => {

		chai.request(server)
		    .get('/api/posts?tags=tech&sortBy=likes&direction=xxx')
			.end((err, res) => { 
				res.should.have.status(400);
				res.body.error.should.equal('direction parameter is invalid');
			   done();
			})
	});

});

describe("Testing API /posts  with invalid sortBy value", () => {

	it("it should return an error response", (done) => {

		chai.request(server)
		    .get('/api/posts?tags=tech&sortBy=number&direction=desc')
			.end((err, res) => { 
				res.should.have.status(400);
				res.body.error.should.equal('sortBy parameter is invalid');
			   done();
			})
	});

});

describe("Testing API /posts  with specific tags , sortBy and direction", () => {

	it("data in response should be the same with sample.json", (done) => {

		chai.request(server)
		    .get('/api/posts?tags=history,tech&sortBy=likes&direction=desc')
			.end((err, res) => { 
				res.should.have.status(200);
				expect(res.body.posts).to.eql(posts);
			   done();
			})
	});

});
const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

var app = require("../app");

chai.use(chaiHttp);

describe("User login", () => {
  it("user login", (done) => {
    chai
      .request(app)
      .post("/user/login")
      .send({
        email: "vinay1@gmail.com",
        password: "qweRTY123$%^",
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.should.be.an("object");
        res.body.should.have.property("token");
      });
    done();
  });

  it("unsucessful user login", (done) => {
    chai
      .request(app)
      .post("/user/login")
      .send({
        email: "vinay1@gmail.com",
        password: "wrong-password",
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.should.be.an("object");
        res.body.should.have.property("message");
        res.body.message.should.be.eq("Incorrect Credentials");
      });
    done();
  });

  it("empty login", (done) => {
    chai
      .request(app)
      .post("/user/login")
      .send({
        email: "",
        password: "",
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.should.be.an("object");
        res.body.should.have.property("message");
        res.body.message.should.be.eq(
          "please pass a proper Email id and password"
        );
      });
    done();
  });
});

describe("Air quality index of all countries", () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjVlYWZiMzc4Mzk3NzJhOWZmNWJhNDAiLCJpYXQiOjE2NTAzOTAxMjN9.3JIQ9rQ-AL4ksYENauQ34k9VQLE119tV7511Ysywfos";
  it("get list of all countries", (done) => {
    chai
      .request(app)
      .get("/country/aqi")
      .set("x-access-token", token)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.should.be.an("object");
        res.body.data[0].should.have.property("_id");
        res.body.should.have.property("pageSize");
        res.body.should.have.property("page");
        res.body.should.have.property("total");
        res.body.should.have.property("data");
        res.body.data.should.be.an("array");
      });
    done();
  });
});

describe("details of a country with id", () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjVlYWZiMzc4Mzk3NzJhOWZmNWJhNDAiLCJpYXQiOjE2NTAzOTAxMjN9.3JIQ9rQ-AL4ksYENauQ34k9VQLE119tV7511Ysywfos";
  const id = "625afdd7bf74ece411fd1395";
  it("get details of a country", (done) => {
    chai
      .request(app)
      .get(`/country/aqiById?aqiId=${id}`)
      .set("x-access-token", token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.should.have.property("_id");
        res.body.data.should.have.property("city");
        res.body.data.should.have.property("region");
        res.body.data.should.have.property("country");
        res.body.data.should.have.property("airQuality");
        res.body.data.should.have.property("population");
        res.body.data.should.have.property("flag");
      });
    done();
  });
});

describe("All APIs", () => {
  it("login user, return data and data with id with token", (done) => {
    chai
      .request(app)
      .post("/user/login")
      .send({
        email: "vinay1@gmail.com",
        password: "qweRTY123$%^",
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("token");
        var token = res.body.token;

        chai
          .request(app)
          .get("/country/aqi")
          .set("x-access-token", token)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.should.be.an("object");
            res.body.data[0].should.have.property("_id");
            res.body.should.have.property("pageSize");
            res.body.should.have.property("page");
            res.body.should.have.property("total");
            res.body.should.have.property("data");
            res.body.data.should.be.an("array");
            var id = res.body.data[0]._id;

            chai
              .request(app)
              .get(`/country/aqiById?aqiId=${id}`)
              .set("x-access-token", token)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("_id");
                res.body.should.have.property("city");
                res.body.should.have.property("region");
                res.body.should.have.property("country");
                res.body.should.have.property("airQuality");
                res.body.should.have.property("population");
                res.body.should.have.property("flag");
              });
            done();
          });
      });
  });
});

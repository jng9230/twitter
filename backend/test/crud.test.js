// const request = require("supertest");
// require("dotenv").config({ path:"./config.env" });
const config = require("../config")
const mongoose = require('mongoose');
//connect to DB
const PORT = config.PORT || 5001;
const URI = config.ATLAS_URI_TEST;
const app = require("../app")
const User = require("../models/user");
const Tweet = require("../models/tweet");
const http = require('http');
import request from './request';

async function dropAllCollections() {
    const collections = Object.keys(mongoose.connection.collections)
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName]
        try {
            await collection.drop()
            // await collection.deleteMany();
        } catch (error) {
            // This error happens when you try to drop a collection that's already dropped. Happens infrequently. 
            // Safe to ignore. 
            if (error.message === 'ns not found') return

            // This error happens when you use it.todo.
            // Safe to ignore. 
            if (error.message.includes('a background operation is currently running')) return

            console.log(error.message)
        }
    }
}

beforeAll((done) => {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => { console.log("DB connected") })
        .catch(e => console.log(e))
        .finally(() => done())
});

test("users", () => {
    beforeEach(async () => {
        await dropAllCollections();
    });

    test("/test", (done) => {
        chai.request(app)
            .get("/test")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.result.should.be.eql("nice");
                done()
            })
    });

    test("GET /user", (done) => {
        chai.request(app)
            .get("/user/")
            .end((err, res) => {
                res.body.length.should.be.eql(0);
                done()
            })
    })

    test("POST /user", (done) => {
        const name = "John Ng";
        const email = "asdf123@gmail.com";
        chai.request(app)
            .post("/user/")
            .send({ name: name, email: email })
            .end((err, res) => {
                res.body.name.should.be.eql(name);
                res.body.email.should.be.eql(email);
                done()
            })
    });
})

// describe("books", () => {
//     let new_user;
//     before(async () => {
//         await dropAllCollections()

//         const user = new User({ name: "Test Tester", email: "email2@gmail.com" })
//         await user.save()
//         new_user = user
//     })

//     test("GET /book", async () => {
//         const book = new Book({ title: "test0", user: new_user._id })
//         await book.save()
//         chai.request(app)
//             .get(`/book/id/${book._id}`)
//             .end((err, res) => {
//                 res.body.should.have.property("book");
//                 res.body.should.have.property("quotes")
//                 res.body.book._id.should.be.eql(book._id.toString());
//                 res.body.book.title.should.be.eql(book.title)
//                 res.body.quotes.length.should.be.eql(0);
//             })
//     })

//     test("GET /all_for_user", async () => {
//         const book = new Book({ title: "test1", user: new_user._id })
//         await book.save()
//         chai.request(app)
//             .get(`/book/all_for_user/${new_user._id}`)
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.length.should.be.above(0);
//                 // res.body[0].title.should.be.eql(book.title);
//             })
//     });

//     test("POST /book", (done) => {
//         const title = "new book 22"
//         chai.request(app)
//             .post(`/book`)
//             .send({
//                 title: title,
//                 user_id: new_user._id
//             })
//             .end((err, res) => {
//                 res.body.title.should.be.eql(title);
//                 res.body.user.should.be.eql(new_user._id.toString());
//                 done()
//             })
//     });

//     test("DELETE /book", async () => {
//         const book = new Book({ title: "to be delete", user: new_user._id })
//         await book.save()
//         chai.request(app)
//             .delete("/book")
//             .send({ id: book._id })
//             .end((err, res) => {
//                 res.body.should.have.property("book")
//                 res.body.should.have.property("quotes")
//                 res.body.book.title.should.be.eql(book.title)
//                 res.body.book._id.should.be.eql(book._id.toString())
//                 res.body.quotes.deletedCount.should.be.eql(0)
//             })
//     })
// })

// describe("quotes", () => {
//     let new_user;
//     let new_book;
//     before(async () => {
//         await dropAllCollections()

//         const user = new User({ name: "adf waawa", email: "fake@gmail.com" })
//         await user.save()
//         new_user = user;

//         const book = new Book({ title: "to be added to", user: user._id })
//         await book.save()
//         new_book = book;
//     })

//     test("POST /quote", (done) => {
//         const text = "to be or not to be that is the q";
//         chai.request(app)
//             .post(`/quote/`)
//             .send({
//                 text: text,
//                 book: new_book._id,
//                 user_id: new_user._id
//             })
//             .end((err, res) => {
//                 res.body.text.should.be.eql(text);
//                 res.body.book.should.be.eql(new_book._id.toString());
//                 res.body.user.should.be.eql(new_user._id.toString());
//                 done();
//             })
//     })

//     test("GET /all_for_book", async () => {
//         const text = "pink frog purple toad";
//         const new_quote = new Quote({
//             text: text,
//             book: new_book._id,
//             user: new_user._id,
//         })

//         await new_quote.save();

//         chai.request(app)
//             .get(`/quote/all_for_book/${new_book._id}`)
//             .end((err, res) => {
//                 res.body.length.should.be.above(0);
//                 // res.body[0].text.should.be.eql(text); //race conditions -> can't test properly? 
//                 // res.body[0]._id.should.be.eql(new_quote._id.toString());
//             })
//     })

//     test("GET /all_for_user", async () => {
//         const text = "pink frog purple toad 3";
//         const new_quote = new Quote({
//             text: text,
//             book: new_book._id,
//             user: new_user._id,
//         })

//         await new_quote.save();

//         chai.request(app)
//             .get(`/quote/all_for_user/${new_user._id}`)
//             .end((err, res) => {
//                 res.body.length.should.be.above(0);
//             })
//     })

//     test("DELETE /quote", async () => {
//         const text = "blue blue blue asdsa a"
//         const new_quote = new Quote({
//             text: text,
//             book: new_book._id,
//             user: new_user._id,
//         })
//         await new_quote.save()

//         chai.request(app)
//             .delete("/quote")
//             .send({ id: new_quote._id })
//             .end((err, res) => {
//                 res.body.should.have.property("result")
//                 res.body.result.text.should.be.eql(text);
//                 res.body.result._id.should.be.eql(new_quote._id.toString());
//                 res.body.result.user.should.be.eql(new_quote.user.toString());
//                 res.body.result.book.should.be.eql(new_quote.book.toString())
//             })
//     })
// })


afterAll(async () => {
    await dropAllCollections();
    await mongoose.connection.close();
})
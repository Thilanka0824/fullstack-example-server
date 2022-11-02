
var express = require('express');
const { uuid } = require("uuidv4")
var router = express.Router();

const { db } = require("../mongo");


/* GET blogs listing. */
router.get('/all', async function (req, res, next) {

    try {
        const blogPost = await db()
            .collection('blogPosts')
            .find({}).toArray();
            console.log(blogPost)
        res.json({
            success: true,
            post: blogPost,
        });
    } catch (err) {
        console.log(err.name)
        res.json({
            success: false,
            error: err.toString()
        })
    }
});

/* GET one blog listing */

router.get('/get-one/:id', async (req, res) => {
    try{
        const idParam = req.params.id

        const blogPost = await db().collection("blogPosts").findOne({
            id: idParam
        })
        res.json({
            success: true,
            post: blogPost
        })
        // console.log(blogPost)
    }   
    catch(error) {
        console.error(err);
        res.json({
            success: false,
            error: err.toString()
        })
    } 
})

router.post("/create-one", async (req, res) =>{
    try {
        console.log(req.body)
        const newBlog = {
            ...req.body, //copying key:
            createdAt: new Date(),
            lastModified: new Date(),
            id: uuid()
        }

        const result = await db().collection("blogPosts").insertOne(newBlog)
        console.log(result)

        res.json({
            success:true
        })
    }
    catch (error) {
        console.error(err);
        res.json({
            success: false,
            error: err.toString(),
        });
    }
})

router.put("/update-one/:id", async (req, res)=>{
    
})
module.exports = router;
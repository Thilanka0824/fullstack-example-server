var express = require("express");
const { uuid } = require("uuidv4");
var router = express.Router();

const { db } = require("../mongo");

/* GET blogs listing. */
router.get("/all", async function (req, res, next) {
  try {
    const blogPost = await db().collection("blogPosts").find({}).toArray();
    console.log(blogPost);
    res.json({
      success: true,
      post: blogPost,
    });
  } catch (err) {
    console.log(err.name);
    res.json({
      success: false,
      error: err.toString(),
    });
  }
});

/* GET one blog listing */

router.get("/get-one/:id", async (req, res) => {
  try {
    const idParam = req.params.id;

    const blogPost = await db().collection("blogPosts").findOne({
      id: idParam,
    });
    res.json({
      success: true,
      post: blogPost,
    });
    console.log(blogPost);
  } catch (error) {
    // console.error(err);
    res.json({
      success: false,
      error: err.toString(),
    });
  }
});

router.post("/create-one", async (req, res) => {
  try {
    console.log(req.body);
    const newBlog = {
      ...req.body, //spreading the object
      //adding these k:v pairs
      createdAt: new Date(),
      lastModified: new Date(),
      id: uuid(),
    };

    const result = await db().collection("blogPosts").insertOne(newBlog);
    console.log(result);

    res.json({
      success: true,
    });
  } catch (error) {
    console.error(err);
    res.json({
      success: false,
      error: err.toString(),
    });
  }
});

router.put("/update-one/:id", async (req, res) => {
  try {
    console.log(req.body);
    const id = req.params.id;
    console.log(id)
    const title = req.body.title;
    const text = req.body.text;
    const author = req.body.author;
    
    const lastModified = new Date();
    // const categories = req.body.categories;

    const blogPutResult = await db()
      .collection("blogPosts")
      .update(
        { id: id },
        {
          $set: {
            title: title,
            text: text,
            author: author,
            lastModified: lastModified,
          },
        }
      );
      console.log(blogPutResult)

    res.json({
      success: true,
      putResult: blogPutResult,
    });
  } catch (error) {
    console.error(err);
    res.json({
      success: false,
      error: err.toString(),
    });
  }
});

router.delete("/delete-one/:id", async (req, res) => {
  try {
    const idParam = req.params.id //getting the req from the url

    const deletePost = await db().collection('blogPosts').deleteOne({
      id: idParam
    })

    res.json({
      success: true,
      post: deletePost
    })


  } 
  catch (error) {
    res.json({
      success: false,
      error: error.toString()
    })
  }
})


module.exports = router;


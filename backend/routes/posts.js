const router = require("express").Router();
const Post = require("../models/Post");
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const post = Post.findById(req.params.id);
    if (post.userId == req.body.userId) {
      await post.updateOne({ $set: reg.body });
      res.status(200).json("the post has beenn updated");
    } else {
      res.status(403).json("you can update only post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id/RSVP", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("RSVP recieved");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id/" , async (req,res) =>
{
  try{
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch(err){
    res.status(500).json(err);
  }
  });
router.get("/timeline/all", async (req, res) => {
  let postArray = [];
  try {
    const currentuser = await User.findById(req.body.userId);
    const userposts = await Post.find({ userId: currentuser._id });
    const friendPosts = awaitPromise.all(
      currentUser.followings.map((friendId) => {
        Post.find({ userId: friendId });
      })
    );

    res.json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

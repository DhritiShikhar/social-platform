const express = require("express");
const router = express.Router();
const Error = require("../../errors");
const apiHandler = require("../../apiHandler");
const passport = require("passport");
const Posts = require("../../controllers/posts");

/**
 * @route   GET api/posts/test
 * @desc    Tests posts route
 * @access  Public
 */
router.get("/test", async (req, res) => {
  try {
    let postsService = new Posts();
    let response = await postsService.testProfile();
    apiHandler(req, res, Promise.resolve(response));
  } catch (err) {
    console.log(err);
    apiHandler(req, res, Promise.reject(err));
  }
});
/**
 * @route   POST api/posts/
 * @desc    Create post
 * @access  Private
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let postsService = new Posts();
      let response = await postsService.createPost(req.user, req.body);
      apiHandler(req, res, Promise.resolve(response));
    } catch (err) {
      console.log(err);
      apiHandler(req, res, Promise.reject(err));
    }
  }
);

module.exports = router;

//Importing story category Model
const StoryCategory = require("./../models/StoryCategory");

class StoryCategoryController {
  /**
   * @api {get} /storyCategory/getAllStoryCategories get all categories
   * @apiName Get All Story Categories
   * @apiGroup StoryCategory
   */
  static async getAllStoryCategories(req, res) {
    StoryCategory.find().then(allStoryCategories => {
      res.status(200).send({
        success: true,
        data: allStoryCategories
      });
    });
  }

  //creating new story category
  /**
   * @api {post} /storyCategory/createNewStoryCategory create story category
   * @apiName Create Story category
   * @apiGroup StoryCategory
   * @apiParam {String} name Name of story category
   */
  static async createNewStoryCategory(req, res) {
    let storyCategory = new StoryCategory({
      name: req.body.name
    });

    storyCategory
      .save()
      .then(newstoryCategory => {
        res.status(200).send({ success: true, data: newstoryCategory });
      })
      .catch(err => {
        res.status(400).send("An error occoured", err.message);
      });
  }
}

module.exports = StoryCategoryController;

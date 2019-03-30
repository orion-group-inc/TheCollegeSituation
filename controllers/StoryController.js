//Importing story category Model
const Story = require("./../models/Story");
const StoryCategory = require("./../models/StoryCategory");
const base = 'https://collegesituation.firebrains.xyz/';

class StoryController {
  /**
   * @api {get} /story/getAllStories Get stories
   * @apiName Get Stories
   * @apiGroup Story
   */
  static async getAllStories(req, res) {
    Story.find()
      .populate("category")
      .populate("owner")
      .then(allStories => {
        allStories = allStories.map((item, index) => {
          item.photo = base+item.photo;
          return item;
        })
        res.status(200).send({
          success: true,
          data: allStories
        });
      });
  }

  //creating new story category
  /**
   * @api {post} /story/createNewStory Create story
   * @apiName Create Story
   * @apiGroup Story
   * @apiParam {String} title Title of story
   * @apiParam {String} description Description of story
   * @apiParam {String} featured  is the story featured?
   * @apiParam {String} category id of the story category
   * @apiParam {String} owner id of the student
   * @apiParam {String} photo base64 string of image
   */
  static async createNewStory(req, res) {
    let story = new Story({
      title: req.body.title,
      photo: req.body.photo,
      description: req.body.description,
      featured: req.body.featured,
      category: req.body.category,
      owner: req.body.owner
    });
    try{
      let storyCategory = await StoryCategory.findOne({_id: req.body.category});
      let newStory = await story.save();
      storyCategory.stories.push(newStory);
      await storyCategory.save();
      newStory.photo = base+newStory.photo;
      res.send({success: true, data: newStory})
    }catch(err){
      res.status(400).send("Category does not exist", err.message);
    }
    
  }

  
  //getting single story with ID
  /**
   * @api {get} /story/getSingleStory/:id Get single story
   * @apiName Get Single Story
   * @apiGroup Story
   */
  static async getSingleStory(req, res) {
    let id = req.params.id;
    Story.findOne({ _id: id })
      .populate("category")
      .populate("owner")
      .then(singleStory => {
        singleStory.photo = base+singleStory.photo;
        res.status(200).send({
          success: true,
          data: singleStory
        });
      })
      .catch(err => {
        res.status(400).send("An error occoured", err.message);
      });
  }
}

module.exports = StoryController;

//Importing story category Model
const Story = require("./../models/Story");

class StoryController {
  static async getAllStories(req, res) {
    Story.find()
      .populate("category")
      .populate("owner")
      .then(allStories => {
        res.status(200).send({
          success: true,
          data: allStories
        });
      });
  }

  //creating new story category

  static async createNewStory(req, res) {
    let story = new Story({
      title: req.body.title,
      photo: req.body.photo,
      description: req.body.description,
      featured: req.body.featured,
      category: req.body.category,
      owner: req.body.owner
    });

    story
      .save()

      .then(newstory => {
        res.status(200).send({ success: true, data: newstory });
      })
      .catch(err => {
        res.status(400).send("An error occoured", err.message);
      });
  }

  //getting single scholarshipwih ID

  static async getSingleStory(req, res) {
    let id = req.params.id;
    Story.findOne({ _id: id })

      .then(singleStory => {
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

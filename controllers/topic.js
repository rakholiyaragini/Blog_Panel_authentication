const topicModel = require('../models/topics/topicModel');
const subTopicModel = require('../models/subTopic/subTopicModel');
const addTopics = (req, res) => {
    console.log("add topic");
    topicModel.find({})
        .then(topic => {
            console.log("topics form my db", topic);
            res.render('pages/samples/topic', { data: req.user, topic: topic });
        })
        .catch(err => console.log(err));
}
const addTopicsController = async (req, res) => {
    console.log("add topic controller");
    console.log("req.body", req.body);
    const data = {
        topic: req.body.topic,
        user_id: req.user._id,
        creater_name: req.user.name
    };

    let model = new topicModel(data);
    console.log("model", model);
    await model.save();

    topicModel.find({})
        .then(topic => {
            console.log("topics form my db", topic);
            res.render('pages/samples/topic', { data: req.user, topic: topic });
        })
        .catch(err => console.log(err));

}
const deletTopics = async (req, res) => {
    console.log("delete blog");

    const topicId = req.params.id;

    const deletedTopic = await topicModel.findByIdAndDelete(topicId);
    console.log("deleted Topic con ", deletedTopic);


    res.redirect('/addTopics');
};

const subTopic = async (req, res) => {
    console.log("add sub topic");

    try {
        const subTopicData = await subTopicModel.find({}).populate('topic');
        const topicData = await topicModel.find({});

        console.log("sub topics from my db", subTopicData);
        console.log("topics from my db", topicData);
        console.log("req.user", req.user);


        res.render('pages/samples/subTopic', {
            data: req.user,
            topic: topicData,
            subtopic: subTopicData
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};
const subTopicContoller = async (req, res) => {
    console.log("add sub topic controller");

    try {
        if (!req.body.topic_id) {
            return res.status(400).send("Topic ID is required.");
        }

        const data = {
            subTopic: req.body.subTopic,
            topic: req.body.topic_id
        };

        let model = new subTopicModel(data);
        console.log("model", model);

        await model.save();

        res.redirect('/subTopic');
    } catch (err) {
        console.error("Error creating subtopic:", err);
        res.status(500).send("Server Error");
    }
};

const viewTopics = async (req, res) => {
    console.log("view topics");
    const allTopics = await topicModel.find({});
    const subTopics = await subTopicModel.find({}).populate('topic');

    const topicsWithSubtopics = allTopics.map(topic => {
        const relatedSubtopics = subTopics.filter(sub => sub.topic && sub.topic._id.toString() === topic._id.toString());
        return {
            ...topic._doc,
            subtopics: relatedSubtopics
        };
    });
    res.render('pages/samples/viewTopics', {
        data: req.user,
        topicsWithSubtopics: topicsWithSubtopics
    });
};
const deleteTopicAndSubTopics = async (req, res) => {
    const topicId = req.params.id;
    const userId = req.user._id;

    const topic = await topicModel.findById(topicId);

    if (topic.user_id.toString() !== userId.toString()) {

        return res.status(403).send('Unauthorized: You can only delete your own topics');
    }
    await topicModel.findByIdAndDelete(topicId);

    await subTopicModel.deleteMany({ topic: topicId });

    console.log("Topic and subtopics deleted....");

    res.redirect('/viewTopics');
};



module.exports = { addTopics, addTopicsController, deletTopics, subTopic, subTopicContoller, viewTopics, deleteTopicAndSubTopics };
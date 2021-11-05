const Message = require("../models/Messages.model");
const mqtt = require("mqtt");
const serverMqtt = mqtt.connect("mqtt://mqtt.lyaelectronic.com:1883");

const errorResponse = require("../helper/errorResponse");

exports.sendMessage = async (req, res, next) => {
  try {
    const { topic, message, userId } = req.body;
    const messageData = await Message.create({
      topic,
      message,
      userId,
    });

    res.status(200).json({
      status: 200,
      userId: messageData._id,
    });
    mqttSendMessage(topic, message);
  } catch (err) {
    next(
      new errorResponse("it wasn't possible to process request: " + err, 400)
    );
  }
};
function mqttSendMessage(topic, message) {
  serverMqtt.publish(topic, message);
}

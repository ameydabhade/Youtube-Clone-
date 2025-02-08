const Channel = require("../models/Channel");

const createChannel = async (req, res) => {
  try {
    const { name, avatarUrl } = req.body;

    const existingChannel = await Channel.findOne({
      name: name,
      userId: req.user._id,
    });

    if (existingChannel) {
      return res.status(400).json({
        message: "Channel with this name already exists",
      });
    }
    const channel = await Channel.create({
      name,
      avatarUrl,
      userId: req.user._id,
    });
    res.status(201).json(channel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const getUserChannels = async (req, res) => {
  try {
    const channels = await Channel.find({ userId: req.user._id });
    res.json(channels);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    if (channel.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this channel" });
    }

    const updatedChannel = await Channel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedChannel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete channel
const deleteChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    if (channel.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this channel" });
    }

    await channel.remove();
    res.json({ message: "Channel deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createChannel,
  getUserChannels,
  updateChannel,
  deleteChannel,
};

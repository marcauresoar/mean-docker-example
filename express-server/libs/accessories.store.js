
const mongoose = require('mongoose');

const dbHost = 'mongodb://localhost:27017/';

// Connect to mongodb
mongoose.connect(dbHost);

const accessorySchema = new mongoose.Schema({
  id: String,
  brand: String,
  filePath: String,
  created_at: Date
});

const Accessory = mongoose.model('Accessory', accessorySchema);

const createAccessoryLog = (id, brand, filePath, callback) => {
  let accessory = new Accessory({
      id: id,
      brand: brand,
      filePath: filePath,
      created_at: new Date()
  });

  accessory.save(error => {
      if (error) return callback(500, error);
      return callback(201, 'File imported successfully');
  });
};

const getAccessoryLogList = (callback) => {
  Accessory.find({}, (err, logs) => {
      if (err) return callback(500, err);
      return callback(200, logs);
  });
};

module.exports = { createAccessoryLog, getAccessoryLogList };

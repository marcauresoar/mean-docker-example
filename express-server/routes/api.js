// Import dependencies
const express = require('express');
const router = express.Router();
const accessories = require('../libs/accessories.lib.js');
const accStore = require('../libs/accessories.store.js');

/* GET api listing. */
router.get('/', (req, res) => {
        res.send('api works');
});

router.post('/accessories/upload', (req, res) => {
  if(!req.body.brand || !req.files)
    return res.status(400).send('Required params missing.');

  const brand = req.body.brand;

  const origin_file = req.files.origin_file;
  const sheet_file = req.files.sheet_file;

  origin_file.mv('upload/origin_file.json', function(err) {
    if (err)
      return res.status(500).send(err);

      sheet_file.mv('upload/sheet_file.csv', function(err) {
        if (err)
          return res.status(500).send(err);

          accessories(brand, (status, message) => {
            return res.status(status).send(message);
          });
      });
  });
});

router.get('/accessories/list', (req, res) => {
  accStore.getAccessoryLogList((status, data) => {
    return res.status(status).send(data);
  });
});

router.get('/accessories/download/:fileName', function(req, res){
  const fileName = req.param('fileName');
  const filePath = __dirname + '/../download/' + fileName;
  res.download(filePath);
});

module.exports = router;

const express = require('express');
const router = express.Router();
const controller = require('./../../controllers/tweets');
const authentication = require('./../../middleware/authentication');
const audits = require('./../../middleware/audits');

router
  .route('/')
  .post(authentication, audits, controller.newTweet)
  .get(controller.getTweets);

router.route('/comments').post(authentication, audits, controller.newComment);

router.route('/likes').post(authentication, audits, controller.newLike);

router.route('/stream/:username').get(controller.getTweetsStream);

router.route('/:id').get(controller.getTweet);

module.exports = router;

/* eslint-disable no-var */
/* eslint-env qunit */
var videojs = require('../../dist/video.js');

QUnit.module('Browserify Require');
QUnit.test('videojs should be requirable and bundled via browserify', function(assert) {
  assert.ok(videojs, 'videojs is required properly');
});

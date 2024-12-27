// middleware/visitorLogger.js
const Visitor = require('../models/Visitor');

const visitorLogger = (req, res, next) => {
    console.log(req)
  const visitorData = new Visitor({
    ip: req.ip,
    userAgent: req.headers['user-agent'],
    pageUrl: req.originalUrl,
    screenResolution: `${req.query.width}x${req.query.height}`,
  });

  visitorData.save()
    .then(() => next())
    .catch(err => {
      console.error('Error saving visitor data', err);
      next();
    });
};

module.exports = visitorLogger;

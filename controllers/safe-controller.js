exports.getSafePage = (req, res) => {
  res.render("safe");
};

exports.getErrorPage = (req, res) => {
  res.render("404");
};

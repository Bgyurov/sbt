exports.getSafePage = (req, res) => {
  res.render("safe" , {title: "Safe Page" , isSafe: true});
};

exports.getErrorPage = (req, res) => {
  res.render("404");
};

exports.getSafePage = (req, res) => {
  res.render("safe", {
    title: "Safe Page",
    isSafe: true,
    messages: req.flash(),
  });
};

exports.getErrorPage = (req, res) => {
  res.render("404");
};

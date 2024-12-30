exports.getMoneyPage = async (req, res) => {
  res.render("money" , {title: "Money Page" , isSafe: false});
};

//?Using this function for catching errors instead of using catch blocks
//takes in a function
module.exports = (fn) => {
  //amd return an anonymous function  in which we pass [AppError ]
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

const defaultController = (req , res) =>{
    res.render('index',{data: req.user});
}
module.exports = {defaultController}
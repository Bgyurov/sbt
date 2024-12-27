exports.getSafePage =  (req,res)=>{
    
    res.render('safe', {title: 'safe'})
}
exports.getErrorPage =  (req,res)=>{
    
    res.render('404')
}

exports.getMoneyPage = async (req,res)=>{
    res.render('money', {title: 'money'})
}
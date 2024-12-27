const router = require('express').Router()

const authService = require('../service/authService')


router.get('/login', (req,res)=>{
    res.render('auth/login')
})

router.post('/login', async (req,res)=>{
    const {email , password} = req.body

    try{
        const token = await authService.login(email,password)
        res.cookie('mycookie', token, {httpOnly: true})
    }catch(error){
        console.log(error.message);
       return res.render('auth/login' , {error: error.message})
    }
    res.redirect('/')
})




router.get('/register', (req,res)=>{
    res.render('auth/register')
})

router.post('/register', async (req, res,next)=>{
    const {username,email , password , repeatpassword} = req.body

    if(password !== repeatpassword){
        //throw new errror
        
        return res.render('auth/register',{error: 'Password Missmatch'})
    }
//verification for email
    const existingEmail = await authService.getUserbyEmail(email)
    // console.log(`Existing user - ${existingUser.username}` + ' '+ 'Email from form ' + email)
   if(existingEmail){
    console.log('email exist')
    return res.render('auth/register',{error: 'Email already exist'})
   }

   //verification for name 
//    const existingUser = await authService.getUserbyUsername(username)

//    if(existingUser){
//     console.log('username exist')
//     return res.render('auth/register')
//    }

    try {
        const user = await authService.register(username , email , password)
    } catch (error) {
        const errors = Object.keys(error.errors).map(key => error.errors[key].message)

        return res.render('auth/register',{error: errors[0]})
    }

    res.redirect('/login')
})

router.get('/logout',(req,res)=>{

    res.clearCookie('mycookie')
    res.redirect('/')
  })
  


module.exports = router
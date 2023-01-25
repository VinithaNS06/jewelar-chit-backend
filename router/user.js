const express     = require('express');
const router      =  new express.Router()
const User        = require('../model/user')
const {ObjectID}  = require('mongodb')
const authenticate = require('../middleware/auth')
const bcrypt    = require('bcryptjs')
const jwt       = require('jsonwebtoken')
var request = require('request');
const nodemailer = require('nodemailer');

router.post('/weblogin', async (req, res) => {
    try {
        const { email, password} = req.body
        if (email=='admin@gmail.com' && password=='admin@123') { 

                const payload = { user: {  id: 1234567890 } }
                jwt.sign(payload,'M8IT_SECRET_STRONG_PASS_FIND', {expiresIn: 10000}, (err, token) => {
                    if (err){
                        res.status(200).send({ status: "false",message: 'Error',data:err})
                    }
                    res.status(200).send({ status: "true",message: 'Login Success',data:{"access_token": token}})
                })
        }else{
            res.status(200).send({ status: "false",message: 'User or Password Invalid'})
        }        
    } catch (error) {
        res.status(200).send({ status: "false",message: 'Error'})
    }
})

router.post('/register', async (req,res) => {
    // console.log(req.body);
    const { name, phone,email, password } = req.body
    try {
        const Checkuser = await User.findOne({phone});
        const Checkuserr = await User.findOne({email});
        if (Checkuser) { return res.status(200).json({ status: false,message: 'User Phone Already Exists' }) }
        if (Checkuserr) { return res.status(200).json({ status: false,message: 'User Email Already Exists' }) }
        bcrypt.hash(password, 10, async (err, password) => {
            user = new User({
                name,
                phone,
                email,
                password
            })
            await user.save()

            const payload = { user: {  id: user.id } }
            jwt.sign(payload,'M8IT_SECRET_STRONG_PASS_FIND', {expiresIn: 10000}, (err, token) => {
                    if (err) throw err
                    res.status(200).send({ status: "true",message: 'Login Success',data:{"access_token": token}})
                }
            )
        });
    } catch (err) {
        console.log(err.message)
        res.status(200).send({ status: "false",message: 'Error in Solving'})
    }
})
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const Checkuser = await User.findOne({email});
        if (!Checkuser) { return res.status(200).json({ status: false,message: 'User Not Exists' }) }
        bcrypt.compare(password,Checkuser.password,(err, bResult) => { 
            if (err) {
                res.status(200).send({ status: "false",message: 'Error',data:err})
            } else if (bResult) {
                const payload = { user: {  id: Checkuser._id } }
                console.log("in");
                jwt.sign(payload,'M8IT_SECRET_STRONG_PASS_FIND', {expiresIn: 10000}, (err, token) => {
                    if (err){
                        res.status(200).send({ status: "false",message: 'Error',data:err})
                    }
                    res.status(200).send({ status: "true",message: 'Login Success',data:{"access_token": token}})
                })
            }else{
                res.status(200).send({ status: "false",message: 'Password Wrong'})
            }
        })    
        
    } catch (error) {
        res.status(200).send({ status: "false",message: 'Error in Solving'})
    }
})
router.post('/phonelogin', async (req, res) => {
    try {
        const { country_code, phone} = req.body
        const Checkuser = await User.findOne({phone});
        if (!Checkuser) { return res.status(200).json({ status: false,message: 'User Not Exists' }) }
                const payload = { user: {  id: Checkuser._id } }
                jwt.sign(payload,'M8IT_SECRET_STRONG_PASS_FIND', {expiresIn: 10000}, (err, token) => {
                    if (err){
                        res.status(200).send({ status: "false",message: 'Error',data:err})
                    }
                    res.status(200).send({ status: "true",message: 'Login Success',data:{"access_token": token}})
                })
   
    } catch (error) {
        res.status(200).send({ status: "false",message: 'Error in Solving'})
    }
})
router.post('/emaillogin', async (req, res) => {
    try {
        const { email} = req.body
        const Checkuser = await User.findOne({email});
        if (!Checkuser) { return res.status(200).json({ status: false,message: 'User Not Exists' }) }
                const payload = { user: {  id: Checkuser._id } }
                jwt.sign(payload,'M8IT_SECRET_STRONG_PASS_FIND', {expiresIn: 10000}, (err, token) => {
                    if (err){
                        res.status(200).send({ status: "false",message: 'Error',data:err})
                    }
                    res.status(200).send({ status: "true",message: 'Login Success',data:{"access_token": token}})
                })
   
    } catch (error) {
        res.status(200).send({ status: "false",message: 'Error in Solving'})
    }
})
router.post("/sendotp", async (req, res) => {
    console.log(req.body);
    try {
        
        const OTPCODE = Math.floor(100000 + Math.random() * 900000);
        const data = {
            otp : OTPCODE.toString()
        }
		const { country_code, phone, email} = req.body

        console.log("phone".phone)
        console.log("email".email)
        /* //////////////////////////////  SMS   ////////////////////////////////////// */
         if(phone !='' && phone !='undefined' && phone !='null' && phone !=null){
            console.log("phone")
            await
            request({
                url: 'http://sms1.erontech.com/httpapi/smsapi?uname=m8media&password=m8media@123&sender=MMEDIA&receiver='+phone+'&route=TA&msgtype=1&sms='+OTPCODE+'+is+the+OTP+for+login+into+Jwell+App.+#'+OTPCODE+'+Please+do+not+share+OTP+with+anyone.',
                method: 'GET',
            }, function(error, response, body){
                if(error) {
                    console.log(error);
                } else {
                    console.log(response.statusCode, body);
                }
            });
        }else
        /* //////////////////////////////  SMS   ////////////////////////////////////// */	

        /* //////////////////////////////  EMAIL   //////////////////////////////////// */
        if(email !='' && email !='undefined' && email !='null' && email !=null){
            console.log("email")
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                user: 'm8devapp@gmail.com',
                pass: 'ievwpnfihnpeyann' // naturally, replace both with your real credentials or an application-specific password
                }
            });
            
            const mailOptions = {
                from: 'm8devapp@gmail.com',
                to: email,
                subject: 'OTP From Jewel App',
            // text: '<h2>Dudes, we really need your money.<br><br>Test<h2>',
                html: "<h4>Hi,</h4>Welcome to Jwell app,<br>Please use this OTP <b>"+OTPCODE+"</b> to proceed the login."
            };
            await
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                console.log(error);
                } else {
                console.log('Email sent: ' + info.response);
                }
            });  
        }else{
            res.status(200).send({ status: "false",message: 'Invalid Data '})
        }      
        /* //////////////////////////////  EMAIL   //////////////////////////////////// */

        return res.status(200).json({ status: "true",message: 'Success', data:data })
    } catch (e) {
        console.error(e);
        res.status(200).send({ status: "false",message: 'Server Error'})
    }
});
router.post('users', authenticate, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) =>{
         return token.token !== req.token 
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})
router.post('logout', authenticate, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) =>{
         return token.token !== req.token 
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})


router.post('/users/logoutall', authenticate, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})



/* ////////////////////////////////////////  GET DATA  ////////////////////////////////// ///*/
router.get("/profile",authenticate,async (req, res) => {
    console.log(req.user.id);   
    try {
           
            // execute query with page and limit values
            const results = await User.find({ _id: req.user.id}).exec();
            res.status(200).send({ status: "true",message: 'Logged user List Loading Success', data:results})
        } catch (err) {
            res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
        }
});
/*///////////// /////////////////////////////  UPDATE DATA  ////////////////////////////////////////*/
router.put('/',authenticate, async (req, res) => {
    let loginid = req.user.id
    let phone = req.body.phone
    let email = req.body.email
    const Checkuser = await User.findOne({phone});
    const Checkuserr = await User.findOne({email});
    if (phone!='' && phone!=null && phone!=undefined && phone!='undefined' && phone!='null' &&
        Checkuser!='' && Checkuser!='null' && Checkuser!=null && Checkuser._id != loginid) {
        return res.status(200).json({ status: "false",message: 'Phone Already Exists' }) 
    }else 
    if (email!='' && email!=null && email!=undefined && email!='undefined' && email!='null' &&
    Checkuserr!='' && Checkuserr!='null' && Checkuserr!=null && Checkuserr._id != loginid) {
        return res.status(200).json({ status: "false",message: 'Email Already Exists' }) 
    }else{

        User.findByIdAndUpdate(loginid, req.body, (err, user) => {
            if (err) {
                return res.status(200).send({status: "false",message: "Error",errors: err  })
            };
            res.status(200).send({ status: "true",message: 'User Updated Success',data:user})
        });
    }
})

router.post('/changepass',authenticate, async (req, res) => {
    let loginuser = req.user.id;
    getpassword = await bcrypt.hash(req.body.password, 10)
    User.findByIdAndUpdate(loginuser, {password:getpassword}, (err, user) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'User Password Updated Success',data:user})
    });   
})

router.post('/resetpass', async (req, res) => {
    
    let phonenum  = req.body.phone
    let emailnum  = req.body.email
    let password  = req.body.password
    if(emailnum!='' && emailnum!=null && emailnum!=undefined && emailnum!='undefined' && emailnum!='null'){
         Checkuser = await User.findOne({email:emailnum});
    }else{
         Checkuser = await User.findOne({phone:phonenum});
    }
    getpassword = await bcrypt.hash(password, 10)
    User.findByIdAndUpdate(Checkuser._id, {password:getpassword}, (err, user) => {
        if (err) {
            return res.status(200).send({status: "false",message: "Error",errors: err  })
        };
        res.status(200).send({ status: "true",message: 'User Password Updated Success',data:user})
    });   
})


// get users

router.get("/get-users",async (req, res) => {  
    try {
            // execute query with page and limit values
            const results = await User.find({}).exec();
            res.status(200).send({ status: "true",message: 'fetched successfully', data:results})
        } catch (err) {
            res.status(200).send({ status: "false",message: 'Error in Solving', data:err})
        }
});



module.exports = router

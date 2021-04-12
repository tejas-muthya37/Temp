var express = require('express');
var router = express.Router();
var multer = require("multer");
var path = require("path");
var md5 = require("md5");
const userModel = require('../../model/admin/admin_model.js');
const { request, response } = require('express');
// router.use(uploadArray);
router.use(express.static('public'));
var common = require('../../config/common.js');


var storage = multer.diskStorage({
    destination: './uploads/profile',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})


var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg') //Appending .jpg
  }
})


const upload = multer({ storage: storage })

//Super -admin login
router.post("/validateSuperAdmin", upload.any(), (req, res) => {
    var data = {};
    console.log(req.body.uname);

    data['email'] = req.body.email;
    data['password'] = md5(req.body.password);
    
     userModel.validateSuperAdmin(data, function(response){
        console.log(response);
        return res.send(response);
    })
});




// --------------------------------------------------------------------------------

//Insert Register
router.post("/addRegister", upload.any(), (req, res) => {
    var data = {};
    
    console.log(req.body.uname);

    data['xfirstname'] = req.body.xfirstname;
    data['xlastname'] = req.body.xlastname;
    data['xdob'] = req.body.xdob;
    data['xeducation'] = req.body.xeducation;
    data['xdesignation'] = req.body.xdesignation;
    data['xemailID'] = req.body.xemailID;
    data['xpassword'] = md5(req.body.xpassword);
    data['xgender'] = req.body.xgender;
    data['xcontact'] = req.body.xcontact;
    data['xcountry'] = req.body.xcountry;
    data['xstate'] = req.body.xstate;
    data['xcity'] = req.body.xcity;
    data['xaddress1'] = req.body.xaddress1;
    data['xaddress2'] = req.body.xaddress2;


    // console.log(data);
    userModel.addRegister(data, function(response){
        console.log(response);
        return res.send(response);
    })
});



//VIEW ALL Register List 
router.get("/ViewAllRegister/", (req, res) => {
        // common.checkToken(req,res, (uData,token) =>  {
        userModel.ViewAllRegister(function(response){
            console.log(response);
            return res.send(response);
        }) 
    // });
});

router.get("/ViewOneRegister/:userid", (req, res) => {
    // common.checkToken(req,res, (uData,token) =>  {
    userModel.ViewOneRegister(req.params.userid, function(response){
        console.log(response);
        return res.send(response);
    }) 
// });
});


router.post("/DeleteOneRegister/:userid", (req, res) => {
    // common.checkToken(req,res, (uData,token) =>  {
    userModel.DeleteOneRegister(req.params.userid, function(response){
        console.log(response);
        return res.send(response);
    }) 
// });
});

// UPDATING SINGLE ROW


router.put("/UpdateRegister/:id", upload.any(), (req, res) => {
    var data = {};
    
    console.log(req.body.uname);
    data['id'] = req.params.id;

    data['name'] = req.body.name;
    data['email'] = req.body.email;
    data['dob'] = req.body.dob;
    data['phone'] = req.body.phone;
    data['prefered_language'] = req.body.prefered_language;
    data['city'] = req.body.city;


    // console.log(data);
    userModel.UpdateRegister(data, function(response){
        console.log(response);
        return res.send(response);
    })
});

router.post("/validateRegister", upload.any(), (req, res) => {
    var data = {};
    
    console.log(req.body.uname);

    data['xemailID'] = req.body.xemailID;
    data['xpassword'] = md5(req.body.xpassword);


    // console.log(data);
    userModel.validateRegister(data, function(response){
        console.log(response);
        return res.send(response);
    })
});


module.exports = router;

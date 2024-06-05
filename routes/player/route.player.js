var express = require('express');
var router = express.Router();

const player = require('../../models/cauthu.model');
const club = require('../../models/doibong.model');
const thongke = require('../../models/thongkecauthu.model');
var thamso= require('../../models/thamso.model');
var messagesSuccess = "";
router.get('/lookup/:seasonID', (req, res) => {
    let idMuaGiai = req.params.seasonID;
    
    thongke.thongkeCauthu(idMuaGiai).then(succ => {
        res.render('./layouts/main', {
            idSeason: idMuaGiai,
            danhsachcauthu : succ,
            chuyenmuc: 'Tra cứu cầu thủ',
            filename: '../player/players-detail',
            activeCauthu: true,
            cssfiles: [
                '../../public/vendors/datatables.net-bs4/css/dataTables.bootstrap4.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.min.css',
            ],
            jsfiles: [
                'https://code.jquery.com/jquery-3.3.1.min.js',
                '../../public/vendors/datatables.net/js/jquery.dataTables.min.js',
                '../../public/vendors/datatables.net-bs4/js/dataTables.bootstrap4.min.js',
                '../../public/assets/js/datatable.js',
                'https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.full.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.min.js',
            ]
        })
    })
    .catch(err=>{
        log.console("yyyyy"+err);
    });
})

router.get('/add/:seasonID', (req, res) => {
    let idMuaGiai = req.params.seasonID;
    club.find().then(succ=>{
        res.render('./layouts/main', {
            idSeason: idMuaGiai,
            danhsachdoibong: succ,
            chuyenmuc: 'Đăng ký cầu thủ',
            filename: '../player/add-player',
                    idSeason: idMuaGiai,
                    activeCauthu: true,
            cssfiles: [
                'https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/css/fileinput.min.css',
                "https://cdn.jsdelivr.net/npm/country-select-js/build/css/countrySelect.min.css"
    
            ],
            jsfiles: [
                'https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.full.min.js',
                '../../public/assets/js/add.player.validation.js',
                'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/js/fileinput.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/themes/fa/theme.min.js',
                "https://cdn.jsdelivr.net/npm/country-select-js/build/js/countrySelect.min.js",
                '../../public/assets/js/upload.img.js',            
            ],
            success: false,
        })
    })
    .catch(err=>{
        console.log(err)
    })
    
})

router.post('/add/:seasonID', (req, res) => {
    let idMuaGiai = req.params.seasonID;
    let entity = req.body;
    const dobStr = req.body.dob;
    const [day, month, year] = dobStr.split('/').map(part => parseInt(part, 10));
    const dob = new Date(year, month - 1, day);
    let now = new Date();
    let age = now.getFullYear() - dob.getFullYear();
    console.log(`day la tuoi cau thu: ${age}`)
    thamso.findByIdMuaGiai(idMuaGiai).then(info=>{

        if (age < info.tuoiMin || age > info.tuoiMax){
            var messagesSuccess = "Cầu thủ không nằm trong giới hạn tuổi";

            club.find().then(succ=>{
                res.render('./layouts/main', {
                    danhsachdoibong: succ,
                    chuyenmuc: 'Đăng ký cầu thủ',
                    filename: '../player/add-player',
                    idSeason: idMuaGiai,
                    activeCauthu: true,
                    cssfiles: [
                        'https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.min.css',
                        'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/css/fileinput.min.css',
                        "https://cdn.jsdelivr.net/npm/country-select-js/build/css/countrySelect.min.css"
            
                    ],
                    jsfiles: [
                        'https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.min.js',
                        'https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.full.min.js',
                        '../../public/assets/js/add.player.validation.js',
                        'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/js/fileinput.min.js',
                        'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/themes/fa/theme.min.js',
                        "https://cdn.jsdelivr.net/npm/country-select-js/build/js/countrySelect.min.js",
                        '../../public/assets/js/upload.img.js',            
                    ],
                    success: true ,
                    messagesSuccess: messagesSuccess
                })
            })
            .catch(err=>{
                console.log(err)
            })
        }
        else{
            player.add(entity, idMuaGiai)
                // club.findById(succ.doiBong).then(doibong=>{
                //     doibong.dsCauThu.push(succ.idCauThu)
                //     club.updateCauThu(succ.doiBong, doibong);
                // }).catch(err=>console.log(err.message))
                var messagesSuccess = "Đã thêm cầu thủ  \" " + entity.tenCauThu + " \" thành công";
                
                club.find().then(succ=>{
                    res.render('./layouts/main', {
                        idSeason: idMuaGiai,
                        danhsachdoibong: succ,
                        chuyenmuc: 'Đăng ký cầu thủ',
                        filename: '../player/add-player',
                        idSeason: idMuaGiai,
                        activeCauthu: true,
                        cssfiles: [
                            'https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.min.css',
                            'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/css/fileinput.min.css',
                            "https://cdn.jsdelivr.net/npm/country-select-js/build/css/countrySelect.min.css"
                
                        ],
                        jsfiles: [
                            'https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.min.js',
                            'https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.full.min.js',
                            '../../public/assets/js/add.player.validation.js',
                            'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/js/fileinput.min.js',
                            'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/themes/fa/theme.min.js',
                            "https://cdn.jsdelivr.net/npm/country-select-js/build/js/countrySelect.min.js",
                            '../../public/assets/js/upload.img.js',            
                        ],
                        success: true ,
                        messagesSuccess: messagesSuccess
                    })
                })
                .catch(err=>{
                    console.log(err)
                })
    
                // res.render('./layouts/main', {
                //     chuyenmuc: 'Đăng ký cầu thủ',
                //     filename: '../player/add-player',
                //     activeCauthu: true,
                //     cssfiles: [
                //     ],
                //     jsfiles: [
                //     ],
                //     messagesSuccess : messagesSuccess,
                //     success : messagesSuccess.length,
                // })
        }
    })
   


})

router.get('/edit/:id&:seasonID',(req,res)=>{
    let idMuaGiai = req.params.seasonID;
    var id = req.params.id;

    var p1 = club.find();
    var p2 = player.findById(id);
    var p3 = thongke.findByCauThu(id);

    Promise.all([p1,p2,p3]).then(values => {
        res.render('./layouts/main', {
            idSeason: idMuaGiai,
            danhsachdoibong: values[0],
            cauthu: values[1][0],
            thongke: values[2][0],
            chuyenmuc: 'Cập nhật cầu thủ',
            filename: '../player/edit-player',
                    idSeason: idMuaGiai,
                    activeCauthu: true,
            cssfiles: [
                'https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/css/fileinput.min.css',
                "https://cdn.jsdelivr.net/npm/country-select-js/build/css/countrySelect.min.css"
    
            ],
            jsfiles: [
                'https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/jquery-datetimepicker/2.5.20/jquery.datetimepicker.full.min.js',
                '../../public/assets/js/add.player.validation.js',
                'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/js/fileinput.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/5.0.3/themes/fa/theme.min.js',
                "https://cdn.jsdelivr.net/npm/country-select-js/build/js/countrySelect.min.js",
                '../../public/assets/js/upload.img.js',            
            ],
            success: false,
        })
    })

})

router.post('/edit/success/:id&:seasonID',(req,res)=>{
    let idMuaGiai = req.params.seasonID;
    var id = req.params.id;
    var obj = {
        idCauThu: id,
        tenCauThu: req.body.tenCauThu,
        loaiCauThu: req.body.loaiCauThu,
        quocTich: req.body.quocTich,
        ngaySinh: req.body.dob,
        soBanThang: req.body.sobanthang,
        soKienTao: req.body.sokientao,
        soTheDo: req.body.sothedo,
        soTheVang: req.body.sothevang,
        viTriThiDau: req.body.viTriThiDau,
        doiBong: req.body.doiBong,
    }

    var thongke_obj = {
        idMuaGiai: idMuaGiai,
        idCauThu: id,
        soBanThang: req.body.sobanthang,
        soKienTao: req.body.sokientao,
        soTheVang: req.body.sothevang,
        soTheDo: req.body.sothedo
    }

    Promise.all([
        player.update(obj),
        thongke.findAndUpdate(thongke_obj),
    ]).then(values => {
        res.redirect('/player/lookup/'+idMuaGiai)
    }).catch()
})


module.exports = router;
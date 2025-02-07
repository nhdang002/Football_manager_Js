var mongoose = require('mongoose');
const Schema = mongoose.Schema;
// schema
var thongkeSchema = new mongoose.Schema({
    idMuaGiai: {type:Schema.Types.ObjectId,ref:'muagiais',require:true},
    idCauThu: {type:Schema.Types.ObjectId,ref:'cauthus',require:true},
    soBanThang: Number,
    soKienTao: Number,    
    soTheVang: Number,
    soTheDo: Number,
})

const thongke_cauthu = mongoose.model('thongkecauthus',thongkeSchema);

module.exports = {

    thongkeCauthu: id => {
        return new Promise((resolve,reject)=>{
            thongke_cauthu.find({idMuaGiai: id})
            .populate('idCauThu','tenCauThu viTriThiDau tenDoiBong ngaySinh quocTich')
            .exec((err,dbs) => {
                if(err)
                    reject(err);
                else
                    resolve(dbs);
            })
        })
    },

    findByCauThu: id => {
        return new Promise((resolve,reject)=>{
            thongke_cauthu.find({idCauThu: id}).exec((err,dbs) => {
                if(err)
                    reject(err);
                else
                    resolve(dbs);
            })
        })
    },

    findByMuaGiai: id => {
        return new Promise((resolve,reject)=>{
            thongke_cauthu.find({idMuaGiai: id}).exec((err,dbs) => {
                if(err)
                    reject(err);
                else
                    resolve(dbs);
            })
        })
    },

    findAndUpdate: entity => {
        return new Promise((resolve,reject)=>{
            thongke_cauthu.findOneAndUpdate({idCauThu: entity.idCauThu},{
                idMuaGiai: entity.idMuaGiai,
                soBanThang: entity.soBanThang,
                soKienTao: entity.soKienTao,
                soTheVang: entity.soTheVang,
                soTheDo: entity.soTheDo
            }).exec((err,dbs) => {
                if(err)
                    reject(err);
                else
                    resolve(dbs);
            })
        })
    },

    add: (entity, idMuaGiai) => {
        return new Promise((resolve, reject) =>{
            var obj = new thongke_cauthu({
                idMuaGiai: idMuaGiai,
                idCauThu: entity._id,
                soBanThang: entity.soBanThang,
                soKienTao: entity.soKienTao,
                soTheVang: entity.soTheVang,
                soTheDo: entity.soTheDo
            })
            obj.save((err,succ) => {
                if(err)
                    reject(err);
                else{
                    resolve(succ);
                }
            })
        });
    }

}
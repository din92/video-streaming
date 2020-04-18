let {MongoClient,GridFSBucket,ObjectID} = require("mongodb");
let Busboy = require("busboy");
let dbObject;
MongoClient.connect("mongodb://127.0.0.1:26000,127.0.0.1:26001,127.0.0.1:26002/temp?replicaSet=alpha",{ useUnifiedTopology: true },(err,db)=>{
    if(err){
        console.error("Error in connecting mongodb",err);
    }
    dbObject=db;
});
let getObjectId=()=>{
    return new ObjectID();
}
let createRoutes=(common={})=>{
    let routeObj= common.routeObj;
    for(let route of routeObj){
        if(route){
            common[route.route]= new (require("."+route.path))(common);
            common[route.key]= common[route.route];
        }
    }
}
let allowUpload=(req, res, eachFile)=>{
    return new Promise(function (resolve, reject) {
        // console.log('check req',req);
        var busboy = new Busboy({headers: req.headers});
        let promises=[];
        busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            console.log(
                'File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
            promises.push(eachFile(fieldname, file, filename, encoding, mimetype));
        });
        busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
            console.log('Field [' + fieldname + ']: value: ' + val);
        });
        busboy.on('finish', function () {
            console.log('Done parsing form files!');
            Promise.all(promises).then(resolve);
        });

        busboy.on('error', function (err) {
            reject(err);
        });
        req.pipe(busboy);
    });
}
let uploadFile = async(req,res,readStream,fileName,mimetype)=>{

    var bucket = new GridFSBucket(dbObject.db("temp"), { bucketName: 'gridfsdownload' });
    let fileId = getObjectId();

    let uploadStream = bucket.openUploadStreamWithId(fileId,fileName,{
        metadata:{
            _id:fileId,
            fileName:fileName
        },
        contentType:mimetype
    });

    uploadStream.on("finish",(file)=>{
        console.log('file written', file.filename);
        res.send({message:"file written"})
    });
    uploadStream.on('error',function(err){
        console.log('error in writing file', err);
        res.send({message:"error in wrting data"});
    });
    readStream.pipe(uploadStream);
}

let downloadFile = (req,res,next)=>{
    let bucket = new GridFSBucket(dbObject.db("temp"),{bucketName:"gridfsdownload"});
    dbObject.db("temp").collection("gridfsdownload.files",async(err,collection)=>{
        if(err){
            console.log("error in downloading file",err);
           return res.send({error:err});
        }
        let arr = await collection.find({}).sort({_id:-1}).toArray()
        let data=arr[0];
        if(arr){
            let downloadStream = bucket.openDownloadStream(data._id);
            let str="data:" + data.contentType + ";base64,";
            downloadStream.on('data', function(data) {
                str+=  new Buffer.from(data).toString('base64');
            });
            downloadStream.on("end",()=>{
                return res.send(str);
            });
        }
    })
}
module.exports=(router,common)=>{
    router.get("/test",(req,res,next)=>{
        res.send("<h1>Router is working </h1>")
    });

    router.post("/uploadFile",(req,res,next)=>{
        allowUpload(req,res,async (fieldname, file, filename, encoding, mimetype)=>{
            await uploadFile(req,res,file,filename,mimetype)
        })
    });

    router.get("/downloadFile",(req,res,next)=>{
        downloadFile(req,res,next);
    });

    createRoutes(common);
    return router;
}
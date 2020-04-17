module.exports=(router)=>{
    router.get("/test",(req,res,next)=>{
        res.send("<h1>Router is working </h1>")
    });

    return router;
}
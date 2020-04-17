let createRoutes=(common={})=>{
    let routeObj= common.routeObj;
    for(let route of routeObj){
        if(route){
            common[route.route]= new (require("."+route.path))(common);
            common[route.key]= common[route.route];
        }
    }
}
module.exports=(router,common)=>{
    router.get("/test",(req,res,next)=>{
        res.send("<h1>Router is working </h1>")
    });
    createRoutes(common);
    return router;
}
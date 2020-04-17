class test {
    constructor(common){
        this.common=common;
    }
    async text(responder,data){
        console.log("printing data from test",data);
        responder.respond({done:true,data});
    }
}

module.exports =test;
var app = require("express")();



app.get("/", function(httpRequest, httpResponse, next){
    httpResponse.write(" World !!!");
    //httpResponse.end();
    next(); //remove this and see what happens 
});

app.use("/", function(httpRequest, httpResponse, next){
    httpResponse.write("Hello");
    
    httpResponse.end();
});

app.post("/", function(httpRequest, httpResponse, next){
    httpResponse.write(" Nguyen !!!");
    httpResponse.end();
});


app.listen(3003);
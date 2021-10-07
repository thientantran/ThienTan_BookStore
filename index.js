var express = require("express")
var app = express();

app.use(express.static(__dirname + "/public"));
var Handlebars = require("handlebars");
var expressHbs = require("express-handlebars");
var paginateHelper = require("express-handlebars-paginate");
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
var hbs = expressHbs.create({
    extname : "hbs",
    defaultLayout : 'layouts',
    layoutsDir : __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/',
    helpers:{
        paginate: paginateHelper.createPagination
    },
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});
app.engine('hbs', hbs.engine);
app.set("view engine",'hbs');


app.set('port', (process.env.PORT || 5000));

var indexRouter = require("./routes/index");
app.use("/", indexRouter)


var userRouter = require("./routes/users");
app.use("/users", userRouter)
var productRouter = require("./routes/products");
app.use("/products", productRouter)

app.use(function(req,res){
    res.render("error")
})

app.listen(app.get('port'), function(){
    console.log('Server is listening at port ' + app.get('port'))
})
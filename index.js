const express = require('express');
const bodyparser = require('body-parser');


const app = express();
const port = 3000;
var items = ["Buy Food", "Store Food", "Pack Food"];
var workitems =[];



app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get('/', (req,res)=>{
    var today = new Date();    
    var options = {
        weekday : "long",
    day : "numeric",
    month: "long"
    };
    
    var day = today.toLocaleDateString('en-US', options);




   
        res.render("list",{listTitle: day, newListItems: items});

    });

app.post('/', (req,res)=>{
    var item = req.body.newitem;
    items.push(item);
res.redirect("/");

});
app.get('/work', (req,res)=>{
    res.render("list", {listTitle: 'Work List', newListItems: workitems})
});

app.post('/work', (req,res)=>{
    let item = req.body.newitem;

if(req.body.list === "work"){
    workitems.push(item);
    res.redirect('/work');
    }else{

        items.push(item);
        res.redirect('/');
    }

})

app.get('/about', (req,res)=>{
res.render("about");
});

app.listen(port, (req,res)=>{

    console.log("App is listeining");
});

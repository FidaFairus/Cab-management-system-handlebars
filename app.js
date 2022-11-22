const http = require('http');
const url = require('url');
const fs = require('fs');
const qs = require('querystring');
const Handlebars = require('handlebars');
const cabsignup = require('./Data/cabsignup');
const path = require('path');

const { features } = require('process');

const server = http.createServer(function (req, res) {

    const link = url.parse(req.url, true);

    const query = link.query;

    const page = link.pathname;
    console.log(page,req.method)
    if (page == "/home") {

        let t = renderTemplate('home',{});

        res.end(t);
    }
    else if (page == "/login") {

        let t = renderTemplate('login',{});

        res.end(t);
    }
    else if (page == "/search") {

        let t = renderTemplate('search',{});

        res.end(t);
    }
    else if( page.startsWith("/static/images")){

        console.log(page);

        let fileName = page.replace("static/images", "");

        console.log(fileName);

        var file = fs.readFileSync("./static/images"  + fileName);

        res.end(file);

    }
    else if (page == "/signup" && req.method == "POST") {
        console.log('line 58')
        console.log('------------------------------------')
                let formData = '';
                
                req.on('data', function (data) {
                    formData += data.toString();
                });
        
                req.on('end', function () {
        
                
                    let userData = qs.parse(formData);
                    
                    console.log(userData);
                  
                    cabsignup.addOne(userData.FULLNAME, userData.MOBILE_NUMBER, userData.EMAIL,
                        userData.USERNAME, userData.PASSWORD, userData.CONFIRM_PASSWORD,
                        (err, result) => {
                            var context = {
                                result: {
                                    success: true,
                                    errors: []
                                }
                            };
                            if (err) {
                                context.result.success = false;
                                console.log(err);
                            }
                            else if(res){
                                console.log("SUCCESSFULL");
                            }
                            let t = renderTemplate('signup',context);
                            res.end(t);
                        });
        
                });
        
            }
    else if (page == "/signup" && req.method == "GET") {

        let template = renderTemplate('signup', {});
    
        res.end(template);

    }
    

});

server.listen(3000);

function renderTemplate(name) {

    var filePath = path.join(__dirname,"Templates",name + ".hbs");

    let templateText = fs.readFileSync(filePath, "utf8");

    let template = Handlebars.compile(templateText);

    return template()
}
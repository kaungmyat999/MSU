const express = require('express')
const app = express()
const port = 3000

require('dotenv').config()
const path = require('path')
const Users = require('../model/models/User.js');
const Projects = require('../model/models/Project');
const bodyParser = require('body-parser')
const { Sequelize } = require('sequelize');
const CookieParser = require('cookie-parser')
const cors = require('cors');
const filter = require('../lib/filter.js');
const Events = require('../model/models/Event.js');
const bcrypt = require('bcrypt')
const fs = require('fs')
const fileUpload = require('express-fileupload');
app.use(CookieParser())
app.use(cors('*'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())
app.use(express.json());
app.use(express.static(path.join(__dirname,'../../../view/dashboard')));
app.use(express.static(path.join(__dirname,'../../../view/login')))
const jwt = require('jsonwebtoken')
//app.use("/scripts", express.static(__dirname + '../../../view/dashboard'));
//app.use("/scripts",  express.static(__dirname + '/html/scripts'));
//C:\Users\kaung\Documents\Projects\JS\MSU\backend\JS\controller\index.js
const hash_password_checker = require('../lib/password_checker');
const main = require('../lib/gs.js');
const exportCSV = require('../lib/exportAsCSV.js');
const csvDeleter = require('../lib/deleter.js');
const User_Events = require('../model/models/user_events.js');
const { appengine_v1alpha } = require('googleapis');
const { application } = require('express');
const { datalabeling } = require('googleapis/build/src/apis/datalabeling/index.js');
const UserCreator = require('../lib/UserCreator.js');
const TokenGetter = require('../lib/tokenGetter.js');
const HashCreator = require('../lib/hashCreator.js');

//Middleware
function isAdmin(req,res,next) {
    let id = (req.cookies.userId);
    Users.findByPk(id).then(user => JSON.parse(JSON.stringify(user))).then( user => user.isAdmin ?  next() : res.redirect('/home'));
}

function HOME_AUTHETICATION(req,res,next) {


    try{
        TokenGetter('check',req.headers.cookie)
        
    }catch(err){
        if(err){
            console.log(err);
            res.redirect('/login')
        }
        console.log("Here");
    }
    
    if(req.cookies.loggedIn=='true'){
        next();

    }else{
        console.log("Cookie value is false");
        res.redirect('/login')
    }
    
    
}

function isStillLoggedIn(req,res,next){
    console.log(req.cookies);
    if(req.cookies.loggedIn == 'false' || !req.cookies.loggedIn){
        next();
    }else{
        res.redirect('/home')
    }

}

app.get('/',isStillLoggedIn,(req,res)=>{
    res.redirect('/login')
})
app.get('/login',isStillLoggedIn,(req,res)=>{
    res.sendFile(path.join(__dirname,'../../../view/login/login.html'))

})


app.get('/logout',(req,res)=>{
    console.log("Logout cookie",req.cookies);
    res.cookie('loggedIn',false)
    res.clearCookie('userId')
    console.log(req.cookies);
    res.redirect('/login')
})
app.get('/home',HOME_AUTHETICATION ,(req, res) => { 
    
  res.sendFile(path.join(__dirname,'../../../view/dashboard/html/dashhome.html'))
})


app.route('/review-profile/:id')
    .get(HOME_AUTHETICATION,(req,res)=>{
    res.sendFile(path.join(__dirname,'../../../view/dashboard/html/review_profile.html'))

})
    .post(HOME_AUTHETICATION,(req,res)=>{
    let data = JSON.parse(JSON.stringify(req.body))

    console.log("body_data ",data);
    Users.findOne({where:{fullName:data[0],position:data[1],status:data[3],createdAt:data[2]}}).then(data => res.json(data))

})

app.get('/profile/:id',(req,res)=>{
    res.sendFile(path.join(__dirname,'../../../view/dashboard/html/profile.html'))
})

app.post('/profile',(req,res)=>{
    let data = JSON.parse(JSON.stringify(req.body))

    console.log("body_data ",data);
    Users.findOne({where:{fullName:data[0],position:data[1],status:data[3],createdAt:data[2]}}).then(data => res.json(data))

})

app.get('/user-profile/:id',(req,res)=>{
    Users.findByPk(req.params.id).then(d => res.json(d))

})


app.get('/users',(req,res)=>{
    Users.findAll().then(data =>{
        res.json(data)
    })
})
const FILENAME = "itbuddies3.csv";

app.get('/users-download',async(req,res)=>{
    let users = await Users.findAll();
    await exportCSV(JSON.parse(JSON.stringify(users)), FILENAME)
    setTimeout(()=>res.download(path.join(__dirname,'../lib/output/'+FILENAME)),100000)
    res.download(path.join(__dirname,'../lib/output/'+FILENAME))
})

app.get('/delete-output',async(req,res)=>{
    await csvDeleter(FILENAME)
    res.send("Deleted")
})
app.get('/delete-file',(req,res)=>{
    fs.unlinkSync(path.join(__dirname,'../lib/output/'+FILENAME))
})


app.get('/users-count',(req,res)=>{
    Users.count().then(data => res.send(JSON.stringify(data)));
})

app.get('/users-gender',(req,res)=>{
    Users.findAll({attributes:['gender']}).then(data => {
        res.send(data)
        data = JSON.parse(JSON.stringify(data))
        console.log("Length -> ",data.length);
    })
})




app.post('/user-add',isAdmin,async (req,res)=>{
    data = JSON.stringify(req.body)
    data= JSON.parse(data)
    console.log(data);
    
    let user = await Users.create({
        fullName : data.fullName, 
        email : data.email,
        password : data.password,
        phone_no : data.phone,
        gender:filter(data.gender),
        //img : data.img,
        college : filter(data.college),
        position : data.position,
    
    })
    

})

app.post('/user-update/',isAdmin,async(req,res)=>{
    console.log(req.headers.referer);
    let data = JSON.parse(JSON.stringify(req.body));
    console.log('user-update',data);

    if(req.headers.referer.split('/')[3] == 'review-profile'){
        await  Users.update({
            status: data.status,
    
        },{where:{id:data.memberId }})
        res.json("Successfully Updated")
    }else{
        console.log("Here");
        data[0]=data[0].split('?')[0];
    
        try {
            await  Users.update({
                fullName : data[1], 
                email : data[2],
                phone_no : data[3],
                position : data[4],
                college : data[5],
    
            },{where:{id:data[0]}})
           
        } catch (error) {
            err ? console.log(err) : ''
        }
        res.json("Successfully Updated")
        
    }
    
    
    
    // await user.save()
})

app.post('/user-delete',isAdmin,(req,res)=>{
    let id = JSON.parse(JSON.stringify(req.body)).memberId;
    console.log("Delete => ",id);

    Users.destroy({where:{id:id}}).then(() => res.json("Deleted!"))
})



//Project

app.get('/project/:id',(req,res)=>{
    let id = JSON.parse(JSON.stringify(req.params.id))
    Projects.findByPk(id).then(data => res.json(data))
})
app.get('/project-add',(req,res)=>{
    res.sendFile(path.join(__dirname,'../../../view/dashboard/html/add_project.html'))
})

app.post('/project-add',isAdmin,async(req,res)=>{  
    let data = JSON.parse(JSON.stringify(req.body))
    console.log("Data",data);
    try {
        await Projects.create({
            name: data.project_name,
            date: data.date,
            lead_by: data.lead_by,
    
        })
    } catch (err) {
        err ? console.log(err) : res.cookie('Message','Problem in storing the uploaded data!')

    }
    res.cookie('Message','Succssfully_Uploaded')
    res.redirect('/project-add')
})

// app.post('/project-update',isAdmin,async(req,res)=>{  
//     data = JSON.stringify(req.body)
//     data =await JSON.parse(data)
//     try {
//         await Projects.update({
//             name: data.name,
//             date: data.date,
//             lead_by: data.leader_name,
    
//         },{where:{id:data.id[0]}})
//     } catch (err) {
//         err ? console.log(err) : res.cookie('Message','Problem in storing the uploaded data!')

//     }
//     res.cookie('Message','Succssfully_Uploaded')
//     res.redirect('/project-add')
// })

app.post('/project-update',async(req,res)=>{
    let data = JSON.parse(JSON.stringify(req.body));

    console.log(data);
    await Projects.update({
        name: data[1],
        leadby : data[2],
        location : data[3],
        date : data[4]    
    },{where:{id:data[0]}}).then(data => {
        console.log(data);
        res.json("Successfully Updated")
    })
})

app.get('/project-table',(req,res)=>{
    res.sendFile(path.join(__dirname,'../../../view/dashboard/html/projects.html'))
})

app.get('/projects',(req,res)=>{    
    Projects.findAll().then(data => res.send(JSON.stringify(data)))

})

app.post('/projects',isAdmin,(req,res)=>{
    let data = JSON.parse(JSON.stringify(req.body));
    console.log("posted data",data);
    data[2] == 'true' ? data[2]=1 : data[2]=0;
    Projects.findOne({where:{name:data[0],lead_by:data[1],hasFinished:data[2],date:data[3]}}).then(data => {
        console.log('returned Data',data);
        res.json(data);
    })

})

app.get('/projects-count',(req,res)=>{
    Projects.count().then(data => res.send(JSON.stringify(data)));
})


app.post('/project-delete',async(req,res)=>{
    console.log("Come In Data => " ,req.body);
    let data = JSON.stringify(req.body);
    data = await JSON.parse(data);
    Projects.destroy({where:{id:data.id}}).then(() => res.json("Successfully Deleted"))
})


app.get('/review-project/:id',(req,res)=>{
    res.sendFile(path.join(__dirname,'../../../view/dashboard/html/review-project.html'))

})
// app.post('/get-data',bodyParser.json(),(req,res)=>{
//     console.log("Param",req);
//     console.log((JSON.stringify(req.body)));
// })

app.get('/post-data',(req,res)=>{
    res.send()
})

app.get('/event-table',(req,res)=>{
    res.sendFile(path.join(__dirname,'../../../view/dashboard/html/events.html'))
})



app.get('/events',(req,res)=>{
    Events.findAll().then(data => res.json(data))
})

app.post('/events',isAdmin,(req,res)=>{
    let data = JSON.parse(JSON.stringify(req.body));
    console.log("posted data",data);

    Events.findOne({where:{name:data[0],leadby:data[1],location:data[2],date:data[3]}}).then(data => res.json(data))

})

app.get('/event/:id',(req,res)=>{
    let id = JSON.parse(JSON.stringify(req.params.id))
    Events.findByPk(id).then(data => res.json(data))
})

app.get('/review-event/:id',(req,res)=>{
    res.sendFile(path.join(__dirname,'../../../view/dashboard/html/review-event.html'))

})

app.get('/event-add',(req,res)=>{
    res.sendFile(path.join(__dirname,'../../../view/dashboard/html/add_event.html'))
})

app.post('/event-add',isAdmin,async(req,res)=>{
    let data = JSON.parse(JSON.stringify(req.body));
    console.log(data);
    let string = data[3]+data[0]+data[2];
    
    try {
        await Events.create({   
            name: data[0],
            leadby : data[1],
            location : data[2],
            date : data[3],
            hash : HashCreator(string) 
        })
    } catch (error) {
        err ? console.log(err) : res.cookie('Message','Problem in storing the uploaded data!')
    }
    res.cookie('message','Succssfully_Uploaded')
    // res.redirect('/event-add')
})

app.post('/event-update',async(req,res)=>{
    let data = JSON.parse(JSON.stringify(req.body));

    console.log(data);
    await Events.update({
        name: data[1],
        leadby : data[2],
        location : data[3],
        date : data[4]    
    },{where:{id:data[0]}}).then(data => {
        console.log(data);
        res.json("Successfully Updated")
    })
})

app.post('/event-delete',isAdmin,async(req,res)=>{
    Events.destroy({where : {id:req.body.id}}).then(()=>res.json("Successfully Deleted"))
})


//Login 

//Middleware
function USER_AUTHENTICATION(req,res,next){
    let data = JSON.parse(JSON.stringify(req.body));
    console.log("Password => ",data);
    Users.findOne({where: {email:data.email}}).then(d=>JSON.parse(JSON.stringify(d))).then(user=>{
        if(user){
            data.id=user.id;
            console.log(data);
            bcrypt.compare(data.password,user.password,(err,result)=>{
                console.log("Result",result);
                if(result){
                    res.cookie('userId',user.id)
                    next()
                }else{
                    res.redirect('/login')
                }
            })
            
        }
    })
    
} 
app.post('/login',USER_AUTHENTICATION,(req,res)=>{
    console.log("Passed the middleware");
    // let data = JSON.parse(req.body)
    // console.log("data ",data);
    jwt.sign({ foo: 'lar' }, 'secret',  function(err, token) {
        if(token){
            res.cookie('check', {isTrue : token} ,{
                expires: (new Date(Date.now()+900000)),
                httpOnly:true,
            })
            
            res.redirect('/home')
        }
        if(err){
            console.log(err);
            res.send(err);
        }
        

    });
    res.cookie('loggedIn',true);

                
        //     });
        // }
    // } )
    
    
})


const auth = (req,res,next)=>{
    console.log(req.cookies);
    if(req.cookies.check){
        token = req.cookies.check.isTrue;
        console.log(typeof(token),token);
        jwt.verify(token,'secret', function(err, decoded) {
            if(decoded){
                if(decode.foo == 'lar')
                    console.log("here");
                    next();
            }
            if(err){
                console.log(err);
            }
            
        });
    }else{
        res.send("Not Allowed")
    }


    
}

app.get('/gs-api/:range/:id',(req,res)=>{
    
    let range = req.params.range;
    let id    = req.params.id;
    main(range,id).then(data => {
        
        data.map(i=> {
            if(i=='Total'){
                res.send({range:range,total:data[data.indexOf(i)+1]})
            }
        } );
        
    })
    
})

app.get('/user-event',(req,res)=>{
    res.sendFile(path.join(__dirname,'../../../view/dashboard/html/event_attendance.html'))
})
app.get('/users-events',(req,res)=>{
    User_Events.findAll().then(data => {
        res.json(data)
    })
})


app.get('/chart', (req,res)=>{
    src = path.join(__dirname,'../../../view/dashboard/html/index.html')
    res.sendFile(src)
})

app.post('/user-approve',(req,res)=>{
    let data = JSON.parse(JSON.stringify(req.body))

    try{
        Users.update({status:'Member'},{where:{id:data.id}})

    }catch(err){
        err ? console.log(err) : res.send(`User Id ${data.id} is approved`)
    }

})

app.post('/user-reject',(req,res)=>{
    let data = JSON.parse(JSON.stringify(req.body))
    try{
        Users.destroy({where:{id:data.id}})
    }catch(err){
        err ? console.log(err) : res.send("Deleted!")
    }
   
    
})

app.get('/edit-profile',(req,res)=>{
    res.sendFile(path.join(__dirname,'../../../view/dashboard/html/profile.html'))
})

//Admin User Update

app.get('/user-update',(req,res)=>{
    let data = JSON.stringify(req.body)
    console.log(data);
})

app.get('/members',HOME_AUTHETICATION,(req,res)=>{
    
    res.sendFile(path.join(__dirname,'../../../view/dashboard/html/members.html'))
})

app.get('/admission',HOME_AUTHETICATION,isAdmin,(req,res)=>{
    res.sendFile(path.join(__dirname,'../../../view/dashboard/html/admission.html'))
})



// app.get('/pending',(req,res)=>{
//     Users.findAll().then(d=>JSON.parse(JSON.stringify(d))).then(data=>{
//         data.filter(d => {
//             console.log(d.id)
//             Users.update({status:'Pending'},{where:{id:d.id}})
//         })
//     });


     
//     //Users.update({status:"Pending"},Users.findAll)
// })

app.get('/event-attendence',(req,res)=>{
    res.sendFile(path.join(__dirname,'../../../view/dashboard/html/event_attendance.html'))
})

app.get('/finance',HOME_AUTHETICATION,isAdmin,(req,res)=>{
    res.sendFile(path.join(__dirname,'../../../view/dashboard/html/finance.html'))
    
})

app.post('/finance',(req,res)=>{
    let data = JSON.parse(JSON.stringify(req.body))
    console.log(data);
    let link = data.link
    let range = data.range;
    let name = data.name;
    let id    = data.link.match('d/[0-9A-Za-z_-]+')[0].split('/')[1];
    main(id,range).then(data => {
        let gsdata = {
            name : name,
            link : link,
            range: range,
            data : data
        }
        fs.writeFileSync(path.join(__dirname,'../data/finance/'+name+'_fin.json'),JSON.stringify(gsdata))
    })
    res.cookie('message',"Success")
    res.redirect('/finance')
    

})




app.get('/latest-finance-data',(req,res)=>{
    //let data = financeFileReader()
        
    fs.readdir(path.join(__dirname,'../data/finance/'),(err,files)=>{
        console.log("Files ");
        console.log(files[files.length-1]);
        let lastestFile = (files[files.length-1]);
        const data= require('../data/finance/'+lastestFile);
        console.log(data.data[1])
        res.json(JSON.stringify({total:data.data[1]}));
    } );
    
})

app.get('/read-finance-data',(req,res)=>{
    //let data = financeFileReader()
        
    fs.readdir(path.join(__dirname,'../data/finance/'),(err,files)=>{
        console.log("Files",files);
        let values = [];
        let names = [];
        for(let file of files){
            const data= require('../data/finance/'+file);
            names.push(data.name)
            values.push(data.data[1])

            //arr.push({name:data.name,total:data.data[1]})
            
        }
        
        res.json({data:{names,values}})
    } );
    

})
//Login //Sign_Up

app.post('/login',(req,res)=>{

})


app.get('/signup',(req,res)=>{
    
    res.sendFile(path.join(__dirname,'../../../view/login/index.html'))

})


app.post('/signup',async(req,res)=>{
    let data = JSON.parse(JSON.stringify(req.body))
    // console.log(data,req.files);
    // let image_data =req.files.image;
    // if(image_data){
    //     console.log("Here");
    //     await Imgs.create({name:image_data.name,data:image_data.data});
    //     console.log("Successfully Created");
    // }
    console.log("Data ",data);
    console.log(req.files);

    let buff = await(Buffer.from(req.files.img.data).toString('base64') );
    bcrypt.hash(data.password,10,(err,result)=>{
        err ? console.log(err) : '';
        console.log(result);
        if (result){
            try{
                Users.create({
                    fullName:data.fullName,
                    email:data.email,
                    password:result,
                    phone_no:data.phone,
                    gender:data.gender,
                    college: data.college,
                    position: data.position,
                    img :req.files.img.data
            
                })           

            }catch(err){
                err ? console.log(err) : ''
            }
            console.log("User created Successfully")
            res.redirect('/login')

        }
    })

    
    
})

// app.get('/get-img/:id',(req,res)=>{
//     let id = JSON.parse(JSON.stringify(req.params)).id
//     console.log("Requested ID: ",id);
//     Users.findByPk(id).then(data => JSON.parse(JSON.stringify(data))).then(async(data)=>{
//         //image.data.mv(path.join(__dirname  ,'../data/profile_images' , image.name));
//         let image = data.img;
//         console.log("Buffer \n",image,typeof(image) );

        
//         let buff = await(Buffer.from(image.data).toString('base64') );
        
//         const mimeType = 'image/png'; // e.g., image/png
//         await fs.writeFile(path.join(__dirname  ,'../data/profile_images/',data.fullName+'.png' ),buff,'base64',(err)=>{
//             console.log("Error \n",err);
//         })
//         res.send(`<img src="data:${mimeType};base64,${buff}" />`);
//     } )
// })

app.get('/get-img/:id',(req,res)=>{
    let id = JSON.parse(JSON.stringify(req.params)).id
    console.log("Requested ID: ",id);
    Users.findByPk(id).then(data => JSON.parse(JSON.stringify(data))).then(async(data)=>{
        //image.data.mv(path.join(__dirname  ,'../data/profile_images' , image.name));
        let image = data.img;
        console.log("Buffer \n",image,typeof(image) );

        
        let buff = await(Buffer.from(image.data).toString('base64') );
        
        const mimeType = 'image/png'; // e.g., image/png
        // await fs.writeFile(path.join(__dirname  ,'../data/profile_images/',data.fullName+'.png' ),buff,'base64',(err)=>{
        //     console.log("Error \n",err);
        // })
        //res.send(`<img src="data:${mimeType};base64,${buff}" />`);
        
        res.json({buf:buff})
    } )
})


//UserEvent addition by fetching the event token from the url if valid
// add the user into the USEREVENT DB

app.post('/user-event',(req,res)=>{
    
    let data = JSON.parse(JSON.stringify(req.body));
    let eventToken = data.eventToken;
    let userId = data.userId;
    if(eventToken){
        Events.findOne({where:{hash:eventToken}}).then(d=>JSON.parse(JSON.stringify(d))).then(event=>{
            console.log(event);
            User_Events.findOne({where:{eventId:event.id,userId:userId}}).then(d=>JSON.parse(JSON.stringify(d))).then(userEvent => {
                if(!userEvent){
                    if(event.id){
                        try{
                            User_Events.create({date:event.updatedAt,eventId:event.id,userId:Number(userId), })
                        }catch(err){
                            err ? console.log(err) : ''
                        }
                        console.log("UserEvent Created Successfully");
                    }
                }else{
                    let message = "Already Exist in DB"
                    console.log(message);
                    res.status(404).send(message)
                }
            })

            
        })
    }else{
        res.send('User Event Token is wrong');
    }
})


app.post('/img',async(req,res)=>{
    //console.log(req.headers['content-encoding']);

    const { image } = req.files;

    // If no image submitted, exit
    if (!image) return res.sendStatus(400);

    // Move the uploaded image to our upload folder
    //C:\Users\kaung\Documents\Projects\JS\MSU\backend\JS\data\profile_images
    image.mv(path.join(__dirname  ,'../data/profile_images' , image.name));
    console.log(req.files);
    // All good
    res.sendStatus(200);
    // fs.writeFile('super_imag.jpg',data.image,(err)=>{
    //     err ? console.log(err) : console.log('No Error');
    // })
})




app.post('/test',(req,res)=>{
    let data = JSON.parse(JSON.stringify(req.body))
    console.log("Files\n",req.files);
    console.log(data);
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



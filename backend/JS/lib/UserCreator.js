const Users = require("../model/models/User");

class UserCreator{
    
    setFullName(input){
        this.fullName = input
    }
    getfullName(){
       return  this.fullName;
    }

    getEmail(){
       return  this.email;
    }

    setEmail(input){
        this.email = input;
    }

    getPassword(){
       return  this.password;
    }

    setPassword(input){
        this.password = input
    }

    getPhoneNo(){
       return  this.phone_no;
    }
    setPhoneNo(input){
        this.phone_no=input
    }

    getGender(){
       return  this.gender;

    }
    setGender(input){
        this.gender= input;
    }

    getCollege(){
       return  this.college;
    }

    setCollege(input){
        this.college = input
    }

    getPosition(){
       return  this.position;
    }

    setPosition(input){
        this.position = input;
    }

    getStatus(){
       return  this.status;
    }

    setStatus(input){
        this.status = input;
    }

    getImage(){
        return this.image;
    }
    
    setImage(input){
        this.image = input
    }

    create(){
        Users.create({
            fullName : this.getFullName(),
            email : this.getEmail(),
            password : this.getPassword(),
            phone_no : this.getPhoneNo(),
            gender : this.getGender(),
            college : this.getCollege(),
            position : this.getPosition(),
            status : this.getStatus(),
            img  : this.getImage()
        })
    }

}
module.exports = UserCreator
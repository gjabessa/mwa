const mongoose = require("mongoose")
const User = mongoose.model("User");

const userError = 400;
const serverError = 500;
const success = 200;
const getAllUsers = function(req,res){
    User.find().exec(function(err,users){
        const response = {
            status: success,
            data: users
        }
        if(err){
            response.status =serverError;
            response.data = err;
        }
        else if(!users){
            response.status = userError;
            response.data = "User not found";
        }
        res.status(response.status).json(response.data)
    })
}

const search = function(req,res){
    console.log('test')
    if(req.query && req.query.kw){
        const username = req.query.kw;
        console.log(username)
        User.find({username: username}).exec(function(err,users){
            const response = {
                status: success,
                data: users
            }
            if(err){
                response.status =serverError;
                response.data = err;
            }
            else if(!users){
                response.status = userError;
                response.data = "User not found";
            }
            res.status(response.status).json(response.data)
        })
    } else {
        response.status = userError;
        response.data = "Incorrect input";
        res.status(response.status).json(response.data)
    }
    
}

const getOneUser = function(req,res){
    if(req.params && req.params.id){
        const id = req.params.id;
        User.findById(id).exec(function(err,user){
            const response = {
                status: success,
                data: user
            }
            if(err){
                response.status =serverError;
                response.data = err;
            } else if(!user){
                response.status = userError;
                response.data = "User not found";
            }
            res.status(response.status).json(response.data)
        })
    }
    
}

const createUser = function(req,res){
    const user = {
        name:req.body.name,
        budget: parseFloat(req.body.budget)
    }
    console.log(user)
    User.create(user,function(err,newUser){
        const response = {
            status: success,
            data: newUser
        }
        if(err){
            response.status =serverError;
            response.data = err;
        }
        res.status(response.status).json(response.data)
    })
}

function _fullUpdateUser(req,res,user){
    
    user.name = req.body.name;
    user.budget = parseFloat(req.body.budget);

    user.save(function(err,updatedUser){
        const response = {
            status: success,
            data: updatedUser
        }
        if(err){
            response.status =serverError;
            response.data = err;
        }
        res.status(response.status).json(response.data)
    })
}
const fullUpdateUser = function(req,res){
    const id = req.params.id;
    User.findById(id).exec(function(err,user){
        const response = {
            status: success,
            data: user
        }
        if(err){
            response.status =serverError;
            response.data = err;
        } else if(!user) {
            response.status = userError;
            response.data = "User not found";
        }

        if(user){
            _fullUpdateUser(req,res,user)
        } else {
            res.status(response.status).json(response.data)
        }
    })
}

const partialUpdate = function(req,res){

}

const deleteUser = function(req,res){
    const id = req.params.id;
    User.findByIdAndRemove(id).exec(function(err,user){
        const response = {
            status: success,
            data: user
        }
        if(err){
            response.status =serverError;
            response.data = err;
        } else if (!user){
            response.status = 404;
            response.data = "User not found";
        }
        res.status(response.status).json(response.data)
    })
}

module.exports = {getAllUsers,getOneUser,createUser, fullUpdateUser, partialUpdate, deleteUser, search}
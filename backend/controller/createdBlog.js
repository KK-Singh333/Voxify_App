const Blog = require("../models/blogs");
const { validateToken } = require("../Services/jwtAuth.js");
const { uid } = require('uid');
const express = require("express");
const handleCreatedBlog = async (req, res) => {
    console.log(req.body);
    
    const { Title, Content } = req.body;
    const author = validateToken(req.cookies['token']).Name;
    if(!(Title&&Content&&author)) return new Error("Please fill all entries");
    try {
        await Blog.create({
            id:uid(),
            Title: Title,
            Content: Content,
            Author: author,
        }
        )
        res.status(200);
        return res.json({
            errorflage: 'no',
            redirecturl:'/writeblog'
        });
    }
    catch (err) { 
        res.status(400);
        return res.json({
          errorflage: "yes",
          redirecturl: "/writeblog",
        });
    }

}
module.exports = handleCreatedBlog;
const  Blogs  = require("../models/blogs.js");
const express = require("express");
const mongoose = require("mongoose");
const handleSearch = async (req, res) => { 
    const AuthorOrTitle = req.body.keyword;
    console.log(AuthorOrTitle);
    
    const searchList = await Blogs.find({ $or: [{ Author: AuthorOrTitle }, { Title: AuthorOrTitle }] })
    console.log(searchList);
    
    if (!searchList.length) {
        return res.json({
            errorflag: 'yes',
            redirecturl: '/home',
            bloglist: {},
        });
    }
    return res.json({
        errorflag: 'no',
        redirecturl: '/viewblog',
        bloglist: searchList,
    });
}
module.exports = handleSearch;
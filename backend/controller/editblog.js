const Blogs = require("../models/blogs.js");
const express = require("express");
const mongoose = require("mongoose");
const { validateToken } = require("../Services/jwtAuth");
const handleEdit = async (req, res) => {
    try {
        const oldTitle = req.body.oldTitle;
        const newTitle = req.body.Title;
        const content = req.body.Content;
        const author = validateToken(req.cookies['token']).Name
        const result = await Blogs.updateOne({ Title: oldTitle }, {
            $set: {
                Title: newTitle,
                Content: content,
                Author: author,
            }
        });
        return res.json({
            errorflag: 'no',
            redirecturl: '',
        });
    }
    catch {
        return res.json({
            errorflag: 'yes',
            redirecturl:'',
        });
     }
};
module.exports = handleEdit;

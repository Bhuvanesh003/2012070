const express = require('express');
const http= require('http');
const fetch = require('node-fetch');
const app=express();

var st;
const requester = async (url)=>{
    
    const options={
        method:"GET"
    }
    const req= http.get(url,async (res)=>{

        res.setEncoding('utf-8');
        res.on('data',(chunk)=>{
            st=chunk;
        })
        res.on('end',()=>{
            console.log(st);
        })
        res.on('error',(err)=>{
            console.log(err);
        })
    });
    req.end();
};


app.get(`/numbers`,async (req,res,next)=>{
    console.log("Parameters");
    var urls=(req.query.url)
    var check=urls[0];
    var arr=[];
    if(check.length==1)
    {       
        await requester(urls)
        console.log("ST");
        setTimeout(()=>{
            if(st!==undefined)
            {
            st=JSON.parse(st);
            // arr.push(1);
            arr=st.numbers;
            arr.sort(function(a, b){return a - b});
            console.log(arr);
            const data ={"numbers":arr};
            res.json(data);
            }
            else
            {
                res.end("NO DATA");
            }
        },500);
        
    }
});

app.listen(3000,()=>{
    console.log("SERVER STARTED");
})

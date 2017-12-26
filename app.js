var express = require('express');
var mysql = require("mysql");
var app = express();

// var connection = mysql.createConnection({
//    //properties
//    host: 'localhost',
//    user: 'root',
//    password: '',
//    database: 'sampledb'
// });

var connection = mysql.createPool({

    connectionLimit: 50,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sampledb'
});


// connection.connect(function (error) {
//     if(!!error){
//         console.log('Error');
//     }else{
//         console.log('Connected');
//     }
// });
//
// app.get('/',function (req, resp) {
//     //about mysql
//    connection.query("select * from mySampleTable", function (error, rows, fields) {
//        //callback
//         if(!!error){
//             console.log('Error in the query');
//         }else{
//             console.log('Successful query');
//             //parse with your rows/fields
//             // console.log(rows);
//             // console.log(rows[0]);
//             console.log(rows[0].name);
//
//         }
//    }) ;
// });


app.get('/',function (req, resp) {
    //about mysql
    connection.getConnection(function (error, tempCont) {
        if(!!error){
            tempCont.release();
            console.log('Error');
        }else{
            console.log("Connected!");

            tempCont.query("select * from mySampleTable", function (error, rows, fields) {
               tempCont.release();
               if(!!error){
                   console.log('Error in the query');
               }else{
                   console.log('Successful query');
                   resp.json(rows);
               }
            });
        }
    }) ;
});


app.listen(1337);
const { connection } = require("../config/db");

const getStudentData = (req, res) => {
    console.log('Student Get Request');
    const { id } = req.params;
    if (id) {
        connection.query(`select * from student where studentId=${id}`, (err, result, fields) => {
            if (err) {
                console.log(err);
            }
            else if (result.length < 1) {
                res.send("No Data Found")
            }
            else {
                res.send(result)
            }
        })
    }
    else {
        connection.query("select * from student", (err, result, fields) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send(result)
            }
        })
    }
}

const postStudentData = (req, res) => {
    const { name, age } = req.body;
    const sql = `insert into student (name,age) values ("${name}",${age})`
    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.send("Error")
        }
        else {
            res.send("Insert One Record into Student");
        }
    })
}

const updateStudentData = (req, res) => {
    const { id } = req.params;
    connection.query(`select * from student where studentId=${id}`, (err, result) => {
        if (err) {
            console.log(err);
            res.send("Error in Update");
        }
        else {
            const name = req.body.name ? req.body.name : result[0].name;
            const age = req.body.age ? req.body.age : result[0].age;
            connection.query(`update student set name="${name}",age=${age}`, (err, result) => {
                if (err) {
                    console.log("Not able to update");
                }
                else {
                    res.status(200).send("Student Data Update");
                }
            })
        }
    })

}

const deleteStudentData = (req, res) => {
    const { id } = req.params;
    connection.query(`select * from student where studentId=${id}`, (err, result) => {
        if (err) {
            res.send("Please try again");
        }
        else {
            connection.query(`delete from student where studentId=${id}`, (err, result) => {
                if (err) {
                    res.send("Please try again Delete is not working");
                }
                else {
                    res.send("Student Data is Deleted");
                }
            })
        }
    });
}

module.exports = {
    getStudentData,
    postStudentData,
    deleteStudentData,
    updateStudentData
}
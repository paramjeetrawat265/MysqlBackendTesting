const { Router } = require("express");
const { postStudentData, getStudentData, deleteStudentData, updateStudentData } = require("../Controller/Student.Controller");

const StudentRoute = Router();

StudentRoute.get("/", getStudentData)

StudentRoute.get("/:id", getStudentData)

StudentRoute.post("/", postStudentData)

StudentRoute.patch("/:id", updateStudentData)

StudentRoute.delete("/:id", deleteStudentData)

module.exports = {
    StudentRoute
}
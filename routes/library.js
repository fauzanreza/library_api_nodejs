var express = require("express");
var router = express.Router();
const Validator = require("fastest-validator");
const v = new Validator();
const { Library } = require("../models");

  	// GET
router.get("/", async (req, res, next) => {
    const library = await Library.findAll();
    return res.json({
      status: 200,
      message: "Success get all data",
      data: library,
    });
  });
  
  // GET DATA BY ID
  router.get("/:id", async (req, res, next) => {
    const id = req.params.id;
    // check id in table library
    let library = await Library.findByPk(id);
    if (!library) {
      return res.status(404).json({ status: 404, message: "Data not found" });
    } else {
      return res.json({ status: 200, message: "Success get data", data: library });
    }
  });

  // POST
    router.post("/", async (req, res, next) => {
    // validation
    const schema = {
      title: "string",
      page: "string",
      year: "string",
      description: "string|optional",
    };
    const validate = v.validate(req.body, schema);
    if (validate.length) {
      return res.status(400).json(validate);
    }
    // proses create
    const library = await Library.create(req.body);
    res.json({
      status: 200,
      message: "Success create data",
      data: library,
    });
  });

  // PUT
    router.put("/:id", async (req, res, next) => {
    const id = req.params.id;
    let library = await Library.findByPk(id);
    if (!library) {
      return res.status(404).json({ status: 404, message: "Data not found" });
    }
    // validation
    const schema = {
        title: "string|optional",
        page: "string|optional",
        year: "string|optional",
        description: "string|optional",
      };
    const validate = v.validate(req.body, schema);
    if (validate.length) {
      return res.status(400).json(validate);
    }
    // proses update
    library = await library.update(req.body);
    res.json({
      status: 200,
      message: "Success update data",
      data: library,
    });
  });

  // DELETE
    router.delete("/:id", async (req, res, next) => {
    const id = req.params.id;
    // check id in table library
    let library = await Library.findByPk(id);
    if (!library) {
      return res.status(404).json({ status: 404, message: "Data not found" });
    }
  
    // proses delete data
    await library.destroy();
    res.json({
      status: 200,
      message: "Success delete data",
    });
  });

  module.exports = router;
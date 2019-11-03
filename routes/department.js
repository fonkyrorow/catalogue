const express = require("express");
const router = express.Router();
// recup Department sur l'autre fichier en usant require
const Department = require("../models/Department");

router.post("/create", async (req, res) => {
  const title = req.body.title;

  // on genere le new Department
  try {
    // on creer le new Department aec le Model
    const newDepartment = new Department({
      title: title
    });
    //on save le new department pour l'add a la bdd
    await newDepartment.save();
    res.status(201).send(newDepartment);
  } catch (error) {
    res.status(400).send({ error: "wrong parameters" });
  }
});

router.get("/", async (req, res) => {
  try {
    const departments = await Department.find(); // On recupere tous les Department
    res.json(departments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/update", async (req, res) => {
  try {
    const id = req.query.id;
    const title = req.body.title;
    if (id && title) {
      // on check si
      const department = await Department.findById(id); // Ici on recupere un département qui a comme id : req.body.id
      department.title = title; // Ici on met a jour le department qu'on a trouvé grace a l'id
      await department.save();
      res.json(department);
    } else {
      res.status(400).json({ error: "Wrong parameters" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const id = req.query.id;
    if (id) {
      const department = await Department.findById(id); // Ici on recupere un département qui a comme id : req.body.id
      await department.remove();
      res.send("Ok");
    } else {
      res.status(400).json({ error: "Wrong parameters" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

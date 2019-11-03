const express = require("express");
const router = express.Router();

const category = require("../models/");

router.get("/", (req, res) => {
  try {
    const categories = await Category.find(); // On recupere tous les Department
    res.json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/create", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const department = req.body.department;

  try {
    // on creer le new Department aec le Model
    const newCategory = new Category({
      title: title,
      description: description,
      department: department
    });
    //on save le new department pour l'add a la bdd
    await newCategory.save();
    res.status(201).send(newCategory);
  } catch (error) {
    res.status(400).send({ error: "wrong parameters" });
  }
});

router.put("/update", (req, res) => { 
  try {
  const id = req.query.id;
  const title = req.body.title;
  const description = req.body.description;
  const department = req.body.department;
  
  if (id && title) {
    // on check si
    const category = await Category.findById(id); // Ici on recupere un département qui a comme id : req.body.id
    category.title = title; // Ici on met a jour le department qu'on a trouvé grace a l'id
    await category.save();
    res.json(category);
  } else {
    res.status(400).json({ error: "Wrong parameters" });
  }
} catch (error) {
  res.status(400).json({ error: error.message });
}});

router.delete("/delete", (req, res) => {
  try {
    const id = req.query.id;
    if (id) {
      const category = await Category.findById(id); // Ici on recupere un département qui a comme id : req.body.id
      await category.remove();
      res.send("Ok");
    } else {
      res.status(400).json({ error: "Wrong parameters" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

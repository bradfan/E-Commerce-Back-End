const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// find all tags
  // be sure to include its associated Product data
router.get('/', async (req, res) => {
  try {
    const tagData = await ProuctTag.findAll({
    include: [Product, ProductTag],
  });
  res.status(200).json(tagData);
  }catch (err) {
    res.status(500).json(err);
  }
});
// find a single tag by its `id`
  // be sure to include its associated Product data
router.get('/:id', async (req, res) => {
  try{
    const tagData = await ProductTag.findByPk(req.params.id, {
      include: [Product, ProductTag],
    });
    if(!tagData){
      res.status(404).json({message: "No tag found with that #id"});
      return;
    }
  }catch (err){
    res.status(500).json(err);
  }
});
// create a new tag
router.post('/', async (req, res) => {
  try{
    const tagData = await ProductTag.create(req.body);
    res.status(200).json(tagData);
    }catch (err) {
      res.status(400).json(err);
    } 
});
// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try{
    const tagData = await ProductTag.update({
      tag_name: req.body.tag_name,
    },
    { 
      where: {
        id: req.params.id
      }
    },
    );
    req.json(tagData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try{
    const tagData = await ProductTag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({message: "No tag found with that #id"});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

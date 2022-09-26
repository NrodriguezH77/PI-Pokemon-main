const { Router } = require('express');
const { chargeAndGetAllTypes } = require('../controllers/controllerTypes')
const router = Router();

router.get('/', async (req, res) => {
   try {
        const infoApi = await chargeAndGetAllTypes();
        res.json(infoApi)
   } catch (error) {
        res.status(404).json({error: error.message})
   }
})


module.exports = router;
const userController=require('../controller/userController')

const express=require('express')
const router=express.Router();

router.post('/users/:username', userController.createUser);


router.put('/users/:username', userController.updateUser);


router.delete('/users/:username', userController.deleteUser);

router.get('/users/sort', userController.sortUsers);

module.exports = router;
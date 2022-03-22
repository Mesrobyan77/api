const express = require('express');
const getController = require('../Controller/getController');
const router = express.Router();

const postController = require('../Controller/postController');
const { Url, Voting, sequelize } = require('../model/db')

router.get('/',getController.home)


/**
 * @swagger
 * /addUrl:
 *    post:
 *      description: Add a new URL to the database
 *    parameters:
 *      - name: Url
 *        in: query
 *        description: Url link
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: A successful response
 *      '500':
 *         descroption: Server error
 */
// {require <<url>>"}
router.post('/addUrl',postController.addUrl);

module.exports = router

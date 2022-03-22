const { Url, Voting, sequelize } = require('../model/db')
const fetch = require('node-fetch');
const { stringify } = require('querystring');

class PostController {
    async addUrl(req, res) {
        if (!req.body.captcha)
            res.send({ success: false, msg: 'Please select captcha' })

        // Secret key
        const secretKey = '6LdpvDEUAAAAAHszsgB_nnal29BIKDsxwAqEbZzU';

        // Verify URL
        const query = stringify({
            secret: secretKey,
            response: req.body.captcha,
            remoteip: req.connection.remoteAddress
        });
        const verifyURL = `https://google.com/recaptcha/api/siteverify?${query}`;

        // Make a request to verifyURL
        const body = await fetch(verifyURL).then(res => res.json());

        console.log(body)

        // If not successful
        if (body.success !== undefined && !body.success)
            res.send({ success: false, msg: 'Failed captcha verification' });

        // If successful
        try {
            await Url.findOne({
                where: {
                    url: req.body.url
                }
            }).then(async r => {
                if (r) {
                    await Voting.findOne({
                        where: {
                            urlId: r.dataValues.id
                        }
                    }).then(async k => {
                        if (k) {
                            let likes = k.like
                            Voting.update({ like: likes + 1 }, { where: { urlId: k.urlId } })
                            res.status(200).send('OK')
                        } else {
                            let temp = {
                                urlId: r.id
                            }
                            Voting.create(temp)
                            res.status(200).send('OK')
                        }
                    })
                } else {
                    let temp = req.body.url
                    Url.create({
                        url: temp
                    })
                    res.status(200).send('OK')
                }
            })
        } catch (error) {
            res.status(500).send({
                error: 'oop something went wrong'
            })
        }
    }
}

module.exports = new PostController()
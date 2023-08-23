// api endpoint

import fs from 'fs'


import { withIronSessionApiRoute } from "iron-session/next";



function handler(req, res) {
    const index = req.query.index;
    // console.log({index})

    // array of images
    const images = []

    res.setHeader( 'Content-Type', 'image/png');
    const imageBuffer = fs.readFileSync('./public/muffinsndogs/dog1.png')
    res.send(imageBuffer)
}

export default withIronSessionApiRoute(
    function handler(req, res) {
        const index = req.query.index;
        // console.log({index})

        // Check if there are images in session
        if(!req.session.captchaImages){
            // array of images
            req.session.captchaImages = []
        }
    
        res.setHeader( 'Content-Type', 'image/png');
        const imageBuffer = fs.readFileSync('./public/muffinsndogs/dog1.png')
        res.send(imageBuffer)
    },
    {
        cookieName: "session",
        password: process.env.SESSION_SECRET,
    }
 
)
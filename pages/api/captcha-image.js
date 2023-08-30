// api endpoint

import fs from 'fs'
import { withIronSessionApiRoute } from "iron-session/next";



const dogProbability = 0.5;

export function newCaptchaImages(){
    return new Array(9)
    .fill(null)
    .map((val, index) => {

        // find random number and compare it with dog probability. If less than dog probability, save it on shouldbedog variable
        const shouldBeDog = Math.random() < dogProbability

        // generate random numbers equivalent to the amount of numbers in images
        let number;
        if (shouldBeDog){
            number = Math.floor(Math.random() * 10) + 1
        } else {
            number = Math.floor(Math.random() * 13) + 1
        }


        const fileName = (shouldBeDog ? 'dog' : 'muffin') + number + '.png' 
        
        return `./public/muffinsndogs/${fileName}`
    })
}


export default withIronSessionApiRoute(
    async function handler(req, res) {
        const index = req.query.index;
        // console.log({index})

        // Check if there are images in session
        if(!req.session.captchaImages){
            // save array of images
            req.session.captchaImages = newCaptchaImages();

            await req.session.save()
        }
    
        res.setHeader( 'Content-Type', 'image/png');
        const imageBuffer = fs.readFileSync( req.session.captchaImages[index])
        res.send(imageBuffer)
    },
    {
        cookieName: "session",
        password: process.env.SESSION_SECRET,
    }
 
)
// api endpoint

import fs from 'fs'

export default function handler(req, res) {
    res.setHeader( 'Content-Type', 'image/png');
    const imageBuffer = fs.readFileSync('./public/muffinsndogs/dog1.png')
    res.send(imageBuffer)
}
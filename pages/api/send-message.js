import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
    async function handler(req, res){
        const {message, selectedIndexes} = req.body;
        // validate captcha has dogs
        const dogsIndexes = req.session.captchaImages.map((path,index) => {
            return path.includes ('/muffinsndogs/dog') ? index : -1
        })
        .filter(index => index !== -1)


        // compare dog array with selected array
        const captchaIsCorrect = JSON.stringify(dogsIndexes) === JSON.stringify(selectedIndexes.sort());


        // console.log({message, selectedIndexes, cpatchaImages: req.session.captchaImages});

        // console.log({dogsIndexes, selectedIndexes, captchaIsCorrect})


        // send text messagge
        const sent = captchaIsCorrect

        res.json({captchaIsCorrect, sent})
    },
    {
        cookieName: "session",
        password: process.env.SESSION_SECRET,
    }
);
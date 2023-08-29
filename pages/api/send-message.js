import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
    async function handler(req, res){
        const {message, selectedIndexes} = req.body;
        // console.log({message, selectedIndexes});
        res.json({})
    },
    {
        cookieName: "session",
        password: process.env.SESSION_SECRET,
    }
);
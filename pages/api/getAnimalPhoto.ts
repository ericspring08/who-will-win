import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";

export default function handler(
        req: NextApiRequest,
        res: NextApiResponse
    ) {

    const { animal } = req.query;

    axios.get(`https://source.unsplash.com/1600x900/?${animal}`)
        .then(response => {
            res.status(200).json({photo: response.request.res.responseUrl})
        })
        .catch(error => {
            res.status(500).json({error: error})
        })
}
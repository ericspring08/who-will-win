import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";

export default function handler(
        req: NextApiRequest,
        res: NextApiResponse
    ) {

    const { animal } = req.query;

    axios.get(`https://pixabay.com/api/?key=${process.env.PIXELBAY_KEY}&q=${animal}&image_type=photo`)
        .then(response => {
            res.status(200).json({photo: response.data.hits[0].webformatURL})
        })
        .catch(error => {
            res.status(500).json({error: error})
        })
}
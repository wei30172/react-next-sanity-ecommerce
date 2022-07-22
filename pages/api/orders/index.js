import axios from "axios";
import nc from "next-connect";
import { sanityConfig } from "../../../utils/config";
import { isAuth } from "../../../utils/auth";

const handler = nc();

handler.use(isAuth);

handler.post(async (req, res) => {
  const projectId = sanityConfig.projectId;
  const dataset = sanityConfig.dataset;
  const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN;
  const { data } = await axios.post(
    `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
    {
      mutations: [
        {
          create: {
            _type: "order",
            createdAt: new Date().toISOString(),
            ...req.body,
            userName: req.user.name,
            user: {
              _type: "reference",
              _ref: req.user._id,
            },
          },
        },
      ],
    },
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${tokenWithWriteAccess}`,
      },
    },
  );

  res.status(201).send(data.results[0].id);
});
export default handler;

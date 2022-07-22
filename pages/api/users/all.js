import nc from "next-connect";
import { isAuth } from "../../../utils/auth";
import { client } from "../../../utils/client";

const handler = nc();

handler.use(isAuth);
handler.get(async (req, res) => {
  const users = await client.fetch(`*[_type == "user"]`);
  res.send(users);
});
export default handler;

import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { sanityConfig } from "./config";

export const client = sanityClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  apiVersion: "2022-03-10",
  useCdn: true,
  token: process.env.SANITY_AUTH_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

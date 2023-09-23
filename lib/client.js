import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
	projectId: "6rok1w6i",
	dataset: "production",
	apiVersion: "2023-09-22",
	useCdn: "true",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

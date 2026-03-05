import { siteContent } from "./src/content/site";
console.log("projects length", siteContent.projects.length);
console.log(siteContent.projects.map((p) => p.slug));

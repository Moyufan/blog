import { getCollection } from "astro:content";
import { urlFor } from "../utils/urlFor";
import { works } from "../data/works";

export async function GET() {
  const posts = await getCollection("blog");
  const sortedPosts = posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  const postList = sortedPosts.map((post) => ({
    id: post.id,
    data: {
      title: post.data.title,
      description: post.data.description,
      keywords: post.data.keywords,
      pubDate: post.data.pubDate,
      kind: "post",
      link: urlFor(`blog/${post.id}/`),
    },
  }));

  const workList = works.map((work) => ({
    id: work.id,
    data: {
      title: work.name,
      description: `${work.tagline} ${work.description}`,
      keywords: [...work.stack, work.category, work.status],
      kind: "work",
      link: urlFor(`works#${work.id}`),
    },
  }));

  return new Response(JSON.stringify([...postList, ...workList]), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

import { createContentLoader } from 'vitepress'

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return { string: '', time: 0 }
  return {
    string: d.toISOString().split('T')[0],
    time: d.getTime()
  }
}

type data = {
  yearMap: Record<string, string[]>;
  postMap: Record<string, any>;
  tagMap: Record<string, string[]>;
  linkMap: Record<string, string[]>;
};


export default createContentLoader("**/*.md", {
    transform(raw): data {
      const postMap = {};
      const yearMap = {};
      const tagMap = {};
      const linkMap = {};
      const posts = raw
        .map(({ url, frontmatter }) => {
          let tags = [];
          if (frontmatter?.tags) {
            tags = [...frontmatter.tags];
          }
          const result = {
            title: frontmatter.title,
            url,
            date: formatDate(frontmatter.date),
            abstract: frontmatter.abstract,
            tags,
            Link: frontmatter.Link || [],
          };
          postMap[result.url] = result;
          return result;
        })
        .sort((a, b) => b.date.time - a.date.time);

      posts.forEach((item) => {

        const year = new Date(item.date.string).getFullYear();
        if (!yearMap[year]) {
          yearMap[year] = [];
        }
        yearMap[year].push(item.url);

        const Link = item.Link
        if (!linkMap[Link]) {
          linkMap[Link] = [];
        }      
        linkMap[Link].push(item.url);

        item.tags.forEach((tag) => {
          if(!tagMap[tag]){
            tagMap[tag] = []
          }
          tagMap[tag].push(item.url)
        })
      });

      return {
        yearMap,
        postMap,
        tagMap,
        linkMap,
      };
    },
});
export const routes = {
   home: "/",
   informations: "/information",
   cuisines: "/cuisine",
   jeuxvideo: "/jeux-video",
   football: "/football",
   sites: "/sites",

   article: (type: string, slug: string) =>
      `/${type.toLowerCase()}/jeux/${slug}`,

   adminArticleEdit: (id: string) => `/admin/articles/${id}/edit`,
};

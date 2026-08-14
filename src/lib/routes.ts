export const routes = {
   home: "/",
   informations: "/informations",
   cuisines: "/cuisine",
   jeuxvideo: "/jeux-video",
   football: "/football",
   sites: "/sites",

   article: (category: string, slug: string) => `/article/${slug}`,

   adminArticleEdit: (id: string) => `/admin/articles/${id}/edit`,
};

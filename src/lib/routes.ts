export const routes = {
   home: "/",
   informations: "/informations",
   cuisines: "/cuisine",
   jeuxvideo: "/jeux-video",
   football: "/football",
   sites: "/sites",

   article: (...segments: string[]) => `/article/${segments.join("/")}`,

   adminArticleEdit: (id: string) => `/admin/articles/${id}/edit`,
};

export const routes = {
   home: "/",
   informations: "/information",
   cuisines: "/cuisine",
   jeuxvideo: "/jeuxvideo",
   leo: "/leo",
   caro: "/caro",
   mika: "/mika",
   maman: "/maman",
   sites: "/sites",

   article: (type: string, slug: string) => `/${type.toLowerCase()}/${slug}`,

   adminArticleEdit: (id: string) => `/admin/articles/${id}/edit`,
};

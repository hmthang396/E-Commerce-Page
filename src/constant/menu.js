export const MENUITEMS = [
   {
      title: 'Home', type: 'link', path: '/'
   },
   {
      title: 'Men', type: 'sub', children: [
         {
            title: 'Shoes', type: 'sub', children: [
               { path: '/search?subCategory=Nike&type=men', title: 'Nike', type: 'link' },
               { path: '/search?subCategory=Adidas&type=men', title: 'Adidas', type: 'link' },
               { path: '/search?subCategory=Gucci&type=men', title: 'Gucci', type: 'link' },
               { path: '/search?subCategory=MLB&type=men', title: 'MLB', type: 'link' },
               { path: '/search?subCategory=Louis Vuitton&type=men', title: 'Louis Vuitton', type: 'link' },
            ]
         }
      ],
   },
   {
      title: 'Women', type: 'sub', children: [
         {
            title: 'Shoes', type: 'sub', children: [
               { path: '/search?subCategory=Nike&type=women', title: 'Nike', type: 'link' },
               { path: '/search?subCategory=Adidas&type=women', title: 'Adidas', type: 'link' },
               { path: '/search?subCategory=Gucci&type=women', title: 'Gucci', type: 'link' },
               { path: '/search?subCategory=MLB&type=women', title: 'MLB', type: 'link' },
               { path: '/search?subCategory=Louis Vuitton&type=women', title: 'Louis Vuitton', type: 'link' },
            ]
         }
      ],
   },
   {
      title: 'Kids', type: 'sub', children: [
         {
            title: 'Shoes', type: 'sub', children: [
               { path: '/search?subCategory=Nike&type=kid', title: 'Nike', type: 'link' },
               { path: '/search?subCategory=Adidas&type=kid', title: 'Adidas', type: 'link' },
               { path: '/search?subCategory=Gucci&type=kid', title: 'Gucci', type: 'link' },
               { path: '/search?subCategory=MLB&type=kid', title: 'MLB', type: 'link' },
               { path: '/search?subCategory=Louis Vuitton&type=kid', title: 'Louis Vuitton', type: 'link' },
            ]
         }
      ],
   },
]


import { ASSET_DIR } from "hgss-dir"

type UserExtended = {
  name    : string;
  email   : string;
  role    : 'admin' | 'user';
  avatar  : string;
  password: string;
}

type GalleryPreLoadType = {
  title       : string;
  description : string;
  cover       : string;
  galleryItems: {
    title      : string;
    description: string;
    image      : string;
  }[];
}

export const _mockData: { users: UserExtended[]; products: CreateProduct[]; gallery: GalleryPreLoadType[] } = {
  users: [
    {
      name    : 'Admin User',
      email   : 'admin@homegrownspeed.shop',
      role    : 'admin',
      password: '123456',
      avatar  : 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin-2021-09-01'
    },
    {
      name    : 'Hank Hill',
      email   : 'propane.love@strickland.com',
      role    : 'user',
      password: '123456',
      avatar  : 'https://api.dicebear.com/7.x/avataaars/svg?seed=hank-2021-09-01'
    }
  ],
  products: [
    {
      model      : '[EP70/71] Toyota Starlet',
      name       : 'Starlet Cupholder',
      slug       : 'starlet-cupholder',
      description:
        'Our tough ABS plastic cupholder utilises the spring and screws from your OEM ashtray and instals in the same manor.  Made to securely hold 2x standard 355ml cans.  500ml cans with the same base diameter will fit but touch against the dashboard.',
      price         : '19.99',
      images        : ['https://hgss-fus-prod.s3.ap-southeast-2.amazonaws.com/upload/0e490da1-031b-4dbe-9da5-6cce16436dfc-IMG_1043.webp'],
      specifications: ['Made from premium materials', 'Lasts a lifetime', 'Eco-friendly', 'Comes in multiple colors'],
      brand         : 'Toyota',
      stock         : 10,
      category      : 'Automotive',
      banner        : '',
      isFeatured    : false
    },
    {
      model      : '[EP70/71] Toyota Starlet',
      name       : 'Guage Pod',
      slug       : 'guage-pod',
      description:
        'This gauge pod is specifically designed for EP70/71 Starlets and replaces the OEM clock and bezel.  With it’s tough ABS plastic construction it looks at home atop the dashboard.  Designed for standard 52mm gauges.  Please note that outer gauges may only be able to fasten inner nut to retain, depending on length of gauge.',
      price         : '29.99',
      images        : ['https://hgss-fus-prod.s3.ap-southeast-2.amazonaws.com/upload/0e490da1-031b-4dbe-9da5-6cce16436dfc-IMG_1043.webp'],
      specifications: ['Made from premium materials', 'Lasts a lifetime', 'Eco-friendly', 'Comes in multiple colors'],
      brand         : 'Toyota',
      stock         : 10,
      category      : 'Automotive',
      banner        : '',
      isFeatured    : false
        //      rating: 0,
        // numReviews: 0
    },
    {
      model      : '2EE Toyota',
      name       : 'ITB Kit',
      slug       : 'itb-kit',
      description: `
              This Individual throttle body kit is designed as a bolt on unit for the Toyota 2EE Engine.  It sports all the necessary components to get your 2EE converted to ITBS!
                  -40mm Throttle bodies
                  -Carbon Fibre Nylon runners
                  -Aluminium cylinder head flange
                  -Your choice of Carbon fibre Nylon or Chrome plated velocity stacks
                  -Linkages and throttle arms allow for fine adjustment of butterflies
                  -Vacuum block allows for retention of brake booster and map sensor
              For best results we recommend tuning the engine on an aftermarket ECU with a variable TPS sensor.  Units are carefully assembled and thoroughly checked but will require an experienced mechanic to install, set up and tune correctly.
          `,
      price         : '39.99',
      images        : ['https://hgss-fus-prod.s3.ap-southeast-2.amazonaws.com/upload/0e490da1-031b-4dbe-9da5-6cce16436dfc-IMG_1043.webp'],
      specifications: ['Made from premium materials', 'Lasts a lifetime', 'Eco-friendly', 'Comes in multiple colors'],
      brand         : 'Toyota',
      stock         : 10,
      category      : 'Automotive',
      banner        : '',
      isFeatured    : false
        // rating: '0',
        // numReviews: 5
    },
    {
      model      : '[EP70/71] Toyota Starlet',
      name       : "'INTERCOOLER TURBO' Badge",
      slug       : 'intercooler-turbo-badge',
      description:
        'This is a reproduction of the rare and coveted ‘Intercooler Turbo’ badge found on some EP71 Turbo S Starlets.  Through redesigning this badge we have added captive threads instead of the screws of the original design to assure it stands the test of time.  Constructed from tough ABS plastic.',
      price         : '1149.99',
      images        : ['https://hgss-fus-prod.s3.ap-southeast-2.amazonaws.com/upload/0e490da1-031b-4dbe-9da5-6cce16436dfc-IMG_1043.webp'],
      specifications: ['Made from premium materials', 'Lasts a lifetime', 'Eco-friendly', 'Comes in multiple colors'],
      brand         : 'Toyota',
      stock         : 10,
      category      : 'Automotive',
      banner        : '',
      isFeatured    : false
        // rating: 0,
        // numReviews: 0
    },
    {
      model      : '[EP70/71] Toyota Starlet',
      name       : 'TOYOTA Badge',
      slug       : 'toyota-badge',
      description:
        'This is a reproduction of the ‘TOYOTA’ badge found on the pre-facelift EP70/71 Starlets.  Through redesigning this badge we have added captive threads instead of the screws of the original design to assure it stands the test of time.  Constructed from tough ABS plastic.',
      price         : '149.99',
      images        : ['https://hgss-fus-prod.s3.ap-southeast-2.amazonaws.com/upload/0e490da1-031b-4dbe-9da5-6cce16436dfc-IMG_1043.webp'],
      specifications: ['Made from premium materials', 'Lasts a lifetime', 'Eco-friendly', 'Comes in multiple colors'],
      brand         : 'Toyota',
      stock         : 10,
      category      : 'Automotive',
      banner        : '',
      isFeatured    : false
    },
    {
      model      : '[EP70/71] Toyota Starlet',
      name       : "'SI' Badge",
      slug       : 'si-badge',
      description:
        'This is a reproduction of the ‘TOYOTA’ badge found on the facelifted EP70/71 Starlets.  Through redesigning this badge we have added captive threads instead of the screws of the original design to assure it stands the test of time.  Constructed from tough ABS plastic.',
      price         : '50.99',
      images        : ['https://hgss-fus-prod.s3.ap-southeast-2.amazonaws.com/upload/0e490da1-031b-4dbe-9da5-6cce16436dfc-IMG_1043.webp'],
      specifications: ['Made from premium materials', 'Lasts a lifetime', 'Eco-friendly', 'Comes in multiple colors'],
      brand         : 'Toyota',
      stock         : 10,
      category      : 'Automotive',
      banner        : '',
      isFeatured    : false
    },
    {
      model      : '[EP70/71] Toyota Starlet',
      name       : "'TEST_SI' Badge",
      slug       : 'test-si-badge',
      description:
        'This is a reproduction of the ‘TOYOTA’ badge found on the facelifted EP70/71 Starlets.  Through redesigning this badge we have added captive threads instead of the screws of the original design to assure it stands the test of time.  Constructed from tough ABS plastic.',
      price         : '50.99',
      images        : ['https://hgss-fus-prod.s3.ap-southeast-2.amazonaws.com/upload/0e490da1-031b-4dbe-9da5-6cce16436dfc-IMG_1043.webp'],
      specifications: ['Made from premium materials', 'Lasts a lifetime', 'Eco-friendly', 'Comes in multiple colors'],
      brand         : 'Toyota',
      stock         : 10,
      category      : 'Automotive',
      banner        : '',
      isFeatured    : false
      // numReviews    : 0
    },
    {
      model      : '2EE Toyota',
      name       : 'ITB Kit',
      slug       : 'itb-kit-2',
      description: `
              This Individual throttle body kit is designed as a bolt on unit for the Toyota 2EE Engine.  It sports all the necessary components to get your 2EE converted to ITBS!
                  -40mm Throttle bodies
                  -Carbon Fibre Nylon runners
                  -Aluminium cylinder head flange
                  -Your choice of Carbon fibre Nylon or Chrome plated velocity stacks
                  -Linkages and throttle arms allow for fine adjustment of butterflies
                  -Vacuum block allows for retention of brake booster and map sensor
              For best results we recommend tuning the engine on an aftermarket ECU with a variable TPS sensor.  Units are carefully assembled and thoroughly checked but will require an experienced mechanic to install, set up and tune correctly.
          `,
      price         : '39.99',
      images        : ['https://hgss-fus-prod.s3.ap-southeast-2.amazonaws.com/upload/0e490da1-031b-4dbe-9da5-6cce16436dfc-IMG_1043.webp'],
      specifications: ['Made from premium materials', 'Lasts a lifetime', 'Eco-friendly', 'Comes in multiple colors'],
      brand         : 'Toyota',
      stock         : 10,
      category      : 'Automotive',
      banner        : '',
      isFeatured    : false
      // numReviews    : 0
    },
    {
      model      : '[EP70/71] Toyota Starlet',
      name       : "'INTERCOOLER TURBO' Badge",
      slug       : 'intercooler-turbo-badge-2',
      description:
        'This is a reproduction of the rare and coveted ‘Intercooler Turbo’ badge found on some EP71 Turbo S Starlets.  Through redesigning this badge we have added captive threads instead of the screws of the original design to assure it stands the test of time.  Constructed from tough ABS plastic.',
     price         : '1149.99',
     images        : ['https://hgss-fus-prod.s3.ap-southeast-2.amazonaws.com/upload/0e490da1-031b-4dbe-9da5-6cce16436dfc-IMG_1043.webp'],
     specifications: ['Made from premium materials', 'Lasts a lifetime', 'Eco-friendly', 'Comes in multiple colors'],
     brand         : 'Toyota',
     stock         : 10,
     category      : 'Automotive',
     banner        : '',
     isFeatured    : false
    }
  ],
  gallery: [
    {
      title       : 'Custom Totota Colora',
      description : 'This is a mock album',
      cover       : ASSET_DIR.GALLERY_COVER_DEFAULT,
      galleryItems: [
        {
          title      : 'Sample',
          description: 'Sample description',
          image      : 'https://hgss-fus-prod.s3.ap-southeast-2.amazonaws.com/upload/44c4098a-0c76-4bee-81b1-3d086f5f4ceb-ep-70-71-antenna-blank.webp'
        },
        {
          title      : 'Sample',
          description: 'Sample description',
          image      : 'https://hgss-fus-prod.s3.ap-southeast-2.amazonaws.com/upload/b9c7ec00-56b0-4b6e-ae2c-d78509738495-ep-70-71-antenna-blank_2.webp'
        }
      ]
    },
    {
      title       : 'ITB Kit',
      description : 'Blah Blah',
      cover       : ASSET_DIR.GALLERY_COVER_DEFAULT,
      galleryItems: [
        {
          title      : 'ITB Ep.71',
          description: 'This is a preloaded data',
          image      :
            'https://hgss-fus-prod.s3.ap-southeast-2.amazonaws.com/upload/b57cfe13-646a-4cfa-8fc0-661216cce419-ep-70-71-intercooler-turbo-badge-(std-grill).webp'
        },
        {
          title      : 'ITB Ep.72',
          description: 'This is a preloaded data',
          image      : 'https://hgss-fus-prod.s3.ap-southeast-2.amazonaws.com/upload/1ef0e96c-a1e1-4ec0-8ee4-59f9873f8dcc-ep-70-71-cup-holder_3.webp'
        },
        {
          title      : 'ITB Ep.76',
          description: 'This is a preloaded data',
          image      :
            'https://hgss-fus-prod.s3.ap-southeast-2.amazonaws.com/upload/67d5b219-c0bf-404b-9fef-b962bb6948a6-ep-70-71-si-badge-mesh-grill_2.webp'
        }
      ]
    }
  ]
    // galleryItems: [
    //   {
    //     title: 'Sample',
    //     description: 'Sample description',
    //     image: './default.jpg'
    //   }
    // ]
}
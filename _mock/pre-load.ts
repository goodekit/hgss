import { PrismaClient } from '@prisma/client'
import goodlog from 'good-logs'
// import { hash } from 'lib'
import { _mockData } from './_mock-data'


async function main() {
    const prisma = new PrismaClient()
    await prisma.product.deleteMany()
    // await prisma.account.deleteMany()
    // await prisma.session.deleteMany()
    // await prisma.verificationToken.deleteMany()
    // await prisma.user.deleteMany()
    await prisma.gallery.deleteMany()
    await prisma.galleryItem.deleteMany()

    await prisma.product.createMany({ data: _mockData.products })
    for (const gallery of _mockData.gallery) {
      const createdGallery =  await prisma.gallery.create({
        data: {
          title       : gallery.title,
          description : gallery.description,
          cover       : gallery.cover
        }
      })

      if (gallery?.galleryItems?.length) {
        await prisma.galleryItem.createMany({
          data: gallery.galleryItems.map((_item) => ({
            title      : _item.title,
            description: _item.description,
            image      : _item.image,
            galleryId  : createdGallery.id
          }))
        })
      }
    }
    // const users = []
    // for (let i = 0; i < _mockData.users.length; i++) {
    //   users.push({
    //     ..._mockData.users[i],
    //     password: await hash(_mockData.users[i].password),
    //   })
    // }
    // await prisma.user.createMany({ data: users });
    goodlog.log(' 🌱 Data pre-loaded')
}

main()
import { PrismaClient } from '@prisma/client';


export default async function handler(req, res) {
  // Create a Prisma client
  const prisma = new PrismaClient();

  // Only accepts POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({message: 'Method not allowed' });
  }

  const newUserData = JSON.parse(req.body);

  const savedUser = await prisma.User.create({
    data: newUserData
  })
    .catch((err) => {
      return res.status(400).send("Something went wrong while registering your credentials.");
    })
  res.status(200).json(savedUser);
}

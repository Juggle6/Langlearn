import { Prisma } from '@/lib/db.js';

export default async function handler(req, res) {
  // Only accepts POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({message: 'Method not allowed' });
  }

  const newUserData = JSON.parse(req.body);

  const otherUsers = await prisma.User.findFirst({
    where: {
      OR: [
        {
          username: newUserData.username,
        },
        {
          email: newUserData.email,
        },
      ],
    },
  })

  if (otherUsers) {
    return res.status(400).json({error: "ConflictingCredentials"})
  }

  const savedUser = await prisma.User.create({
    data: newUserData
  })
    .catch((err) => {
      return res.status(400).json({error: "ServerError"});
    })
  res.status(200).json(savedUser);
}

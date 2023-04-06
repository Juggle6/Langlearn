import { Prisma } from '@/lib/db.js';
import {hash, compare} from '@/lib/hashPassword.js';

export default async function handler(req, res) {
  // Only accepts POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({message: 'Method not allowed' });
  }

  const { username, email, password } = JSON.parse(req.body);

  if (!(username && email && password)) {
    return res.status(400).json({error: "EmptyField"})
  }

  const otherUsers = await prisma.User.findFirst({
    where: {
      OR: [
        {
          username: username,
        },
        {
          email: email,
        },
      ],
    },
  })

  if (otherUsers) {
    return res.status(400).json({error: "ConflictingCredentials"})
  }

  const savedUser = prisma.User.create({
    data: {
      username: username,
      email: email,
      password: await hash(password),
    }
  })
    .then((newUser) => {
      console.log(newUser);
      return res.status(200).json(savedUser);
  })
}

import { prisma } from './db.ts';

export default async function refreshReviews(uid, language) {
  // Get the UTC date in ISO 8601 format
  const today = new Date(new Date().setUTCHours(0,0,0,0)).toISOString();

  // Fetch all reviews for today that belong to the user
  const reviews = await prisma.Review.findMany({
    where: {
      AND: [
        { date: today },
        { userId: uid },
      ]
    }
  })

  // Get the amount of *new* reviews
  let newReviews = reviews.filter(word => !word.reviewedBefore).length;

  if (newReviews >= 9) {
    return;
  }

  // Get a list of wordIds due today
  let wordsByIds = [];
  for (let entry in reviews) {
    wordsByIds.push(entry.wordId);
  }

  // Add a random review from the dictionary until the number of new reviews is equal to 10.
  const randomEntries = await prisma.$queryRaw`SELECT * FROM Dictionary WHERE language=${language} AND wordId NOT IN (${wordsByIds.join()}) ORDER BY random() LIMIT ${10 - newReviews}`

  // Add the randomEntries to the reviews for today
  for (let x in randomEntries) {
    const newReview = await prisma.Review.create({
      data: {
        userId: uid,
        wordId: randomEntries[x].wordId,
        reviewedBefore: false,
        date: today
      },
    })
  }
}

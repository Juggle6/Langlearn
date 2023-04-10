import { prisma } from './db.ts';

export default async function refreshReviews(uid, language) {
  // Get the UTC date in ISO 8601 format
  const today = new Date(new Date().setUTCHours(0,0,0,0)).toISOString();

  // Fetch all reviews for today that belong to the user
  const reviews = await prisma.Review.findMany({
    where: {
      userId: uid 
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
    wordsByIds.push(reviews[entry].wordId);
  }

  // Add a new review from the dictionary until the number of new reviews is equal to 10.
  const newEntries = await prisma.dictionary.findMany({
    where: {
      AND: [
        {
          wordId: {
            notIn: wordsByIds,
          },
        },
        {
          language: {
            equals: 'Trigedasleng'
          },
        }
      ]
    },
    take: 10 - newReviews,
  })

  // Add the newEntries to the reviews for today
  for (let x in newEntries) {
    const newReview = await prisma.Review.create({
      data: {
        userId: uid,
        wordId: newEntries[x].wordId,
        reviewedBefore: false,
        date: today
      },
    })
  }
}

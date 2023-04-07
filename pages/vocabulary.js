import CenteredContainer from '@/components/centeredContainer.js';
import {useState} from 'react';
import { prisma } from '@/lib/db.ts';
import refreshReviews from '@/lib/refreshReviews.js';

export default function VocabularyPractice({ nextWord }) {
  return (
    <CenteredContainer>
      <p>{nextWord.wordId}</p>
    </CenteredContainer>
  )
}

export async function getServerSideProps() {
  // Get the current date
  let currentDate = new Date(new Date().setUTCHours(0,0,0,0)).toISOString();

  // Refresh the user's reviews
  refreshReviews('abc', 'Trigedasleng');

  // Fetch the user's next word
  const nextWord = await prisma.Review.findMany({
    where: {
      date: currentDate
    }
  });

  console.log(nextWord)

  return { props: { nextWord } }
}

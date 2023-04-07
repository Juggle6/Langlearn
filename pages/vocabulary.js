import CenteredContainer from '@/components/centeredContainer.js';
import {useState} from 'react';
import { getServerSession } from "next-auth/next";
import { authOptions } from './api/auth/[...nextauth].js';
import { prisma } from '@/lib/db.ts';
import refreshReviews from '@/lib/refreshReviews.js';

export default function VocabularyPractice({ nextWord }) {
  return (
    <CenteredContainer>
      <p>{nextWord.word}</p>
      <p>{nextWord.translation}</p>
    </CenteredContainer>
  )
}

export async function getServerSideProps({ req, res }) {
  // Get session information
  const session = await getServerSession(req, res, authOptions);
  console.log(session);

  // Get the current date
  let currentDate = new Date(new Date().setUTCHours(0,0,0,0)).toISOString();

  // Refresh the user's reviews
  refreshReviews(session.id, 'Trigedasleng');

  // Fetch the user's next word
  const entry = await prisma.Review.findFirst({
    where: {
      date: currentDate
    }
  });

  const nextWord = await prisma.Dictionary.findUnique({
    where: {
      wordId: entry.wordId
    }
  })

  return { props: { nextWord } }
}

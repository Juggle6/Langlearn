import CenteredContainer from '@/components/centeredContainer.js';
import {useState} from 'react';
import { getServerSession } from "next-auth/next";
import { authOptions } from './api/auth/[...nextauth].js';
import { prisma } from '@/lib/db.ts';
import refreshReviews from '@/lib/refreshReviews.js';
import styles from '@/styles/vocabulary.module.css';

export default function VocabularyPractice({ nextWord }) {
  if (!nextWord) {
    return (
      <p>You've completed all of your reviews for now.</p>
    )
  }

  const [showTranslation, setShowTranslation] = useState(false);

  return (
    <div className={styles.wrapper}>
        <div className={styles.wordContainer}>
          <p>{nextWord.word}</p>
          {showTranslation ? <p>{nextWord.translation}</p> : null}
          <input placeholder="Guess"/>
        </div>
        <div className={styles.submitContainer}>
          <p>Write your guess</p>
          <button>Check Answer</button>
        </div>
    </div>
  )
}

export async function getServerSideProps({ req, res }) {
  // Get session information
  const session = await getServerSession(req, res, authOptions);

  // Get the current date
  let currentDate = new Date(new Date().setUTCHours(0,0,0,0)).toISOString();

  // Refresh the user's reviews
  await refreshReviews(session.id, 'Trigedasleng');

  // Fetch the user's next word
  const entry = await prisma.Review.findFirst({
    where: {
      AND: [
        { date: { equals: currentDate } },
        { userId: { equals: session.id } }
      ]
    }
  });

  if (!entry) {
    return { props: { nextWord: null } };
  }

  const nextWord = await prisma.Dictionary.findUnique({
    where: {
      wordId: entry.wordId
    }
  })

  return { props: { nextWord } }
}

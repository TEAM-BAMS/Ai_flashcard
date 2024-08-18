'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'
import { Container, Card, CardContent, Typography, Button, Box } from '@mui/material'
import { collection, doc, getDoc } from 'firebase/firestore'
import db from '../../lib/firebase'

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [flashcards, setFlashcards] = useState([])
  const [currentCard, setCurrentCard] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  const searchParams = useSearchParams()
  const setName = searchParams.get('set')

  useEffect(() => {
    async function getFlashcards() {
      if (!user || !setName) return
      const setDocRef = doc(collection(doc(collection(db, 'users'), user.id), 'flashcardSets'), setName)
      const setDocSnap = await getDoc(setDocRef)
      if (setDocSnap.exists()) {
        setFlashcards(setDocSnap.data().flashcards)
      }
    }
    getFlashcards()
  }, [user, setName])

  const handleFlip = () => setShowAnswer(!showAnswer)

  const handleNext = () => {
    setCurrentCard((prev) => (prev + 1) % flashcards.length)
    setShowAnswer(false)
  }

  const handlePrevious = () => {
    setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length)
    setShowAnswer(false)
  }

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, textAlign: 'center' }}>
        {setName}
      </Typography>
      {flashcards.length > 0 && (
        <>
          <Card sx={{ minHeight: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CardContent onClick={handleFlip} sx={{ cursor: 'pointer', width: '100%', textAlign: 'center' }}>
              <Typography variant="h5">
                {showAnswer ? flashcards[currentCard].back : flashcards[currentCard].front}
              </Typography>
            </CardContent>
          </Card>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button onClick={handlePrevious} variant="contained">Previous</Button>
            <Button onClick={handleNext} variant="contained">Next</Button>
          </Box>
        </>
      )}
    </Container>
  )
}
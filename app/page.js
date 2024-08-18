'use client'

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { AppBar, Toolbar, Typography, Button, Box, Grid, Container } from '@mui/material'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 1}}>
            Flashcard SaaS
          </Typography>
          <SignedOut>
            <Button color="inherit" component={Link} href="/sign-in">Login</Button>
            <Button color="inherit" component={Link} href="/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <Button color="inherit" component={Link} href="/flashcards">My Flashcards</Button>
            <Button color="inherit" component={Link} href="/generate">Generate</Button>
            <Button color="inherit" component={Link} href="/profile">Profile</Button>
            <UserButton afterSignOutUrl="/"/>
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Container>
        <Box sx={{textAlign: 'center', my: 4}}>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Flashcard SaaS
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            The easiest way to create flashcards from your text using AI.
          </Typography>
          <SignedOut>
            <Button variant="contained" color="primary" sx={{mt: 2, mr: 2}} component={Link} href="/sign-up">
              Get Started
            </Button>
          </SignedOut>
          <SignedIn>
            <Button variant="contained" color="primary" sx={{mt: 2, mr: 2}} component={Link} href="/generate">
              Create Flashcards
            </Button>
          </SignedIn>
          <Button variant="outlined" color="primary" sx={{mt: 2}}>
            Learn More
          </Button>
        </Box>

        <Box sx={{my: 6}}>
          <Typography variant="h4" component="h2" gutterBottom>Features</Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">AI-Powered Generation</Typography>
              <Typography>Create flashcards instantly from any text using advanced AI.</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Easy Organization</Typography>
              <Typography>Manage your flashcards in sets for efficient studying.</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Study Anywhere</Typography>
              <Typography>Access your flashcards on any device, anytime.</Typography>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{my: 6, textAlign: 'center'}}>
          <Typography variant="h4" component="h2" gutterBottom>Pricing</Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{border: '1px solid #ccc', p: 3, borderRadius: 2}}>
                <Typography variant="h5" gutterBottom>Free</Typography>
                <Typography variant="h4" gutterBottom>$0/month</Typography>
                <Typography>• Up to 5 flashcard sets</Typography>
                <Typography>• Basic AI generation</Typography>
                <Button variant="outlined" color="primary" sx={{mt: 2}} component={Link} href="/sign-up">
                  Sign Up
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{border: '1px solid #ccc', p: 3, borderRadius: 2, backgroundColor: '#f5f5f5'}}>
                <Typography variant="h5" gutterBottom>Pro</Typography>
                <Typography variant="h4" gutterBottom>$9.99/month</Typography>
                <Typography>• Unlimited flashcard sets</Typography>
                <Typography>• Advanced AI generation</Typography>
                <Typography>• Priority support</Typography>
                <Button variant="contained" color="primary" sx={{mt: 2}} component={Link} href="/upgrade">
                  Upgrade to Pro
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}

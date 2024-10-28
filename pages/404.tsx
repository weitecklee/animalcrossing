import { ThemeProvider } from '@mui/material/styles';
import { Grid, Typography } from '@mui/material';
import { theme } from '../styles/theme';
import ErrorPNG from '../public/avatar19.png';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 5000);
  }, [router]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Typography variant="h5">How did you end up here?</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5">Redirecting you back...</Typography>
          </Grid>
          <Grid item>
            <Image
              src={ErrorPNG}
              alt="Confused"
              priority
              style={{
                width: '90vw',
                maxWidth: 309,
                height: 'auto',
              }}
            />
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}

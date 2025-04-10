

import * as React from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../utils/backend';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import { GoogleIcon, FacebookIcon } from '../components/auth/CustomIcons';
import Cookies from 'js-cookie';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  // height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  // minHeight: '100%',
  minHeight: '100vh',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'fixed', 
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover', 
    zIndex: -1,
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignUp(props: { disableCustomTheme?: boolean }) {
  const navigate = useNavigate();

  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [adminNameError, setAdminNameError] = React.useState(false);
  const [adminNameErrorMessage, setAdminNameErrorMessage] = React.useState('');
  const [mobileError, setMobileError] = React.useState(false);
  const [mobileErrorMessage, setMobileErrorMessage] = React.useState('');

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;
    const adminName = document.getElementById('adminName') as HTMLInputElement;
    const mobile = document.getElementById('mobileNumber') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!adminName || adminName.value.length < 1) {
      setAdminNameError(true);
      setAdminNameErrorMessage('Admin name is required.');
      isValid = false;
    } else {
      setAdminNameError(false);
      setAdminNameErrorMessage('');
    }

    if (!mobile.value || !/^[6-9]\d{9}$/.test(mobile.value)) {
      setMobileError(true);
      setMobileErrorMessage('Enter a valid 10-digit mobile number.');
      isValid = false;
    } else {
      setMobileError(false);
      setMobileErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateInputs()) return;

    const data = new FormData(event.currentTarget);

    const userData = {
      adminName: data.get('adminName'),
      email: data.get('email'),
      password: data.get('password'),
      mobileNumber: data.get('mobileNumber'),
    };

    try {
      const response = await axios.post(`${BACKEND_URL}/api/admin/auth/register`, userData);
      console.log('Signup successful:', response.data);

      Cookies.set('adminToken', response.data.token, { expires: 7 });

      navigate('//admin/dashboard');
      alert('Account created successfully!');
    } catch (error: any) {
      console.error('Signup error:', error.response?.data || error.message);
      alert('Signup failed: ' + (error.response?.data?.message || 'Something went wrong.'));
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Admin Register
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="adminName">Name</FormLabel>
              <TextField
                autoComplete="name"
                name="adminName"
                required
                fullWidth
                id="adminName"
                placeholder="John Doe"
                error={adminNameError}
                helperText={adminNameErrorMessage}
                color={adminNameError ? 'error' : 'primary'}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={emailError ? 'error' : 'primary'}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="mobileNumber">Mobile Number</FormLabel>
              <TextField
                required
                fullWidth
                id="mobileNumber"
                placeholder="9999999999"
                name="mobileNumber"
                autoComplete="tel"
                variant="outlined"
                error={mobileError}
                helperText={mobileErrorMessage}
                color={mobileError ? 'error' : 'primary'}
              />
            </FormControl>

            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive updates via email."
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign up
            </Button>
          </Box>

          <Divider>
            <Typography sx={{ color: 'text.secondary' }}>or</Typography>
          </Divider>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign up with Google')}
              startIcon={<GoogleIcon />}
            >
              Sign up with Google
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <Link
                href="/admin/login"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                <a
                  className="no-underline hover:underline hover:text-blue-600 transition duration-200"
                >
                  Sign in
                </a>
              </Link>
            </Typography>
            <Typography sx={{ textAlign: 'center' }}>
              Back to{' '}
              <Link href="/" variant="body2" sx={{ alignSelf: 'center' }}>
                Home
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}




import React, { useState } from 'react';
import './Admin.css';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import a from './logdri.png';
const Admin = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };



  const navigate = useNavigate();


const move=()=>{
  navigate('/')
}

  //setting up the input
  const [data, setData] = useState({
    email: '',
    password: '',
    error: null,
    loading: false,
  });

  const { email, password, error, loading } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const loggingIn = async () => {
    setData({ ...data, error: null, loading: true });
    if (!email || !password) {
      setData({ ...data, error: 'All fields are required.' });
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setData({
        email: '',
        password: '',
        error: null,
        loading: false,
      });
      navigate('/dashboard');
    } catch (err) {
      switch (err.code) {
        case 'auth/invalid-email':
          setData({
            ...data,
            error: 'All fields are required.',
            loading: false,
          });
          break;
        case 'auth/user-disabled':
          setData({
            ...data,
            error:
              'Your account has been disabled,contact the super Admin for help',
            loading: false,
          });
          break;
        case 'auth/user-not-found':
          setData({
            ...data,
            error: 'You are not authorized, go away 😡',
            loading: false,
          });
          break;
        case 'auth/too-many-requests':
          setData({
            ...data,
            error:
              'you have exhusted the maxium trial limit, come back 1hr later ',
            loading: false,
          });
          break;

        case 'auth/wrong-password':
          setData({
            ...data,
            error: 'Invalid password.',
            loading: false,
          });
          break;
        default:
          setData({ ...data, error: err.message, loading: false });
          break;
      }
    }
  };
  return (
    <div
      style={{
        backgroundColor: 'white',
      }}
    >
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-12  pt-4 pb-4 d-flex align-items-center "
            style={{ height: '100vh', background: '#e5eef2' }}
          >
            <div className="container">
              <div className="row">
                <div className="col-12 col-lg-6 pt-5 pb-5 leftt">
                  <div>
                    <div className="log" onClick={move}>
                      Login ✌️
                    </div>
                    <div className="mb-3">
                      Alot is waiting for you at the other side 👉
                    </div>
                  </div>
                  <div className="holder">
                    <Form>
                      {error ? <Alert severity="error">{error}</Alert> : null}
                      <div>
                        <TextField
                          label="email"
                          variant="outlined"
                          style={{ width: '100%', marginTop: '20px' }}
                          name="email"
                          value={email}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <FormControl
                          sx={{ width: '100%', marginTop: '20px' }}
                          variant="outlined"
                        >
                          <InputLabel htmlFor="outlined-adornment-password">
                            Password
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                            label="Password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                          />
                        </FormControl>
                      </div>
                      <div
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <Button
                          variant="contained"
                          style={{
                            width: '200px',
                            height: '40px',
                            marginTop: '20px',
                          }}
                          onClick={loggingIn}
                          disabled={loading}
                        >
                          {loading ? (
                            <CircularProgress
                              style={{ height: '22px', width: '22px' }}
                            />
                          ) : (
                            'login'
                          )}
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
                <div className="  col-12 col-lg-6 wiki">
                  <div className="wiki">
                    <img
                      src={a}
                      alt="wow"
                      style={{
                        width: '100%',
                        height: '550px',
                        objectFit: 'contain',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

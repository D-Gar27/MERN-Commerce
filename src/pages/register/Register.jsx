import { Email, Lock, Person } from '@material-ui/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.scss';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [conPW, setConPW] = useState('');
  const [err, setErr] = useState({
    success: null,
    msg: '',
  });
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (conPW !== values.password) {
      return setErr({ success: false, msg: 'Password not match' });
    }
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/auth/register`,
        values
      );
      setErr({ success: true, msg: res.data });
      navigate('/login');
    } catch (error) {
      if (
        error.response &&
        error.response.data.code === 11000 &&
        error.response.data.keyPattern.username === 1
      ) {
        setErr({ success: false, msg: 'Username is taken' });
      }
      if (
        error.response &&
        error.response.data.code === 11000 &&
        error.response.data.keyPattern.email === 1
      ) {
        setErr({ success: false, msg: 'Already registered' });
      }
    }
  };
  return (
    <section className="register-page">
      <form className="register-form">
        <h1>Create Account</h1>
        <div className="input">
          <Person className="form-icon" />
          <input
            type="text"
            placeholder="Username"
            value={values.username}
            onChange={(e) => setValues({ ...values, username: e.target.value })}
            required
          />
        </div>
        <div className="input">
          <Email className="form-icon" />
          <input
            type="email"
            placeholder="Email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            required
          />
        </div>
        <div className="input">
          <Lock className="form-icon" />
          <input
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            required
          />
        </div>
        <div className="input">
          <Lock className="form-icon" />
          <input
            type="password"
            placeholder="Confirm Password"
            value={conPW}
            onChange={(e) => setConPW(e.target.value)}
            required
          />
        </div>
        <button type="submit" onClick={handleSignUp}>
          Sign Up
        </button>
        {err.success === true ? (
          <p className="success-msg">{err.msg}</p>
        ) : err.success === false ? (
          <p className="error-msg">{err.msg}</p>
        ) : (
          ''
        )}
        <p>
          Already have an account?
          <Link to="/login" style={{ color: 'black' }}>
            <b>Sign in</b>
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Register;

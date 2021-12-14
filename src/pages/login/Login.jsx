import { Lock, Person } from '@material-ui/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.scss';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { loginSuccess, loginStart, loginFailure } from '../../redux/user';
import { useNavigate } from 'react-router';

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    auth: '',
    password: '',
  });
  const [err, setErr] = useState({
    success: null,
    msg: '',
  });
  const [term, setTerm] = useState(false);
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!term) {
      return setErr({
        success: false,
        msg: 'You need to accept our terms and conditions',
      });
    }
    dispatch(loginStart());
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/auth/login`,
        values
      );
      setErr({ success: true, msg: 'Login Success' });
      dispatch(loginSuccess(res.data));

      if (res.data.admin) {
        localStorage.setItem('dk', res.data.admin);
      }
      localStorage.setItem('x_3', res.data.token);
      navigate('/');
    } catch (error) {
      setErr({ success: false, msg: error.response.data });
      dispatch(loginFailure());
    }
  };
  const { fetching } = useSelector((state) => state.user);
  return (
    <section className="login-page">
      <form className="login-form" onSubmit={handleLogin}>
        <h1>Sign In</h1>
        <div className="input">
          <Person className="form-icon" />
          <input
            type="text"
            placeholder="Username or Email"
            value={values.auth}
            onChange={(e) => setValues({ ...values, auth: e.target.value })}
          />
        </div>
        <div className="input">
          <Lock className="form-icon" />
          <input
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
        </div>
        <label htmlFor="terms">
          <input
            type="checkbox"
            name="terms"
            id="terms"
            onClick={() => setTerm(!term)}
          />
          I accept this
          <b> terms and policy</b>
        </label>
        {fetching ? (
          <button type="submit" disabled>
            Please wait
          </button>
        ) : (
          <button type="submit">Log in</button>
        )}
        {err.success === true ? (
          <p className="success-msg">{err.msg}</p>
        ) : err.success === false ? (
          <p className="error-msg">{err.msg}</p>
        ) : (
          ''
        )}
        <p>
          Don't have an account?
          <Link to="/register" style={{ color: 'black' }}>
            <b>Sign up</b>
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Login;

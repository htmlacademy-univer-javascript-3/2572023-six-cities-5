import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { LoginForm } from '../login-form/login-form.tsx';
import { AuthData } from '../../../types/auth-data.ts';
import { loginAction } from '../../../store/api-actions.ts';
import {memo} from 'react';

export function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const handleLogin = (data: AuthData) => {
    dispatch(loginAction(data));
  };

  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <LoginForm onFormSubmit={handleLogin} />
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <a className="locations__item-link" href="#">
              <span>Amsterdam</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

const MemoizedLoginPage = memo(LoginPage);
export default MemoizedLoginPage;

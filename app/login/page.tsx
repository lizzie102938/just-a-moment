import classes from './login.module.scss';
import LoginForm from '../../components/LoginForm/LoginForm';

export default function LoginPage() {
  return (
    <main className={classes.mainContainer}>
      <LoginForm />
    </main>
  );
}

import classes from './login.module.scss';
import Login from '../../components/Login/Login';

export default function LoginPage() {
  return (
    <main className={classes.mainContainer}>
      <Login />
    </main>
  );
}

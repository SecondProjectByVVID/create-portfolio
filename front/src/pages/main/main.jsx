import { Link } from 'react-router-dom';
const Main = () => {
  return (
    <div>
      <ul className="">
        <li>
          <Link to="login">Login</Link>
        </li>
        <li>
          <Link to="signUp">SignUp</Link>
        </li>
      </ul>
    </div>
  );
};

export default Main;

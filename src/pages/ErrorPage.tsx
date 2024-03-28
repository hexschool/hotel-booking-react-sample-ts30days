import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <h1>404 Not Found</h1>
      <p>Sorry, the page you are looking for could not be found.</p>
    </>
  );
};

export default ErrorPage;

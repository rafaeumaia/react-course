import { Header } from "../components/Header";
import "./NotFoundPage.css";

function NotFoundPage() {
  return (
    <>
      <Header />

      <div className="container">
        <p className="protocol-type">404</p>
        <p className="protocol-error">
          This is not the web page you are looking for.
        </p>
      </div>
    </>
  );
}

export default NotFoundPage;

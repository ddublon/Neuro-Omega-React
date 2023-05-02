import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      //   navigate("/");
      navigate(-1);
    }, 1000);
  }, []);

  return (
    <div>
      <h1>Page Not Found</h1>
    </div>
  );
};

export default PageNotFound;

import { useEffect } from "react";
import theme from "../../../styles/theme";

const Hero = () => {
  useEffect(() => {
    document.body.style.backgroundColor = theme.prominent;
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, []);

  return <></>;
};

export default Hero;

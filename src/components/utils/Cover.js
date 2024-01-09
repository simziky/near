import React from "react";
import "./cover.css"
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const Cover = ({ name, login, coverImg }) => {
  if ((name, login)) {
    return (
      <div
        className="d-flex justify-content-center flex-column text-center home-main"
       
      >
        <div className="mt-auto text-light mb-5 home-cont-main">
          <div className="home-cont">
            <div className="home-cont1">
               <h1>{name}</h1>
               <p className="p1">It isn't thanksgiving but let us join hands to crowdfund for those who need it!!</p>
               <p>Please connect your wallet to continue.</p>
               <Button
            onClick={login}
            variant="outline-light"
            className="rounded-pill px-3 mt-3"
          >
            Connect Wallet
          </Button>
               </div>
            <div className="home-cont2"></div>
           
          </div>
         
         
         
        </div>
        <p className="mt-auto text-secondary">Powered by NEAR</p>
      </div>
    );
  }
  return null;
};

Cover.propTypes = {
  name: PropTypes.string,
};

Cover.defaultProps = {
  name: "",
};

export default Cover;

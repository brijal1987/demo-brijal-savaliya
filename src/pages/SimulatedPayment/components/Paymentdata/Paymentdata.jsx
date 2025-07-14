import React from "react";
import "./Paymentdata.css";

export const PaymentData = (props) => {
    const { paymentData } = props;
    return (
      <div className="payment-data-container">
      <div className="payment-data-details">
        <div className="inner-div">
          <span>From Address: </span>
          <span>
            {" "}
            {paymentData.from}{" "}
          </span>
        </div>
        <div className="inner-div">
          <span>To Address: </span>
          <span>
            {" "}
            {paymentData.to}{" "}
          </span>
        </div>
        <div className="inner-div">
          <span>Amount: </span>
          <span>
            {" "}
            {paymentData.amount}{" "}
          </span>
        </div>
      </div>
    </div>
    )
  }

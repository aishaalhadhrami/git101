import React, { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import CustomerLayout from "./CustomerLayout";
import "./Customer.css";

export default function Review() {
  const [rating, setRating] = useState(0);

  return (
    <CustomerLayout>
      <div className="review-content">
        <h1>Share Your Treatment Experience</h1>
        <p>Tell us about your experience with the treatment your feedback<br />helps others make better choices !</p>
        <div className="review-form-area">
          <div className="review-top-row">
            <label>Leave a comment :</label>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) =>
                star <= rating ? (
                  <FaStar key={star} onClick={() => setRating(star)} className="star-icon active-star" />
                ) : (
                  <FaRegStar key={star} onClick={() => setRating(star)} className="star-icon" />
                )
              )}
            </div>
          </div>
          <textarea className="review-textarea"></textarea>
          <button className="review-send-btn">Send</button>
        </div>
      </div>
    </CustomerLayout>
  );
}

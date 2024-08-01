import React, { useEffect, useState } from "react";
import classes from "./foodpage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../../Hooks/useCart";
import { getById } from "../../services/foodService";
import Tags from "../../Components/Tags/Tags";
import Price from "../../Components/Price/Price";
import NotFound from "../../Components/NotFound/NotFound";

export default function FoodPage() {
  const [food, setfood] = useState({});
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const handleAddToCart = () => {
    addToCart(food);
    navigate("/cart");
  };
  useEffect(() => {
    getById(id).then(setfood);
  }, [id]);
  return (
    <>
      {!food ? (
        <NotFound message="Food not found!" linkText="Back to Homepage" />
      ) : (
        <div className={classes.container}>
          <img
            className={classes.image}
            src={`${food.imageUrl}`}
            alt={food.name}
          />
          <div className={classes.details}>
            <div className={classes.header}>
              <span className={classes.name}>{food.name}</span>
              <span
                className={`${classes.favorite} ${
                  food.favorite ? "" : classes.not
                }`}
              >
                ❤
              </span>
            </div>
            <div className={classes.stars}>
              {food.stars}
              <span>⭐</span>
            </div>
            <div className={classes.origin}>
              {food.origins?.map((origin) => (
                <span key={origin}>{origin}</span>
              ))}
            </div>
            <div className={classes.tags}>
              {food.tags && (
                <Tags
                  tags={food.tags.map((tag) => ({ name: tag }))}
                  forFoodPage={true}
                />
              )}
            </div>
            <div className={classes.cook_time}>
              <span>
                Time to cook about <strong>{food.cookTime} </strong>minutes
              </span>
            </div>
            <div className={classes.price}>
              <Price price={food.price} />
            </div>
            <button onClick={handleAddToCart}>Add To Cart</button>
          </div>
        </div>
      )}
    </>
  );
}

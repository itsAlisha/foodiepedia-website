import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../../Components/Input/Input";
import Title from "../../Components/Title/Title";
import classes from "./registerPage.module.css";
import Button from "../../Components/Button/Button";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import { EMAIL } from "../../constants/patterns";

export default function RegisterPage() {
  const auth = useAuth();
  const { user } = auth;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get("returnUrl");

  useEffect(() => {
    if (!user) return;
    returnUrl ? navigate(returnUrl) : navigate("/");
  }, [user]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    await auth.register(data);
    // console.log(data);
  };

  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <Title title="Register" />
        <form onSubmit={handleSubmit(submit)} noValidate>
          <Input
            type="text"
            label="Name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 5,
                message: "Name must be at least 5 characters",
              },
            })}
            error={errors.name}
          />
          <Input
            type="email"
            label="Email"
            {...register("email", {
              required: "Email is required",
              pattern: EMAIL,
            })}
            error={errors.email}
          />
          <Input
            type="password"
            label="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 5,
                message: "Password must be at least 5 characters",
              },
            })}
            error={errors.password}
          />
          <Input
            type="password"
            label="Confirm Password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value !== getValues("password")
                  ? "Passwords do not match"
                  : true,
            })}
            error={errors.confirmPassword}
          />
          <Input
            type="text"
            label="Address"
            {...register("address", {
              required: "Address is required",
              minLength: {
                value: 10,
                message: "Address must be at least 10 characters",
              },
            })}
            error={errors.address}
          />
          <Button type="submit" text="Register" />
          <div className={classes.login}>
            Already a user? &nbsp;
            <Link to={`/login?${returnUrl ? "returnUrl=" + returnUrl : ""}`}>
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

import { css } from "@emotion/css";
import React from "react";
import { useForm } from "react-hook-form";
import { useGlobalStateContext } from "../state/GlobalState";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Button from "./common/Button";
import { InputEl } from "./common/Input";
import { useSnackbar } from "state/SnackbarContext";
import { useTranslation } from "react-i18next";

type SignupInputs = {
  email: string;
  password: string;
};

function Login() {
  const { t } = useTranslation("translation", { keyPrefix: "logIn" });

  const { dispatch } = useGlobalStateContext();
  const { register, handleSubmit } = useForm<SignupInputs>();
  const navigate = useNavigate();
  const snackbar = useSnackbar();

  const onSubmit = React.useCallback(
    async (data: SignupInputs) => {
      try {
        await api.post("login", data);
        const { result } = await api.get<LoggedInUser>("profile");
        dispatch({
          type: "setLoggedInUser",
          user: result,
        });
        navigate("/");
      } catch (e: unknown) {
        snackbar((e as Error).message, { type: "warning" });
        console.error(e);
      }
    },
    [dispatch, navigate, snackbar]
  );

  return (
    <div>
      <form
        className={css`
          max-width: 200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
        `}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>{t("logIn")}</h2>

        <label>{t("email")}</label>
        <InputEl type="email" {...register("email")} />
        <label>{t("password")}</label>
        <InputEl {...register("password")} type="password" />
        <Button type="submit">{t("logIn")}</Button>
      </form>
      <img
        alt="blackbird"
        src="/images/blackbird.png"
        className={css`
          width: 100%;
          padding: 4rem 0;
        `}
      />
    </div>
  );
}

export default Login;

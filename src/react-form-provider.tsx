import React, { Context, useEffect, useState } from "react";
import { FormValues } from "ts-form/build/types";
import { ReactForm } from "./react-form";

interface Props<V extends FormValues> {
  form: ReactForm<V>;
  Context: Context<ReactForm<V>>;
  children: React.ReactNode;
}

const useBlockRenderingOneTick = () => {
  const [isBlocked, setIsBlocked] = useState(true);

  useEffect(() => {
    setIsBlocked(false);
  }, []);

  return isBlocked;
};

export const ReactFormProvider = <V extends FormValues>({
  form,
  Context,
  children,
}: Props<V>) => {
  const isBlocked = useBlockRenderingOneTick();
  return isBlocked ? null : (
    <Context.Provider value={form}>{children}</Context.Provider>
  );
};

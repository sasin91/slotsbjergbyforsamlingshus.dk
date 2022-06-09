import { useLocales } from "~/providers/LocaleProvider";

type IntlMoneyProps = {
  children: number;
};

export const IntlMoney = (props: IntlMoneyProps & Intl.NumberFormatOptions) => {
  const locales = useLocales();

  const formatter = new Intl.NumberFormat(locales, {
    currency: "DKK",
    style: "currency",
    ...props,
  });

  return <span>{formatter.format(props.children)}</span>;
};

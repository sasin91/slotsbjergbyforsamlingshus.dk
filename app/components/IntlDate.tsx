import { useLocales } from "~/providers/LocaleProvider";

type IntlDateProps = {
  date: Date;
  timeZone?: string;
};

export const IntlDate = ({ date, timeZone }: IntlDateProps) => {
  const dateObj = date instanceof Date ? date : new Date(date);

  const locales = useLocales();
  const isoString = dateObj.toISOString();
  const formattedDate = new Intl.DateTimeFormat(locales, {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone,
  }).format(dateObj);

  return <time dateTime={isoString}>{formattedDate}</time>;
};

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import ReactTimeAgo from "react-time-ago";
TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

type Props = {
  date: number;
};

export default function LastSeen({ date }: Props) {
  return (
    <span>
      time ago: <ReactTimeAgo date={date} locale="en-US" />
    </span>
  );
}

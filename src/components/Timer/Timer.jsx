import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
Timer.propTypes = {
  endsAt: PropTypes.string,
};

// source https://dev.to/yuridevat/how-to-create-a-timer-with-react-7b9

export default function Timer(props) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const deadline = props.endsAt;

  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();
    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));

    if (isLoading) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTime();

    const interval = setInterval(() => getTime(), 1000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <div></div>;
  }

  if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
    return (
      <>
        <div>Ended at</div>
        <Moment format="HH:mm DD.MM.YYYY">{deadline}</Moment>
      </>
    );
  }

  return (
    <div className="timer">
      {days >= 1 && (
        <div>
          <div>Ends at</div>
          <Moment format="HH:mm DD.MM.YYYY">{deadline}</Moment>
        </div>
      )}
      {days < 1 && (
        <div>
          <div>Ends in</div>
          <div>
            {hours} H {minutes} M {seconds} S
          </div>
        </div>
      )}
    </div>
  );
}

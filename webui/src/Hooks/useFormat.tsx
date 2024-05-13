import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export function useFormat() {
  return {
    formatDuration: (value: duration.Duration) => {
      let result = "";

      // Extract days, hours, minutes, and seconds from the duration
      const days = Math.floor(value.asDays());
      const hours = value.hours();
      const minutes = value.minutes();
      const seconds = value.seconds();

      // Construct the formatted string
      if (days > 0) {
        result += days + "d ";
      }
      if (hours > 0) {
        result += hours + "h ";
      }
      if (minutes > 0) {
        result += minutes + "m ";
      }
      if (seconds > 0) {
        result += seconds + "s";
      }

      return result.trim();
    },
  };
}

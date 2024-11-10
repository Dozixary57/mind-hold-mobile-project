export const RemainingTimeFormatter = (time: number): string => {
  if (time <= 0) return "";

  const days = Math.floor(time / 86400);
  const hours = Math.floor((time % 86400) / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.ceil(time % 60);

  if (days > 0) {
    return `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
  } else if (hours > 0) {
    return `${hours}h : ${minutes}m : ${seconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m : ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
};

// export default {
//   RemainingTimeFormatter
// };
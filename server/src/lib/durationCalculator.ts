export const durationCalculator = (start_time: string, end_time: string) => {
  const started_at = new Date(start_time);
  const ended_at = new Date(end_time);

  const started_at_sec = Math.round(started_at.getTime() / 1000);
  const ended_at_sec = Math.round(ended_at.getTime() / 1000);
  const duration_sec = ended_at_sec - started_at_sec;

  return duration_sec;
};

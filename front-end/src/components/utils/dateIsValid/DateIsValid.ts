export const dateIsValid = (taskDate: Date) => {
  if (
    new Date(taskDate).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
  ) {
    console.log("The input date is in the past.");
    return true;
  } else {
    console.log("The input date is in the future.");
    return false;
  }
};

export const required = v => {
  if (v.length === 0) return ["This field is required!!!", true];
  return [true, false];
};
export const password = v => {
  if (v.search("^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*-+`]).{8,}$") < 0)
    return ["The password does not match the rules", true];

  return [true, false];
};
export const passwordRepeat = (v, pswd) => {
  const req = required(v);
  if(req[1]) return req;
  if (pswd !== v) return ["The password does not match!!!", true];
  return password(pswd);
};
export const email = v => {
  if (v.search("^.{3,}@.{4,}\\..{2,}$") < 0) return ["Enter valid email", true];
  return [true, false];
};

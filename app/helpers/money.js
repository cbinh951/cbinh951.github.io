export const caculateTotalMoney = (costAttr, numberPage, copies, shipping) =>
  costAttr * numberPage * copies + shipping;

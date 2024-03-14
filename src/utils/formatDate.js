import moment from "moment/moment";
import "moment/locale/tr";
//   unix formatındaki veriyi normal formaya cerviren fonk
const formatDate = (unix_time) => {
  // unxi formatındaki saniye verisini date ile kullanabilmek için
  // 1000 ile carpoıp milisanşyeye cevirdik
  const date = new Date(unix_time * 1000);
  // veriyi formatla
  return moment(date).calendar();
};

export default formatDate;

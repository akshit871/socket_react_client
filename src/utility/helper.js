export const dateGet = () => {
  let date = new Date().getDate();
  let month = new Date().getMonth() + 1;
  let year = new Date().getFullYear();
  //   let fileName = date + "_" + month + "_" + year;
  let dt = date + "/" + month + "/" + year;
  //   let folderName = `../../Documents/laserNEW/${year}/${month}`;
  return dt;
};

export const getCurTime = () => {
  var time = new Date();
  // console.log(
  return time.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });
  // );
};

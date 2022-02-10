export const avatarColor = (name: any) => {
  const colors = [
    { backgroundColor: "rgb(170, 71, 188)", color: "rgb(255, 255, 255)" }, //0
    { backgroundColor: "rgb(122, 31, 162)", color: "rgb(255, 255, 255)" }, //1
    { backgroundColor: "rgb(120, 144, 156)", color: "rgb(255, 255, 255)" }, //2
    { backgroundColor: "rgb(70, 90, 101)", color: "rgb(255, 255, 255)" }, //3
    { backgroundColor: "rgb(236, 64, 122)", color: "rgb(255, 255, 255)" }, //4
    { backgroundColor: "rgb(194, 23, 91)", color: "rgb(255, 255, 255)" }, //5
    { backgroundColor: "rgb(92, 107, 192)", color: "rgb(255, 255, 255)" }, //6
    { backgroundColor: "rgb(2, 136, 209)", color: "rgb(255, 255, 255)" }, //7
    { backgroundColor: "rgb(0, 87, 156)", color: "rgb(255, 255, 255)" }, //8
    { backgroundColor: "rgb(0, 152, 166)", color: "rgb(255, 255, 255)" }, //9
    { backgroundColor: "rgb(0, 76, 63)", color: "rgb(255, 255, 255)" }, //10
    { backgroundColor: "rgb(104, 159, 57)", color: "rgb(255, 255, 255)" }, //11
    { backgroundColor: "rgb(51, 105, 30)", color: "rgb(255, 255, 255)" }, //12
    { backgroundColor: "rgb(140, 110, 99)", color: "rgb(255, 255, 255)" }, //13
    { backgroundColor: "rgb(93, 64, 56)", color: "rgb(255, 255, 255)" }, //14
    { backgroundColor: "rgb(126, 87, 194)", color: "rgb(255, 255, 255)" }, //15
    { backgroundColor: "rgb(81, 45, 167)", color: "rgb(255, 255, 255)" }, //16
    { backgroundColor: "rgb(239, 108, 0)", color: "rgb(160, 202, 146)" }, //17
    { backgroundColor: "rgb(245, 81, 30)", color: "rgb(255, 255, 255)" }, //18
    { backgroundColor: "rgb(191, 54, 12)", color: "rgb(255, 255, 255)" }, //19
    { backgroundColor: "rgb(0, 167, 225)", color: "rgb(255, 255, 255)" }, //20
    { backgroundColor: "rgb(179, 0, 27)", color: "rgb(255, 255, 255" }, //21
    { backgroundColor: "rgb(20, 49, 9)", color: "rgb(255, 255, 255)" }, //22
    { backgroundColor: "rgb(255, 16, 83)", color: "rgb(255, 255, 255)" }, //23
    { backgroundColor: "rgb(157, 68, 181)", color: "rgb(255, 255, 255)" }, //24
    { backgroundColor: "rgb(110, 68, 255)", color: "rgb(255, 255, 255)" }, //25
    { backgroundColor: "rgb(31, 32, 65)", color: "rgb(255, 255, 255)" }, //26
  ];

  const initials = name
    .match(/^\w|\b\w(?=\S+$)/g)
    .join()
    .replace(",", "")
    .toUpperCase();

  switch (initials.charAt(0)) {
    case "A":
      return colors[0];
    case "B":
      return colors[1];

    case "C":
      return colors[2];

    case "D":
      return colors[3];

    case "E":
      return colors[4];

    case "F":
      return colors[5];

    case "G":
      return colors[6];

    case "H":
      return colors[7];

    case "I":
      return colors[8];

    case "J":
      return colors[9];

    case "K":
      return colors[10];

    case "L":
      return colors[11];

    case "M":
      return colors[12];

    case "N":
      return colors[13];

    case "O":
      return colors[14];

    case "P":
      return colors[15];

    case "Q":
      return colors[16];

    case "R":
      return colors[17];

    case "S":
      return colors[18];

    case "T":
      return colors[19];

    case "U":
      return colors[20];

    case "V":
      return colors[21];

    case "W":
      return colors[22];

    case "X":
      return colors[23];

    case "Y":
      return colors[24];

    case "Z":
      return colors[25];

    default:
      return colors[26];
  }
};

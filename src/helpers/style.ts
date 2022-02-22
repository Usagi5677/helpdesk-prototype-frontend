export const stringToColor = (str: string) => {
  let hash = 2;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 7) - hash) + str.length;
  }
  return `hsl(${hash % 360}, 30%, 40%)`;
};

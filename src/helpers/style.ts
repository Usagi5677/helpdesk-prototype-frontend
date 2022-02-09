export const stringToColor = (str: string) => {
  let hash = 1;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${hash % 360}, 30%, 40%)`;
};

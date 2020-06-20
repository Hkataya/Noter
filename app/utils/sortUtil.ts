export default function(arrayToSort: Array<any>) {
  return arrayToSort.sort((a, b) =>
    new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1
  );
}

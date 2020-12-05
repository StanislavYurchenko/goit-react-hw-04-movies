import queryString from "query-string";

export default function parseQueryString(string) {
  return queryString.parse(string);
}

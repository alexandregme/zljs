export const splitURLasPath = (
  urlAsPath: string,
): Record<string, string> => {
  let queryWithoutPath = "";

  if (urlAsPath?.indexOf("?") >= 0) {
    const [, query] = urlAsPath.split("?");
    queryWithoutPath = query;
  }
  if (urlAsPath?.indexOf("#") >= 0) {
    const [, query] = urlAsPath.split("#");
    queryWithoutPath = query;
  }

  const parametersAsObject: Record<string, string> = {};

  if (queryWithoutPath.length > 0) {
    queryWithoutPath.split("&").forEach((p) => {
      const [parameter, value] = p.split("=");
      if (parameter) {
        parametersAsObject[parameter] = value;
      }
    });
  }

  return parametersAsObject;
};

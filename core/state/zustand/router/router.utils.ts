export const splitURLasPath = (urlAsPath: string): Record<string, string> => {
  const [pathAndQuery = ""] = urlAsPath?.split("#") ?? [];
  const [, query = ""] = pathAndQuery.split("?");

  const parametersAsObject: Record<string, string> = {};

  query.split("&").forEach((p) => {
    const [parameter, value] = p.split("=");
    if (parameter) {
      parametersAsObject[parameter] = value ?? "";
    }
  });

  return parametersAsObject;
};

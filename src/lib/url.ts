export function convertParamsToForm(params: any) {
  return { ...params };
}

export function convertFormToParams(form: any) {
  return { ...form };
}

export function convertUrlToParams(searchParams: URLSearchParams): Record<string, string> {
  const obj: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
}

export function convertParamsToUrl(params: any): URLSearchParams {
  return new URLSearchParams(params as Record<string, string>);
}

export function convertFormToUrl(form: any): URLSearchParams {
  const params = convertFormToParams(form);
  return convertParamsToUrl(params);
}

export function convertUrlToForm(searchParams: URLSearchParams): any {
  const params = convertUrlToParams(searchParams);
  return convertParamsToForm(params);
}
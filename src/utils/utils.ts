export function isSuccess(code: string | number): boolean {
  return Number(code) === 200;
}

export function formatToken(): string | null {
  let token = localStorage.getItem('token');
  if (token === 'null') {
    token = JSON.parse(token);
  } else {
    token = token?.replace(/\"/g, '') || null;
  }
  return token;
}

export function delay(ms: number = 1000): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}


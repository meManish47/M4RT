import jwt from "jsonwebtoken";
export function createTokenWithId({ id }: { id: string }) {
  const token = jwt.sign(id, process.env.JWT_SECRET_KEY as string);
  return token;
}
export function verifyToken(token: string) {
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    return data as string;
  } catch (err) {
    return null;
  }
}

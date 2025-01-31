import bcrypt from 'bcrypt';

const saltRounds = 10;

export default function saltAndHashPassword(password: string): string {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

export function comparePassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}
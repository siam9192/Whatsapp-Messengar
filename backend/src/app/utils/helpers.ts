import { init } from "@paralleldrive/cuid2";


export function generateUserId() {
  const cuid = init({ length: 10 });
  return ("user-" + cuid()).toUpperCase();
}

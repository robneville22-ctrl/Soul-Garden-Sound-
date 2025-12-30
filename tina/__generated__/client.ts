import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ cacheDir: '/home/ubuntu/soul-garden-sound/tina/__generated__/.cache/1767108266724', url: 'http://localhost:4001/graphql', token: 'b5968bb8d2253ec75dd75734414d9cee5ade2fa8', queries,  });
export default client;
  
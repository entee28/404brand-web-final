import { dedupExchange, fetchExchange } from "urql";

export const createUrqlClient = () => {
  return {
    url: "http://localhost:4000/graphql",
    fetchOptions: {
      credentials: "include" as const,
    },
    exchanges: [dedupExchange, fetchExchange],
  };
};

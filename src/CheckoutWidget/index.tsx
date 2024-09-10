import React, { useEffect, useMemo, useState } from "react";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { useFrame } from "react-frame-component";
import { CacheProvider } from "@emotion/react";
import weakMemoize from "@emotion/weak-memoize";
import createCache from "@emotion/cache";
import { Header } from "./Header";
import { PaymentInfo } from "./PaymentInfo";
import { WatermelonButton } from "./WatermelonButton";
import { AvocadoButton } from "./AvocadoButton";
import { Client } from "../postMessage/client";

const createMemoizedCache = weakMemoize((container: any) => {
  return createCache({
    container,
    key: "frame",
  });
});

export const CheckoutWidget = ({
  initialAmount,
}: {
  initialAmount: number;
}) => {
  const { document, window: frameWindow } = useFrame();
  const [amount, setAmount] = useState(initialAmount);

  const client = useMemo(() => new Client({ window: frameWindow }), []);

  useEffect(() => {
    client.connect();

    client.addEventListener("changeAmount", (event) => {
      const { amount } = (event as CustomEvent).detail;

      if (typeof amount === "number") {
        setAmount(amount);
      } else {
        console.warn("Invalid amount:", amount);
      }
    });

    return () => {
      client.close();
    };
  }, []);

  const checkoutData = {
    ccNumber: "4242424242424242",
    cvv: "123",
    exp: "02/26",
    amount,
    userId: "xxx-xxx-xxx",
  };

  return (
    <CacheProvider value={createMemoizedCache(document!.head)}>
      <ChakraProvider>
        <Flex direction="column" gap="4" p="4">
          <Header amount={amount} />
          <PaymentInfo data={checkoutData} />
          <WatermelonButton
            onClick={() => {
              window.parent.postMessage({
                type: "checkout",
                payload: {
                  provider: "🍉 Watermelon",
                  ...checkoutData,
                },
              });
            }}
          />
          <AvocadoButton
            onClick={() => {
              client.notify("checkout", {
                provider: "🥑 Avocado",
                ...checkoutData,
              });
            }}
          />
        </Flex>
      </ChakraProvider>
    </CacheProvider>
  );
};

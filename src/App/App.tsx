import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ChakraProvider, Flex, Grid, GridItem } from "@chakra-ui/react";
import Frame from "react-frame-component";
import styled from "@emotion/styled";

import { CheckoutWidget } from "../CheckoutWidget";
import { Wrapper } from "./Wrapper";
import { Host } from "../postMessage/host";
import { Drawer } from "./Drawer";
import { PageInfo } from "./PageInfo";
import { AmountInput } from "./AmountInput";

const INITIAL_AMOUNT = 100;

const IFrame = styled(Frame)`
  border: none;
  border-radius: 8px;
  box-shadow: var(--chakra-shadows-xl);
  background-color: white;
`;

function App() {
  const [amount, setAmount] = useState(INITIAL_AMOUNT);
  const [frameRef, setFrameRef] = useState<HTMLIFrameElement | null>(null);
  const [iframeReady, setIframeReady] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const host = useMemo(() => new Host(), []);

  const onAmountChange = useCallback((value: number) => {
    host.notify("changeAmount", { amount: value }, "*");
    setAmount(value);
  }, []);

  const setLog = useCallback(
    (data: object) => {
      setLogs((prevLogs) => [...prevLogs, JSON.stringify(data, null, 4)]);
    },
    [setLogs]
  );

  useEffect(() => {
    if (!frameRef?.contentWindow) return;

    host.connect({
      clientOrigin: "*",
      clientWindow: frameRef.contentWindow,
      onSuccess: () => {
        setIframeReady(true);
      },
    });

    host.addEventListener("checkout", (e) => {
      setLog((e as CustomEvent).detail);
    });

    return () => {
      host.close("*");
    };
  }, [frameRef, setLog]);

  useEffect(() => {
    const handleMessages = (e: MessageEvent) => {
      if (e.data?.type !== "checkout") return;
      setLog(e.data.payload);
    };

    window.addEventListener("message", handleMessages);

    return () => {
      window.removeEventListener("message", handleMessages);
    };
  }, [frameRef, setLog]);

  return (
    <ChakraProvider>
      <Grid templateColumns="1fr 1fr" bg="gray.50" minH="100vh">
        <GridItem bg="gray.800" p="6" overflowY="auto" maxH="100vh">
          <PageInfo
            messageLogs={logs}
            onReadMore={() => setIsDrawerOpen(true)}
          />
        </GridItem>
        <GridItem py="6">
          <Flex flexDirection="column" gap="2" maxW="400px" mx="auto">
            <Wrapper text="🛒 Shopping cart">
              <AmountInput
                amount={amount}
                onChange={onAmountChange}
                disabled={!iframeReady}
              />
            </Wrapper>
            <Wrapper text="💳 IFrame checkout widget">
              <IFrame ref={setFrameRef} width="100%" height="550px">
                <CheckoutWidget initialAmount={INITIAL_AMOUNT} />
              </IFrame>
            </Wrapper>
          </Flex>
        </GridItem>
      </Grid>
      <Drawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
    </ChakraProvider>
  );
}

export default App;

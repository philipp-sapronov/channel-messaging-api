import React from "react";
import {
  Box,
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
} from "@chakra-ui/react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const scriptExample = `window.addEventListener("message", (e) => alert(JSON.stringify(e.data.payload)));`;

export const Drawer = ({
  isDrawerOpen,
  setIsDrawerOpen,
}: {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isOpen: boolean) => void;
}) => {
  return (
    <ChakraDrawer
      size="lg"
      placement="left"
      isOpen={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
      isFullHeight
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">
          <Text fontSize="x-large" fontWeight="bold" color="gray.500">
            Channel Messaging API demo
          </Text>
          <DrawerCloseButton />
        </DrawerHeader>
        <DrawerBody>
          <Box py="4">
            <Text>
              <Text fontWeight="semibold">
                🧙 Sample Code for DevTools Console:
              </Text>
              To intercept messages sent from an iframe, insert the following
              code into the DevTools console.
            </Text>
            <Box mt="2">
              <SyntaxHighlighter
                wrapLines
                wrapLongLines
                customStyle={{
                  fontSize: "14px",
                  borderRadius: "var(--chakra-radii-md)",
                }}
                language="javascript"
                style={a11yDark}
              >
                {scriptExample}
              </SyntaxHighlighter>
            </Box>
            <Text pt="2">
              This example demonstrates a simple script for illustration
              purposes, but a real-world scenario involving a malicious script
              could be much more complex and dangerous. Malicious scripts can
              exploit security vulnerabilities to intercept sensitive data,
              manipulate content, or perform other harmful actions.
            </Text>
          </Box>
          <Box mt="4">
            <Text fontWeight="semibold">🍉 Checkout with Watermelon:</Text>
            <Text>
              When you click on the watermelon button, an alert will first
              appear with the order details, followed by a message in the
              console. This demonstrates intercepting messages from the iframe
              that interacts with the parent window.
            </Text>
          </Box>
          <Box mt="4">
            <Text fontWeight="semibold">🥑 Checkout with Avocado:</Text>
            When you click on the avocado button, no alert will be shown because
            the external script does not have access to the messaging channel.
            The avocado is integrated using the Channel Messaging API, which
            allows safe data transfer between components without information
            leakage.
          </Box>
          <Box mt="4">
            <Text fontWeight="semibold">🛒 Editing the Amount:</Text>
            When you edit the amount, the changes are sent through the port from
            the host application to the iframe, demonstrating a two-way
            communication channel. This ensures real-time data synchronization
            between components.
          </Box>
        </DrawerBody>
      </DrawerContent>
    </ChakraDrawer>
  );
};

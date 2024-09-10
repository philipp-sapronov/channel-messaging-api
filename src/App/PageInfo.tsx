import React from "react";
import { Box, Button, Divider, Text } from "@chakra-ui/react";

import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const PageInfo = ({
  messageLogs,
  onReadMore,
}: {
  messageLogs: string[];
  onReadMore: () => void;
}) => {
  return (
    <>
      <Box maxW="600px">
        <Text color="white" fontSize="x-large" fontWeight="semibold" py="2">
          Channel Messaging API demo
        </Text>
        <Text color="gray.300" py="1">
          Explore the security differences between postMessage and Channel
          Messaging API in real-time. See how{" "}
          <Text
            color="green.400"
            textDecoration="underline"
            as="a"
            href="https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API"
          >
            Channel Messaging API
          </Text>{" "}
          keeps your data safe.
        </Text>
        <Button colorScheme="green" variant="solid" mt="4" onClick={onReadMore}>
          Read more
        </Button>
      </Box>
      <Divider my="4" borderColor="gray.600" />

      <Box mt="4" mb="2">
        <Text color="gray.100" fontSize="medium" fontWeight="semibold">
          Message logs
        </Text>
        <Text color="gray.400">
          Messages sent from the iframe will be displayed here.
        </Text>
      </Box>
      {messageLogs.length === 0 && (
        <Box bg="gray.700" borderRadius="md" p="2">
          <Text color="gray.400" fontSize="sm">
            No messages yet
          </Text>
        </Box>
      )}
      {messageLogs.map((log, index) => (
        <Box bg="gray.700" borderRadius="md" p="2" mb="2">
          <SyntaxHighlighter
            key={index}
            customStyle={{
              fontSize: "14px",
              backgroundColor: "transparent",
            }}
            language="javascript"
            style={a11yDark}
          >
            {log}
          </SyntaxHighlighter>
        </Box>
      ))}
    </>
  );
};

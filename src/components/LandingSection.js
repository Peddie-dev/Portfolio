import React from "react";
import { Avatar, Heading, VStack, Text } from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";

const greeting = "Hello, I am Pete!";
const bio1 = "A frontend developer";
const bio2 = "specialized in React";

const LandingSection = () => (
  <FullScreenSection
    justifyContent="center"
    alignItems="center"
    isDarkBackground
    backgroundColor="#2A4365"
  >
    <VStack spacing={4}>
      <Avatar 
        name="Pete" 
        src="https://i.pravatar.cc/150?img=7" 
        size="xl"
      />
      <Heading as="h1" size="lg" color="white">
        {greeting}
      </Heading>
      <Text fontSize="xl" color="gray.300">
        {bio1}
      </Text>
      <Text fontSize="xl" color="gray.300">
        {bio2}
      </Text>
    </VStack>
  </FullScreenSection>
);

export default LandingSection;
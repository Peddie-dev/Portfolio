import { Heading, HStack, Image, Text, VStack, Box, Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {
  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      backgroundColor="white"
      maxW="sm"
    >
      {/* Card Image */}
      <Image src={imageSrc} alt={title} objectFit="cover" width="100%" height="200px" />

      {/* Card Content */}
      <VStack spacing={4} align="start" p={4}>
        <Heading as="h3" size="md">
          {title}
        </Heading>
        <Text fontSize="sm" color="gray.600">
          {description}
        </Text>

        {/* Call to Action */}
        <HStack spacing={2} align="center">
          <Text fontSize="sm" fontWeight="bold" color="blue.500">
            Learn More
          </Text>
          <FontAwesomeIcon icon={faArrowRight} color="blue.500" />
        </HStack>
      </VStack>
    </Box>
  );
};

export default Card;

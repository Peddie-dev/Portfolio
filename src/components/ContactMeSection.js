import React, { useEffect } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from "yup";
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";

const LandingSection = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      type: "hireMe",
      comment: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(2, "Must be at least 2 characters")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      type: Yup.string().required("Please select an enquiry type"),
      comment: Yup.string()
        .min(10, "Message must be at least 10 characters")
        .required("Message is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      await submit(values); // Trigger API request
    },
  });

  // Listen for API response updates
  useEffect(() => {
    if (response) {
      if (response.type === "success") {
        onOpen("success", `Thank you, ${formik.values.firstName}, your message has been sent!`);
        formik.resetForm();
      } else if (response.type === "error") {
        onOpen("error", response.message || "Something went wrong. Please try again.");
      }
    }
  }, [response]); // Runs when `response` changes

  return (
    <FullScreenSection isDarkBackground backgroundColor="#512DA8" py={16} spacing={8}>
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              {/* Name Field */}
              <FormControl isInvalid={formik.touched.firstName && formik.errors.firstName}>
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input id="firstName" name="firstName" {...formik.getFieldProps("firstName")} />
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
              </FormControl>

              {/* Email Field */}
              <FormControl isInvalid={formik.touched.email && formik.errors.email}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input id="email" name="email" type="email" {...formik.getFieldProps("email")} />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>

              {/* Enquiry Type Field */}
              <FormControl isInvalid={formik.touched.type && formik.errors.type}>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select id="type" name="type" {...formik.getFieldProps("type")}>
                  <option value="hireMe">Freelance project proposal</option>
                  <option value="openSource">Open source consultancy session</option>
                  <option value="other">Other</option>
                </Select>
                <FormErrorMessage>{formik.errors.type}</FormErrorMessage>
              </FormControl>

              {/* Message Field */}
              <FormControl isInvalid={formik.touched.comment && formik.errors.comment}>
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea id="comment" name="comment" height={250} {...formik.getFieldProps("comment")} />
                <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
              </FormControl>

              {/* Submit Button */}
              <Button type="submit" colorScheme="purple" width="full" isLoading={isLoading}>
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;

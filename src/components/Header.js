import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack, Link, IconButton } from "@chakra-ui/react";

const socials = [
  { icon: faEnvelope, url: "mailto:hello@example.com" },
  { icon: faGithub, url: "https://github.com" },
  { icon: faLinkedin, url: "https://www.linkedin.com" },
  { icon: faMedium, url: "https://medium.com" },
  { icon: faStackOverflow, url: "https://stackoverflow.com" },
];

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(lastScrollY.current > currentScrollY || currentScrollY < 10);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (anchor) => () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      transform={isVisible ? "translateY(0)" : "translateY(-200px)"}
      transition="transform 0.3s ease-in-out"
      backgroundColor="#18181b"
      boxShadow="md"
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack px={16} py={4} justifyContent="space-between" alignItems="center">
          {/* Social Media Links */}
          <nav>
            <HStack spacing={4}>
              {socials.map(({ icon, url }, index) => (
                <Link key={index} href={url} isExternal>
                  <IconButton
                    icon={<FontAwesomeIcon icon={icon} />}
                    aria-label="Social Link"
                    variant="ghost"
                    color="white"
                    _hover={{ color: "gray.400" }}
                  />
                </Link>
              ))}
            </HStack>
          </nav>

          {/* Navigation Links */}
          <nav>
            <HStack spacing={8}>
              <Link onClick={handleClick("projects")} cursor="pointer">
                Projects
              </Link>
              <Link onClick={handleClick("contactme")} cursor="pointer">
                Contact Me
              </Link>
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};

export default Header;

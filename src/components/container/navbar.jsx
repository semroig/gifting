import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Container, Flex, Button } from "@chakra-ui/react";

import Logo from "components/pure/logo";
import { accountsService } from "services";

export default function Navbar() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(true);

  const handleSignOut = () => {

    // Call de service to logout from Appwrite server session
    accountsService.deleteSession()
      .then(() => {
        setIsAuth(false);

        // Delete saved credentials locally
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("sessionId");

        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.log(error);
        toast({
            position: 'top',
            title: 'Error closing your session.',
            description: "Description hereee",
            status: 'error',
            duration: 4000,
            isClosable: true,
        })
      })
  };

  return (
    <Box as="nav" bgColor="gray.50">
      <Container maxW="container.lg" py={4}>
        <Flex justifyContent="space-between" alignItems="center">
          <Link to="/">
            <Logo />
          </Link>

          <Flex gap={4} alignItems="center" fontWeight="semibold">
            {!isAuth ? (
              <>
                <Button as={Link} to="/signin">
                  Sign in
                </Button>

                <Button as={Link} to="/signup">
                  Sign up
                </Button>
              </>
            ) : (
              <>
                <Link to="/quiz">Home</Link>
                <Link to="/quiz/questions">New quiz</Link>
                <Link to="/quiz/history">History</Link>
                <Button onClick={handleSignOut}>Sign out</Button>
              </>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}

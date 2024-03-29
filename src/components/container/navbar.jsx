import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Container, Flex, Button } from "@chakra-ui/react";

import Logo from "components/pure/logo";
import { accountsService } from "services";

export default function Navbar() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  const handleSignOut = () => {
    // Call de service to logout from Appwrite server session
    accountsService
      .deleteSession()
      .then(() => {
        setIsAuth(false);

        // Delete saved credentials locally
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("sessionId");
        sessionStorage.removeItem("userId");

        navigate("/", { replace: true });
      })
      .catch((error) => {
        setIsAuth(false);
        console.log(error);

        // Delete saved credentials locally
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("sessionId");
        sessionStorage.removeItem("userId");

        navigate("/", { replace: true });
      });
  };

  // Validate if the user is uthenticated
  useEffect(() => {
    if (sessionStorage.getItem("sessionId")) {
      setIsAuth(true);
    }
  }, []);

  return (
    <Box as="nav" bgColor="primary.soft">
      <Container maxW="container.lg" py={4}>
        <Flex justifyContent="space-between" alignItems="center">
          <Link to="/">
            <Logo />
          </Link>

          <Flex gap={4} alignItems="center" fontWeight="semibold">
            {!isAuth ? (
              <>
                <Button as={Link} to="/signin" variant="primary">
                  Sign in
                </Button>

                <Button as={Link} to="/signup" variant="accent">
                  Sign up
                </Button>
              </>
            ) : (
              <>
                <Link to="/quiz">Home</Link>
                <Link to="/quiz/questions">New quiz</Link>
                <Link to="/quiz/history">History</Link>
                <Button onClick={handleSignOut} variant="primary">
                  Sign out
                </Button>
              </>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}

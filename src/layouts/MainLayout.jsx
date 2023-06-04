import { Outlet } from "react-router-dom";
import { Container, Box, Grid } from "@chakra-ui/react";

import Navbar from "components/container/navbar";
import Footer from "components/container/footer";

export default function MainLayout() {
  return (
    <Grid minH="100vh" flexDir="column" templateRows="auto 1fr auto">
      <Navbar />

      <Container maxW="container.lg" h="100%">
        <Outlet />
      </Container>

      <Box mt="auto">
        <Footer />
      </Box>
    </Grid>
  );
}

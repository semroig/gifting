import { MainRouter } from "router";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

function App() {
  const theme = extendTheme({
    colors: {
      text: "#020508",
      background: "#FFFFFF",
      primary: {
        all: "#C3732C",
        soft: "#F9F1EA",
      },
      secondary: "#EAF3FA",
      accent: "#704219",
    },
  });

  return (
    <>
      <ChakraProvider theme={theme}>
        <MainRouter />
      </ChakraProvider>
    </>
  );
}

export default App;

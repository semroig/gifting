import { MainRouter } from "router";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

function App() {
  const theme = extendTheme({
    colors: {
      text: "#020508",
      background: "#FFFFFF",
      primary: {
        strong: "#C3732C",
        soft: "#F9F1EA",
      },
      secondary: "#EAF3FA",
      accent: "#704219",
    },
    components: {
      Button: {
        // 3. We can add a new visual variant
        variants: {
          primary: {
            bg: "primary.strong",
            color: "background",
          },
          secondary: {
            bg: "secondary",
            color: "text",
          },
          accent: {
            bg: "accent",
            color: "background",
          },
        },
      },
    },
  });

  // Custom color theme
  // primary full Orange 400
  // primary soft Orange 50
  // text Gray 900
  // background White
  // secondary Blue 50
  // accent Yellow 800

  return (
    <>
      <ChakraProvider theme={theme}>
        <MainRouter />
      </ChakraProvider>
    </>
  );
}

export default App;

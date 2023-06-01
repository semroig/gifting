import { useEffect, useMemo } from "react";
import { useSteps } from "@chakra-ui/react";
import { Stepper as ChakraStepper, Step, StepIndicator, StepStatus, StepIcon, Progress, Box } from "@chakra-ui/react";

export default function Stepper({step, max, ...args}) {
    const { activeStep, setActiveStep } = useSteps({
        index: 1,
        count: max,
    })
    
    const progressPercent = useMemo(() => {
      return (activeStep) * 100 / (max - 1)
    }, [activeStep, max])

    useEffect(() => {
        setActiveStep(step)
    }, [step])

    return (
      <Box {...args}>
        <Box position='relative'>

        <ChakraStepper size='sm' index={activeStep} gap='0'>
          {new Array(max).fill(undefined).map((_, index) => (
            <Step key={index} gap='0'>
              <StepIndicator bg='white'>
                <StepStatus complete={<StepIcon />} />
              </StepIndicator>
            </Step>
          ))}
        </ChakraStepper>

        <Progress
          value={progressPercent}
          position='absolute'
          height='3px'
          width='full'
          top='10px'
          zIndex={-1}
        />
      </Box>
      </Box>
      )
}

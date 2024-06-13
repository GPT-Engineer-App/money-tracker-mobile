import { Container, VStack, Input, Button, Heading, useToast } from "@chakra-ui/react";
import { useState } from "react";

const Index = () => {
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const toast = useToast();

  const handleSubmit = () => {
    if (!income && !expense) {
      toast({
        title: "Error",
        description: "Please enter either income or expense.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    toast({
      title: "Success",
      description: `Income: ${income}, Expense: ${expense}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    setIncome("");
    setExpense("");
  };

  return (
    <Container centerContent maxW="container.sm" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" p={4}>
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl" mb={6}>Income & Expense Tracker</Heading>
        <Input
          placeholder="Enter income"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          size="md"
        />
        <Input
          placeholder="Enter expense"
          value={expense}
          onChange={(e) => setExpense(e.target.value)}
          size="md"
        />
        <Button colorScheme="teal" size="md" onClick={handleSubmit} width="100%">
          Submit
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;
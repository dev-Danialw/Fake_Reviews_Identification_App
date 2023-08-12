import React from "react";
import styled from "styled-components";
import { FlatList } from "react-native";

// Component
import Separator from "../components/Separator";

// Faqs data
const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    question: "What is this app?",
    answer:
      "This app is a tool to help you determine if a product's reviews are real or fake.",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    question: "How does it work?",
    answer:
      "It uses a machine learning model to analyze the reviews of a product and determine if they are real or fake.",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    question: "How accurate is it?",
    answer: "Currently it's accuracy is more than 85%.",
  },
  {
    id: "58694a0f-3da1-371f-bd96-145571e29d72",
    question: "How do I use it?",
    answer:
      "Simply enter the URL of the product you want to analyze and click the Analyze button.",
  },
  {
    id: "58694a0f-3da1-471f-bd96-142571e29d72",
    question: "What if I don't have a URL?",
    answer:
      "You can visit an e-commece website like Amazon and copy the URL of the product you want to analyze.",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d73",
    question: "How long does the analysis take?",
    answer:
      "The analysis typically takes a few minutes, depending on the number of reviews. Larger datasets may take a bit longer.",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d74",
    question: "Can I analyze multiple products?",
    answer:
      "Yes, you can analyze as many products as you want. Each analysis is separate and does not affect the others.",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d77",
    question: "Can I trust the analysis results?",
    answer:
      "While our model is accurate, no analysis is perfect. Use the results as a reference, and consider other factors when making a decision.",
  },
];

const Faqs = () => {
  return (
    <Container>
      <Title>FAQs</Title>

      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FAQ>
            <Question>{item.question}</Question>
            <Answer>{item.answer}</Answer>
            <Separator />
          </FAQ>
        )}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 10% 5% 0 5%;
  background-color: #e5f2ff;
`;

const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #273c75;
  margin-bottom: 5%;
`;

const FAQ = styled.ScrollView`
  margin-bottom: 2%;
`;

const Question = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 2%;
`;

const Answer = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #666666;
  margin-bottom: 5%;
  text-align: justify;
`;

export default Faqs;

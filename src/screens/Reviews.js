import React, { useEffect } from "react";
import styled from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Components
import Separator from "../components/Separator";
import ResultsSvg from "../components/ResultsSvg";

const Reviews = ({ route }) => {
  // Getting data from the previous screen
  const { data, url } = route.params;

  useEffect(() => {
    storeData(data, url);
  }, [data, url]);

  // Storing data to AsyncStorage
  const storeData = async (reviewData, reviewUrl) => {
    try {
      const existingData = await AsyncStorage.getItem("historyData");
      const historyData = existingData ? JSON.parse(existingData) : [];

      // Adding current review to the history
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString();
      historyData.push({
        id: Date.now().toString(),
        title: "Reviewed Product",
        date: formattedDate,
        url: reviewUrl,
        data: reviewData,
      });

      await AsyncStorage.setItem("historyData", JSON.stringify(historyData));
    } catch (error) {
      console.error("Error storing data:", error);
    }
  };

  return (
    <Container>
      <Title>Results</Title>

      <Subtitle>Reviews Count: {data.reviews_count}</Subtitle>

      <ResultBoxes>
        <ResultBox style={{ elevation: 10, marginRight: 12 }}>
          <ResultBoxTitle>Real Reviews</ResultBoxTitle>
          <Separator />
          <ResultBoxText style={{ color: "yellowgreen" }}>
            {data.real_percentage.toFixed(2)} %
          </ResultBoxText>
        </ResultBox>

        <ResultBox style={{ elevation: 10 }}>
          <ResultBoxTitle>Fake Reviews</ResultBoxTitle>
          <Separator />
          <ResultBoxText style={{ color: "tomato" }}>
            {data.fake_percentage.toFixed(2)} %
          </ResultBoxText>
        </ResultBox>
      </ResultBoxes>
      <ResultsSvg height={250} width={250} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-evenly;
  padding-top: 15%;
  background: #f0f3f5;
`;

const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: #273c75;
  margin-bottom: 2%;
`;

const Subtitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #b8bece;
`;

const ResultBoxes = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 20px 0 20px;
`;

const ResultBox = styled.TouchableOpacity`
  background-color: #f2f2f2;
  width: 48%;
  padding: 40px 0 40px 0;
  border-radius: 12px;
  justify-content: space-evenly;
  align-items: center;
`;

const ResultBoxTitle = styled.Text`
  color: #777777;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 4px;
`;

const ResultBoxText = styled.Text`
  color: #333333;
  font-size: 26px;
  font-weight: bold;
  margin-top: 4px;
`;

export default Reviews;

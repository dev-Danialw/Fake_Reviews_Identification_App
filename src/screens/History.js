import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Text, Alert, ToastAndroid, TouchableOpacity } from "react-native";
import { openBrowserAsync } from "expo-web-browser";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Components
import HomeSvg from "../components/HomeSvg";
import Separator from "../components/Separator";

const History = () => {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    retrieveData();
  }, []);

  // Retrieve data from AsyncStorage
  const retrieveData = async () => {
    try {
      const data = await AsyncStorage.getItem("historyData");
      if (data) {
        setHistoryData(JSON.parse(data));
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };

  // URL shortener function
  const shortenUrl = (url) => {
    const maxUrlLength = 90;
    return url.length > maxUrlLength ? url.slice(0, maxUrlLength) + "..." : url;
  };

  // Toast message
  const showToast = () => {
    ToastAndroid.show("History Cleared", ToastAndroid.SHORT);
  };

  // Clear history function
  const clearHistory = async () => {
    Alert.alert(
      "Confirm Clear History",
      "Are you sure you want to clear the history?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("historyData");
              setHistoryData([]);
              showToast();
            } catch (error) {
              console.error("Error clearing history:", error);
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <Container>
      <TopBar>
        <Title>Search History</Title>

        {historyData.length > 0 ? (
          <TouchableOpacity onPress={clearHistory}>
            <Ionicons name="trash" size={32} color="#536DFE" />
          </TouchableOpacity>
        ) : null}
      </TopBar>

      {historyData.length > 0 ? (
        <FlatList
          data={historyData.reverse()}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item style={{ elevation: 3 }}>
              <Header>
                <ItemTitle>{item.title}</ItemTitle>
                <DateContainer>
                  <Date>{item.date}</Date>
                </DateContainer>
              </Header>

              <Separator />

              <TouchableOpacity onPress={() => openBrowserAsync(item.url)}>
                <ItemUrlText>{shortenUrl(item.url)}</ItemUrlText>
              </TouchableOpacity>

              <Separator />

              <ItemInfo>
                <ItemInfoText>
                  {/* <Ionicons name="star" size={14} color="gold" />  */}
                  🌟 Real Reviews:{" "}
                  <ItemInfoText style={{ color: "green" }}>
                    {item.data.real_percentage.toFixed(2)}%
                  </ItemInfoText>
                </ItemInfoText>

                <ItemInfoText>
                  {/* <Ionicons name="thumbs-down" size={14} color="red" />  */}
                  ❌ Fake Reviews:{" "}
                  <ItemInfoText style={{ color: "tomato" }}>
                    {item.data.fake_percentage.toFixed(2)}%
                  </ItemInfoText>
                </ItemInfoText>
              </ItemInfo>
            </Item>
          )}
        />
      ) : (
        <NoHistoryView>
          <HomeSvg height={300} width={300} />
          <Text
            style={{
              textAlign: "center",
              marginTop: 10,
              fontSize: 16,
              color: "#888",
            }}
          >
            You haven't searched any products yet. Start exploring now!
          </Text>
        </NoHistoryView>
      )}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  padding-top: 10%;
  background: #f0f3f5;
`;

const NoHistoryView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const TopBar = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
  margin-bottom: 5%;
`;

const Title = styled.Text`
  font-size: 26px;
  font-weight: bold;
  color: #273c75;
`;

const FlatList = styled.FlatList`
  flex-direction: column;
  width: 100%;
  padding: 0 20px;
`;

const Item = styled.TouchableOpacity`
  width: 100%;
  background: white;
  margin-bottom: 22px;
  border-radius: 12px;
  justify-content: center;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
`;

const ItemTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #3c4560;
`;

const DateContainer = styled.View`
  background: #4775f2;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  padding: 0 8px;
  height: 20px;
`;

const Date = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: 600;
`;

const ItemUrlText = styled.Text`
  color: #007bff;
  font-size: 12px;
  margin-top: 4px;
  text-align: center;
  padding: 0 10px;
`;

const ItemInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  padding: 0 20px;
  margin-bottom: 16px;
`;

const ItemInfoText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  padding: 6px 0;
  line-height: 24px;
  color: #3c4560;
`;

export default History;

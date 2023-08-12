import React, { useState } from "react";
import styled from "styled-components";
import { Modal, View, Text, TouchableOpacity, Keyboard } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";

// Utils
import Loading from "../utils/Loading";
import Success from "../utils/Success";

// Components
import HomeSvg from "../components/HomeSvg";
import LinkValidityComponent from "../components/LinkValidityComponent";

const Home = ({ navigation }) => {
  const [searchBarValue, setSearchBarValue] = useState("");

  // UI States
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Sumit Function
  const onSubmit = async () => {
    Keyboard.dismiss();

    // Check if the URL includes any of the supported domains
    const supportedDomains = [
      "https://www.amazon.com/",
      "https://www.walmart.com/",
      "https://www.bestbuy.com/",
      "https://www.ebay.com/",
    ];

    const isValidDomain = supportedDomains.some(
      (domain) =>
        searchBarValue.startsWith(domain) &&
        searchBarValue.length > domain.length + 10
    );

    if (!isValidDomain) {
      setModalVisible(true);
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.post("http://192.168.10.5:5000/analyze", {
        url: searchBarValue,
      });

      setIsLoading(false);

      console.log(response.data);

      if (response.data.is_ecommerce === true) {
        setIsSuccessful(true);

        setTimeout(() => {
          setIsSuccessful(false);
        }, 1500);

        setTimeout(() => {
          navigation.navigate("Reviews", {
            url: searchBarValue,
            data: response.data,
          });
          setSearchBarValue("");
        }, 1000);
      } else {
        setIsLoading(false);
        setIsSuccessful(false);
        setModalVisible(true);
      }
    } catch (error) {
      setIsLoading(false);
      setIsSuccessful(false);

      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          console.log("Bad Request Error:", error.response.data.message);
        } else if (status === 404) {
          console.log("Not Found Error:", error.response.data.message);
        } else if (status === 500) {
          console.log("Internal Server Error:", error.response.data.message);
        } else {
          console.log("Other Server Error:", error.response.data.message);
        }
      } else if (error.request) {
        console.log("Request Error:", error.request);
      } else {
        console.log("Other Error:", error.message);
      }
    }
  };

  // Close Modal Function
  const closeModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <Container>
      <TopBar>
        <Title>Review Shield</Title>
        <FaqButton onPress={() => navigation.navigate("Faqs")}>
          <Ionicons name="help-circle" size={40} color="#536DFE" />
        </FaqButton>
      </TopBar>

      <MidSection>
        <HistoryButton onPress={() => navigation.navigate("History")}>
          <Ionicons name="list-circle" size={50} color="#536DFE" />
        </HistoryButton>
        <SearhBar
          style={{
            elevation: 10,
          }}
          value={searchBarValue}
          onChangeText={setSearchBarValue}
          placeholder="Add / Paste link"
        />
      </MidSection>

      <SubmitButton
        style={{ elevation: 10 }}
        onPress={onSubmit}
        disabled={searchBarValue === ""}
      >
        <SubmitButtonText>Analyze</SubmitButtonText>
      </SubmitButton>

      <HomeSvg height={300} width={300} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(200, 200, 200, 0.9)",
            elevation: 10,
          }}
        >
          <View
            style={{
              margin: 20,
              backgroundColor: "white",
              borderRadius: 14,
              padding: 25,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <ModalSVG>
              <LinkValidityComponent height={200} width={200} />
              <Text
                style={{
                  marginTop: 10,
                  marginBottom: 20,
                  fontSize: 12,
                  color: "black",
                  textAlign: "justify",
                  lineHeight: 21,
                }}
              >
                The provided link does not seem to be a valid product page link
                from a supported e-commerce website. Please make sure that the
                link is correct and try again.
              </Text>
            </ModalSVG>

            <TouchableOpacity
              style={{
                borderRadius: 14,
                padding: 8,
                elevation: 6,
                backgroundColor: "#4775f2",
              }}
              onPress={closeModal}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                  width: 250,
                }}
              >
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Loading & Success*/}
      <Loading isActive={isLoading} />
      <Success isActive={isSuccessful} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #e5f2ff;
`;

const TopBar = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10% 20px 0 20px;
  margin-bottom: 20px;
`;

const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #1d3557;
`;

const FaqButton = styled.TouchableOpacity``;

const MidSection = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

const HistoryButton = styled.TouchableOpacity``;

const SearhBar = styled.TextInput`
  background-color: #fff;
  padding: 10px 20px;
  border-radius: 12px;
  width: 75%;
`;

const SubmitButton = styled.TouchableOpacity`
  align-items: center;
  width: 70%;
  padding: 10px 20px;
  border-radius: 12px;
  margin-top: 20px;
  margin-bottom: 10%;
  background-color: #273c75;

  ${({ disabled }) =>
    disabled
      ? `
          background-color: #3a4c8d;
        `
      : `
          background-color: #273c75; 
        `}
`;

const SubmitButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
`;

const ModalSVG = styled.View`
  align-items: center;
  justify-content: center;
`;

export default Home;

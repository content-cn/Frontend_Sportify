import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Container from "../../components/UI/Container/Container";
import Button from "../../components/UI/Button/Button";
import CardsContainer from "../../components/UI/CardsContainer/CardsContainer";
import CardWrapper from "../../components/UI/CardWrapper/CardWrapper";
import Image from "../../components/Image/Image";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [sports, setSports] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getSports = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/sports");
        const data = await res.json();
        setSports(data.sports);
        toast.success("Sports fetched!");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    getSports();
  }, []);

  const viewTeams = (id, index) => {
    navigate(`/teams/${id}`, { state: { sportName: sports[index].name } });
  };

  return (
    <Container loading={loading} heading={"Sports"}>
      <CardsContainer>
        {sports.map((sport, idx) => {
          return (
            <CardWrapper key={sport.id}>
              <Image image={sport.logo} name={sport.name} />
              <Button onClick={() => viewTeams(sport.id, idx)}>
                View Teams
              </Button>
            </CardWrapper>
          );
        })}
      </CardsContainer>
    </Container>
  );
};

export default Home;

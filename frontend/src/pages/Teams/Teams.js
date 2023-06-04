import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Container from "../../components/UI/Container/Container";
import Button from "../../components/UI/Button/Button";
import CardsContainer from "../../components/UI/CardsContainer/CardsContainer";
import CardWrapper from "../../components/UI/CardWrapper/CardWrapper";
import Image from "../../components/Image/Image";
import { useLocation, useParams, useNavigate } from "react-router-dom";

const Teams = () => {
  const [loading, setLoading] = useState(false);
  const [teams, setTeams] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();
  const {
    state: { sportName },
  } = useLocation();

  useEffect(() => {
    const getTeams = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/teams?sportId=${id}`);
        const data = await res.json();
        setTeams(data.teams);
        toast.success("Teams fetched!");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    getTeams();
  }, []);

  const viewPlayers = (id, index) => {
    navigate(`/players/${id}`, { state: { teamName: teams[index].name } });
  };

  return (
    <Container loading={loading} heading={`${sportName} Teams`}>
      <CardsContainer>
        {teams.map((team, idx) => {
          return (
            <CardWrapper key={team.id}>
              <Image image={team.teamLogoImage} name={team.name} />
              <Button onClick={() => viewPlayers(team.id, idx)}>
                View Players
              </Button>
            </CardWrapper>
          );
        })}
      </CardsContainer>
    </Container>
  );
};

export default Teams;

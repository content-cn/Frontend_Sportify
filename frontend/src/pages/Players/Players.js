import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Container from "../../components/UI/Container/Container";
import Button from "../../components/UI/Button/Button";
import CardsContainer from "../../components/UI/CardsContainer/CardsContainer";
import CardWrapper from "../../components/UI/CardWrapper/CardWrapper";
import Image from "../../components/Image/Image";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import { setDoc, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { getUser } from "../../redux/reducers/authReducer";
import { useSelector } from "react-redux";
import { BsStarFill } from "react-icons/bs";

const Players = () => {
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState([]);
  const user = useSelector(getUser);

  const navigate = useNavigate();
  const { id } = useParams();
  const {
    state: { teamName },
  } = useLocation();

  useEffect(() => {
    const getPlayers = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:5000/api/players?teamId=${id}`
        );

        const data = await res.json();

        setPlayers(data.players);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    getPlayers();
  }, []);

  const addToFavorite = async (player) => {
    if (!user) return navigate("/signin");
    const favoritePlayersRef = doc(db, "favoritePlayers", user?.uid);
    const docSnap = await getDoc(favoritePlayersRef);
    const favoritePlayers = docSnap.data()?.favorites;
    try {
      if (favoritePlayers?.length) {
        let flag = false;
        favoritePlayers.forEach((favoritePlayer) => {
          if (player._id.toString() === favoritePlayer._id.toString()) {
            flag = true;
          }
        });

        if (flag) return toast.error("Player already in Favorites!");

        await updateDoc(favoritePlayersRef, {
          favorites: arrayUnion(player),
        });

        return toast.success("Player added to Favorites!");
      }

      await setDoc(favoritePlayersRef, {
        favorites: [player],
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }

    toast.success("Player added to Favorites!");
  };

  return (
    <Container loading={loading} heading={`${teamName} Players`}>
      <CardsContainer>
        {players.map((player) => {
          return (
            <CardWrapper key={player._id}>
              <Image
                image={player.image}
                name={player.name}
                age={player.age}
                playerPosition={player.position}
              />
              <Button onClick={() => addToFavorite(player)}>
                <BsStarFill size={25} />
              </Button>
            </CardWrapper>
          );
        })}
      </CardsContainer>
    </Container>
  );
};

export default Players;

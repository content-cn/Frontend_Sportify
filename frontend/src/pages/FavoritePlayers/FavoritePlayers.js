import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Container from "../../components/UI/Container/Container";
import Button from "../../components/UI/Button/Button";
import CardsContainer from "../../components/UI/CardsContainer/CardsContainer";
import CardWrapper from "../../components/UI/CardWrapper/CardWrapper";
import Image from "../../components/Image/Image";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { getUser } from "../../redux/reducers/authReducer";
import { useSelector } from "react-redux";
import { CgUserRemove } from "react-icons/cg";

const FavoritePlayers = () => {
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState([]);
  const user = useSelector(getUser);

  const navigate = useNavigate();

  useEffect(() => {
    const getPlayers = async () => {
      try {
        setLoading(true);
        const favoritePlayersRef = doc(db, "favoritePlayers", user?.uid);
        const docSnap = await getDoc(favoritePlayersRef);
        const favoritePlayers = docSnap.data()?.favorites || [];
        setPlayers(favoritePlayers);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    getPlayers();
  }, []);

  const removeFromFavorites = async (player) => {
    if (!user) return navigate("/signin");

    const favoritePlayersRef = doc(db, "favoritePlayers", user?.uid);
    const docSnap = await getDoc(favoritePlayersRef);
    const favoritePlayers = docSnap.data()?.favorites;

    try {
      if (favoritePlayers?.length) {
        await updateDoc(favoritePlayersRef, {
          favorites: arrayRemove(player),
        });

        setPlayers((prevPlayers) => {
          return prevPlayers.filter(
            (favoritePlayer) => favoritePlayer._id !== player._id
          );
        });

        return toast.success("Player removed!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Container loading={loading} heading={"Favorite Players"}>
      <CardsContainer>
        {players.length ? (
          players.map((player) => {
            return (
              <CardWrapper key={player._id}>
                <Image
                  image={player.image}
                  name={player.name}
                  age={player.age}
                  playerPosition={player.position}
                />
                <Button onClick={() => removeFromFavorites(player)}>
                  <CgUserRemove size={25} />
                </Button>
              </CardWrapper>
            );
          })
        ) : (
          <h1>Add players to favorite...</h1>
        )}
      </CardsContainer>
    </Container>
  );
};

export default FavoritePlayers;

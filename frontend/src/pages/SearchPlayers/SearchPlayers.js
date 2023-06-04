import classes from "./SearchPlayers.module.css";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Container from "../../components/UI/Container/Container";
import Button from "../../components/UI/Button/Button";
import CardsContainer from "../../components/UI/CardsContainer/CardsContainer";
import CardWrapper from "../../components/UI/CardWrapper/CardWrapper";
import Image from "../../components/Image/Image";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";
import { setDoc, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { getUser } from "../../redux/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { BsStarFill } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import Loader from "../../components/UI/Loader/Loader";
import {
  getHasNextPage,
  getPage,
  getPlayers,
  getPlayersLoadingState,
  searchPlayers,
  showNextPage,
  showPreviousPage,
} from "../../redux/reducers/playerReducer";

const SearchPlayers = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const user = useSelector(getUser);
  const page = useSelector(getPage);
  const hasNextPage = useSelector(getHasNextPage);
  const loading = useSelector(getPlayersLoadingState);
  const players = useSelector(getPlayers);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    <Container heading={"Search Players"}>
      <div
        style={{
          display: "flex",
          margin: "auto",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input
          className={classes.search}
          type="text"
          placeholder="Enter player name"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <Button
          style={{ marginTop: "0.75rem", height: "51px" }}
          onClick={() => {
            if (searchQuery === "") return toast.error("Enter some value!");
            dispatch(searchPlayers(searchQuery));
          }}
        >
          <FaSearch size={35} />
        </Button>
      </div>

      <CardsContainer>
        {loading ? (
          <Loader style={{ marginTop: "40%" }} />
        ) : players.length ? (
          players.map((player) => {
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
          })
        ) : (
          <h1>Enter Player Name...</h1>
        )}
        {!!players.length && (
          <div className={classes.pageControls}>
            {page !== 1 && (
              <Button onClick={() => dispatch(showPreviousPage(searchQuery))}>
                <BiArrowBack />
              </Button>
            )}{" "}
            <span className={classes.pageNumber}>{page}</span>{" "}
            {!!hasNextPage && (
              <Button onClick={() => dispatch(showNextPage(searchQuery))}>
                <BiArrowBack style={{ transform: "rotate(180deg)" }} />
              </Button>
            )}
          </div>
        )}
      </CardsContainer>
    </Container>
  );
};

export default SearchPlayers;

import { Image, TagLabel } from "@chakra-ui/react";
import React from "react";

import { User } from "../../../../context/User";

import Styled from "./styled";

const UserInfo: React.FC<{ user: User }> = ({ user }) => {
  const { wins, loses, matches } = user.meta;

  return (
    <Styled.Container>
      <Styled.Title>{user.username}</Styled.Title>
      <Image src={user.skin.current.avatar} borderBottomRadius={10} />
      <Styled.Meta>
        <Styled.MetaTag colorScheme="green">
          <TagLabel>Vitórias: </TagLabel>
          {wins}
        </Styled.MetaTag>
        <Styled.MetaTag colorScheme="red">
          <TagLabel>Derrotas: </TagLabel>
          {loses}
        </Styled.MetaTag>
        <Styled.MetaTag colorScheme="orange">
          <TagLabel>Partidas: </TagLabel>
          {matches}
        </Styled.MetaTag>
      </Styled.Meta>
    </Styled.Container>
  );
};

export default UserInfo;

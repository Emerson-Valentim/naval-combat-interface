import { gql, useQuery } from "@apollo/client";
import { Image, TagLabel } from "@chakra-ui/react";
import React from "react";

import Styled from "./styled";

const GET_PUBLIC_PROFILE = gql`
  query getPublicProfile($input: PublicProfileInput!) {
    getPublicProfile(input: $input) {
      id
      username
      meta {
        wins
        loses
        matches
      }
      skin {
        current {
          avatar
        }
      }
    }
  }
`;

const UserInfo: React.FC<{ userId: string }> = ({ userId }) => {
  const { data } = useQuery(GET_PUBLIC_PROFILE, {
    variables: {
      input: {
        userId,
      },
    },
  });

  return (
    <Styled.Container>
      <Styled.Title>{data?.getPublicProfile.username}</Styled.Title>
      <Image
        src={data?.getPublicProfile?.skin.current.avatar}
        borderBottomRadius={10}
      />
      <Styled.Meta>
        <Styled.MetaTag colorScheme="green">
          <TagLabel>Vitórias: </TagLabel>
          {data?.getPublicProfile?.meta.wins}
        </Styled.MetaTag>
        <Styled.MetaTag colorScheme="red">
          <TagLabel>Derrotas: </TagLabel>
          {data?.getPublicProfile?.meta.loses}
        </Styled.MetaTag>
        <Styled.MetaTag colorScheme="orange">
          <TagLabel>Partidas: </TagLabel>
          {data?.getPublicProfile?.meta.matches}
        </Styled.MetaTag>
      </Styled.Meta>
    </Styled.Container>
  );
};

export default UserInfo;

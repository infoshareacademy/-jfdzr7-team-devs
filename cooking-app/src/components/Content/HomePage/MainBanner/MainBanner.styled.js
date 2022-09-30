import styled from "styled-components";

export const StyledBanner = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  height: 445px;
  margin-bottom: 20px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: linear-gradient(90deg, rgba(71,71,71,1) 0%, rgba(255,255,255,0) 50%), url(${props=> props.url});
`;

export const BannerContent = styled.div`
  padding-left: 60px;
`;

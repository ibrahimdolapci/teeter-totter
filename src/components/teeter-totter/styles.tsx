import styled from "styled-components";
import {TeeterTotterItemTypes} from "../../store/teeter-totter/types";

export const StyledContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
export const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 600px;
  width: 500px;
  justify-content: flex-end;
  position: relative;
  border: 1px solid;
  overflow: hidden;
`;

type StyledBoardProps = { angle: number };

export const StyledBoard = styled.div.attrs(({angle}: StyledBoardProps) => ({
    style: {
        transform: `rotate(${angle}deg)`
    }
}))<StyledBoardProps>`
  width: 600px;
  height: 5px;
  background-color: orangered;
  transition: transform .5s linear;
`;

export const StyledBase = styled.div`
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 150px solid #aaa;
`;
type StyledBaseShapeProps = { speed: number, mass: number, isOnBoard: boolean, coordinates: { x: number, y: number } };
export const StyledBaseShape = styled.div.attrs((props: StyledBaseShapeProps) => ({
    style: {
        transform: `translate(${props.coordinates.x}px, ${props.coordinates.y - 150}px) scale(${0.5 + props.mass / 4 })`
    }
}))<StyledBaseShapeProps>`
  position: absolute;
  bottom: 0;
  left: 50%;
  transition: ${props => props.isOnBoard ? "all .5s linear" : "none"};
`;

export const StyledTriangle = styled(StyledBaseShape)`
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 20px solid darkslategray;
`

export const StyledRectangle = styled(StyledBaseShape)`
  width: 15px;
  height: 20px;
  background: tomato;
`;

export const StyledCircle = styled(StyledBaseShape)`
  width: 20px;
  height: 20px;
  background: cadetblue;
  border-radius: 100%;
`;

export const shapeComponentsMap = {
    [TeeterTotterItemTypes.Triangle]: StyledTriangle,
    [TeeterTotterItemTypes.Circle]: StyledCircle,
    [TeeterTotterItemTypes.Rectangle]: StyledRectangle,
}

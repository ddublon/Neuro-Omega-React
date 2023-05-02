import styled from "styled-components";
import ElectrodeInformation from "./ElectrodeInformation/ElectrodeInformation";

const StyledGraphsPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
`;


const GraphsPageComponent = ({ data }) => {
  return (
    <StyledGraphsPage>
      <h1>Graphs Page</h1>
      <ElectrodeInformation />
    </StyledGraphsPage>
  );
};

export default GraphsPageComponent;
